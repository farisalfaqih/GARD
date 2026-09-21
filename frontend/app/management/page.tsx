'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  RefreshCw,
  ClipboardList,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';

export default function ManagementDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('All month');
  const [selectedDivision, setSelectedDivision] = useState('All divisions');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [selectedMonth, selectedDivision]);

  const divisionMap: Record<string, number> = {
    'Direktorat IT Digital': 342,
    'Divisi Digital Product': 284,
    'Human Capital Service Operations': 215,
    'Direktorat Keuangan dan Manajemen Resiko': 189,
    'Direktorat Network': 166,
    'Divisi Government Service': 125,
    'Divisi General Support': 92,
  };

  const currentRatio = useMemo(() => {
    return selectedDivision === 'All divisions' ? 1 : (divisionMap[selectedDivision] || 1247) / 1247;
  }, [selectedDivision]);

  const baseStatusDistribution = [
    { label: 'Need Revision', value: 123, color: '#f59e0b' },
    { label: 'Approved Use Case', value: 321, color: '#a855f7' },
    { label: 'Completed', value: 830, color: '#22c55e' },
  ];

  const baseTrendData = [
    { label: 'Jan 24', submission: 95, completed: 60 },
    { label: 'Feb 24', submission: 110, completed: 75 },
    { label: 'Mar 24', submission: 85, completed: 50 },
    { label: 'Apr 24', submission: 120, completed: 80 },
    { label: 'May 24', submission: 98, completed: 70 },
    { label: 'Jun 24', submission: 135, completed: 95 },
    { label: 'Jul 24', submission: 105, completed: 65 },
    { label: 'Aug 24', submission: 140, completed: 85 },
    { label: 'Sep 24', submission: 115, completed: 80 },
    { label: 'Oct 24', submission: 90, completed: 60 },
    { label: 'Nov 24', submission: 80, completed: 50 },
    { label: 'Dec 24', submission: 74, completed: 60 },
  ];

  const chartData = useMemo(() => {
    return baseTrendData.map(d => ({
      ...d,
      submission: Math.round(d.submission * currentRatio),
      completed: Math.round(d.completed * currentRatio)
    }));
  }, [currentRatio]);

  const currentDonutTotal = useMemo(() => {
    if (selectedMonth === 'All month') {
      return Math.round(1247 * currentRatio);
    }
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = months.indexOf(selectedMonth);
    const monthData = chartData[monthIndex];
    return monthData ? monthData.submission : Math.round(1247 * currentRatio);
  }, [selectedMonth, currentRatio, chartData]);

  const statusDistribution = useMemo(() => {
    if (selectedDivision === 'All divisions' && selectedMonth === 'All month') {
      return baseStatusDistribution;
    }
    
    // Deterministic variation so slices visibly change size
    const divVar = (selectedDivision.length % 5) - 2; 
    const monthVar = (selectedMonth.length % 5) - 2;
    const variation = divVar + monthVar;
    
    let p1 = Math.max(0.05, 0.096 + (variation * 0.02));
    let p2 = Math.max(0.1, 0.252 - (variation * 0.015));
    let p3 = Math.max(0, 1 - p1 - p2);
    
    const val1 = Math.round(currentDonutTotal * p1);
    const val2 = Math.round(currentDonutTotal * p2);
    const val3 = currentDonutTotal - val1 - val2; 
    
    return [
      { label: 'Need Revision', value: val1, color: '#f59e0b' },
      { label: 'Approved Use Case', value: val2, color: '#a855f7' },
      { label: 'Completed', value: val3, color: '#22c55e' },
    ];
  }, [selectedDivision, selectedMonth, currentDonutTotal]);

  const statusDonutTotal = statusDistribution.reduce((sum, s) => sum + s.value, 0);

  let donutCursor = 0;
  const donutStops = statusDistribution
    .map((s) => {
      const start = statusDonutTotal > 0 ? (donutCursor / statusDonutTotal) * 360 : 0;
      donutCursor += s.value;
      const end = statusDonutTotal > 0 ? (donutCursor / statusDonutTotal) * 360 : 0;
      return `${s.color} ${start}deg ${end}deg`;
    })
    .join(', ');

  const displayChartData = useMemo(() => {
    if (selectedMonth === 'All month') return chartData;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = months.indexOf(selectedMonth);
    const monthData = chartData[monthIndex];
    if (!monthData) return chartData;

    const daysInMonth: Record<string, number> = {
      January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
      July: 31, August: 31, September: 30, October: 31, November: 30, December: 31
    };
    const days = daysInMonth[selectedMonth] || 31;
    
    const dailyData = [];
    let remSub = monthData.submission;
    let remComp = monthData.completed;

    for (let i = 1; i <= days; i++) {
      let sub = Math.floor(monthData.submission / days);
      let comp = Math.floor(monthData.completed / days);
      
      sub += (i % 3 === 0) ? 2 : (i % 2 === 0) ? -1 : 1;
      comp += (i % 4 === 0) ? 2 : (i % 3 === 0) ? -1 : 0;
      
      sub = Math.max(0, sub);
      comp = Math.max(0, comp);

      const finalSub = i === days ? remSub : Math.min(sub, remSub);
      const finalComp = i === days ? remComp : Math.min(comp, remComp);

      dailyData.push({
        label: `${i} ${selectedMonth.slice(0, 3)}`,
        submission: finalSub,
        completed: finalComp,
      });

      remSub -= finalSub;
      remComp -= finalComp;
    }
    return dailyData;
  }, [selectedMonth, chartData]);

  const maxChartValue = useMemo(() => {
    if (selectedMonth === 'All month') {
      let max = 0;
      chartData.forEach(d => {
        if (d.submission > max) max = d.submission;
        if (d.completed > max) max = d.completed;
      });
      return Math.ceil((max || 180) / 10) * 10;
    }
    let max = 0;
    displayChartData.forEach(d => {
      if (d.submission > max) max = d.submission;
      if (d.completed > max) max = d.completed;
    });
    return Math.ceil((max || 5) / 5) * 5;
  }, [selectedMonth, displayChartData, chartData]);

  const yAxisValues = [
    maxChartValue,
    Math.round((maxChartValue * 2) / 3),
    Math.round(maxChartValue / 3),
    0
  ];

  const byDivision = [
    { name: 'DIREKTORAT IT DIGITAL', value: 342, color: 'bg-[#4361ee]' },
    { name: 'DIVISI DIGITAL PRODUCT', value: 284, color: 'bg-[#a855f7]' },
    { name: 'HUMAN CAPITAL SERVICE OPERATIONS', value: 215, color: 'bg-[#f59e0b]' },
    { name: 'DIREKTORAT KEUANGAN DAN MANAJEMEN RESIKO', value: 189, color: 'bg-[#10b981]' },
    { name: 'DIREKTORAT NETWORK', value: 166, color: 'bg-[#ec4899]' },
    { name: 'DIVISI GOVERNMENT SERVICE', value: 125, color: 'bg-[#06b6d4]' },
  ];
  const maxDivisionValue = 342;

  const leaderboard = [
    { rank: 1, division: 'Direktorat IT Digital', submitted: 342, completed: 336, rate: '98.2%', status: 'On Track' },
    { rank: 2, division: 'HC Service Operations', submitted: 215, completed: 205, rate: '95.5%', status: 'On Track' },
    { rank: 3, division: 'Direktorat Keuangan', submitted: 189, completed: 172, rate: '91.0%', status: 'On Track' },
    { rank: 4, division: 'Divisi Digital Product', submitted: 284, completed: 239, rate: '84.3%', status: 'At Risk' },
    { rank: 5, division: 'Direktorat Network', submitted: 166, completed: 132, rate: '79.5%', status: 'At Risk' },
    { rank: 6, division: 'Divisi Government Service', submitted: 125, completed: 91, rate: '72.4%', status: 'Critical' },
    { rank: 7, division: 'Divisi General Support', submitted: 92, completed: 63, rate: '68.1%', status: 'Critical' },
  ];

  const statusStyles: Record<string, string> = {
    'On Track': 'bg-green-100 text-green-700',
    'At Risk': 'bg-amber-100 text-amber-700',
    Critical: 'bg-red-100 text-red-700',
  };

  const bottlenecks = [
    {
      name: 'Divisi General Support',
      stuck: 23,
      segments: [
        { label: 'DG Council', value: 8, color: '#4361ee' },
        { label: 'Direktur Use Case', value: 6, color: '#f59e0b' },
        { label: 'Data Owner', value: 5, color: '#10b981' },
        { label: 'Corporate NDA', value: 4, color: '#a855f7' },
      ],
    },
    {
      name: 'Divisi Government Service',
      stuck: 16,
      segments: [
        { label: 'DG Council', value: 6, color: '#4361ee' },
        { label: 'Direktur Use Case', value: 4, color: '#f59e0b' },
        { label: 'Data Owner', value: 3, color: '#10b981' },
        { label: 'Corporate NDA', value: 3, color: '#a855f7' },
      ],
    },
    {
      name: 'Direktorat Network',
      stuck: 15,
      segments: [
        { label: 'DG Council', value: 5, color: '#4361ee' },
        { label: 'Direktur Use Case', value: 4, color: '#f59e0b' },
        { label: 'Data Owner', value: 3, color: '#10b981' },
        { label: 'Corporate NDA', value: 3, color: '#a855f7' },
      ],
    },
    {
      name: 'Divisi Digital Product',
      stuck: 8,
      segments: [
        { label: 'DG Council', value: 3, color: '#4361ee' },
        { label: 'Direktur Use Case', value: 2, color: '#f59e0b' },
        { label: 'Data Owner', value: 2, color: '#10b981' },
        { label: 'Corporate NDA', value: 1, color: '#a855f7' },
      ],
    },
  ];
  const totalStuck = bottlenecks.reduce((sum, d) => sum + d.stuck, 0);

  return (
    <>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Dashboard Management</h2>
          <p className="text-[13px] text-gray-500 mt-0.5">All assessment requests across divisions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-md bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 h-10 rounded-md bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white text-[13px] font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-sm">
            <ClipboardList className="w-4 h-4" />
            Request Management
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-5 py-4 mb-6">
        <div className="flex flex-wrap items-end gap-4 sm:gap-6">
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Division</label>
            <div className="relative">
              <select 
                className="w-full appearance-none border border-gray-300 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer"
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
              >
                <option value="All divisions">All divisions</option>
                <option value="Direktorat IT Digital">Direktorat IT Digital</option>
                <option value="Human Capital Service Operations">Human Capital Service Operations</option>
                <option value="Direktorat Keuangan dan Manajemen Resiko">Direktorat Keuangan dan Manajemen Resiko</option>
                <option value="Divisi Digital Product">Divisi Digital Product</option>
                <option value="Direktorat Network">Direktorat Network</option>
                <option value="Divisi Government Service">Divisi Government Service</option>
                <option value="Divisi General Support">Divisi General Support</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="w-[180px]">
            <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Month</label>
            <div className="relative">
              <select 
                className="w-full appearance-none border border-gray-300 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="All month">All month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="w-[120px]">
            <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Year</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer">
                <option>All Year</option>
                <option>2026</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-xl p-5 text-white shadow-sm hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[13px] font-semibold opacity-90">Total Assessments Received</h3>
          <p className="text-[32px] font-bold leading-none mt-3">{Math.round(1247 * currentRatio).toLocaleString()}</p>
          <p className="text-[12px] font-medium opacity-90 flex items-center gap-1 mt-3">
            <TrendingUp className="w-3.5 h-3.5" />
            +12.3% vs last month
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#22c55e] to-[#15803d] rounded-xl p-5 text-white shadow-sm hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[13px] font-semibold opacity-90">Approval Rate</h3>
          <p className="text-[32px] font-bold leading-none mt-3">87.4%</p>
          <p className="text-[12px] font-medium opacity-90 flex items-center gap-1 mt-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Target KPI is &gt; 85%
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#ef4444] to-[#b91c1c] rounded-xl p-5 text-white shadow-sm hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[13px] font-semibold opacity-90">Pending PIR</h3>
          <p className="text-[32px] font-bold leading-none mt-3">{Math.round(23 * currentRatio)}</p>
          <p className="text-[12px] font-medium opacity-90 flex items-center gap-1 mt-3">
            <TrendingDown className="w-3.5 h-3.5" />
            +4 New alerts this week
          </p>
        </div>
      </div>

      {/* Status distribution / Trend / By division */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Status distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col h-full">
          <div>
            <h3 className="text-[15px] font-bold text-gray-900">Status distribution</h3>
            <p className="text-[12px] text-gray-500 mt-0.5 mb-8">All requests in your scope</p>
          </div>
          <div className="flex flex-wrap items-center justify-around gap-6 flex-1 w-full pb-2">
            <div
              className="relative w-[150px] h-[150px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: `conic-gradient(${donutStops})` }}
            >
              <div className="w-[100px] h-[100px] rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-[24px] font-bold text-gray-900 leading-none">{currentDonutTotal.toLocaleString()}</span>
                <span className="text-[11px] text-gray-400 font-medium mt-1">total</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1 min-w-[160px]">
              {statusDistribution.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                    <span className="text-[13px] text-gray-600 font-medium">{s.label}</span>
                  </div>
                  <span className="text-[14px] font-bold text-gray-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission & Complete Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-[15px] font-bold text-gray-900">Submission & Complete Trend</h3>
          <p className="text-[12px] text-gray-500 mt-0.5">Submissions and completions per month (12 months)</p>
          <div className="flex items-center gap-4 mt-3 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#4361ee] rounded-sm"></div>
              <span className="text-[11px] text-gray-600 font-medium">Submission</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#2a9d8f] rounded-sm"></div>
              <span className="text-[11px] text-gray-600 font-medium">Completed</span>
            </div>
          </div>

          <div className="relative h-[220px] w-full pt-6 overflow-x-auto overflow-y-hidden custom-scrollbar">
            <div className="min-w-[700px] h-full relative pb-8">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {yAxisValues.map((val, idx) => (
                  <div key={idx} className="w-full flex items-center relative pl-8">
                    <span className="absolute left-0 w-8 text-[10px] text-gray-400 font-medium -mt-0.5">{val}</span>
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 pl-12 pr-6 flex justify-between items-end pb-8">
                {displayChartData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end relative group">
                    <div className={`flex items-end h-full ${selectedMonth === 'All month' ? 'gap-2' : 'gap-1'}`}>
                      <div
                        className={`${selectedMonth === 'All month' ? 'w-[14px]' : 'w-[8px] sm:w-[10px]'} bg-[#4361ee] rounded-t-sm relative transition-all duration-1000 ease-out hover:opacity-80`}
                        style={{ height: isAnimated ? `${(d.submission / maxChartValue) * 100}%` : '0%' }}
                      >
                        {selectedMonth === 'All month' && (
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#4361ee] opacity-0 group-hover:opacity-100 transition-opacity">{d.submission}</span>
                        )}
                      </div>
                      <div
                        className={`${selectedMonth === 'All month' ? 'w-[14px]' : 'w-[8px] sm:w-[10px]'} bg-[#2a9d8f] rounded-t-sm relative transition-all duration-1000 ease-out hover:opacity-80`}
                        style={{ height: isAnimated ? `${(d.completed / maxChartValue) * 100}%` : '0%' }}
                      >
                        {selectedMonth === 'All month' && (
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#2a9d8f] opacity-0 group-hover:opacity-100 transition-opacity">{d.completed}</span>
                        )}
                      </div>
                    </div>
                    {selectedMonth !== 'All month' && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        <p>Sub: {d.submission}</p>
                        <p>Comp: {d.completed}</p>
                      </div>
                    )}
                    <span className={`absolute -bottom-6 text-[10px] text-gray-500 font-medium whitespace-nowrap ${selectedMonth !== 'All month' ? 'scale-75 origin-top' : ''}`}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* By division */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-[15px] font-bold text-gray-900">By division</h3>
          <p className="text-[12px] text-gray-500 mt-0.5 mb-5">Top divisions by request volume</p>
          <div className="flex flex-col gap-4">
            {byDivision.map((div) => (
              <div key={div.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">{div.name}</span>
                  <span className="text-[12px] font-bold text-gray-900">{div.value}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${div.color} rounded-full transition-all duration-700`}
                    style={{ width: `${(div.value / maxDivisionValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard / Bottleneck Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Division Compliance Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4">Division Compliance Leaderboard</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Rank</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-left">Division</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Submitted</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Completed</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Rate</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row) => (
                <tr key={row.rank} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-[13px] font-semibold text-gray-500 text-center">#{row.rank}</td>
                  <td className="py-3 text-[13px] font-bold text-gray-900 text-left">{row.division}</td>
                  <td className="py-3 text-[13px] text-gray-600 text-center">{row.submitted}</td>
                  <td className="py-3 text-[13px] text-gray-600 text-center">{row.completed}</td>
                  <td className="py-3 text-[13px] font-bold text-gray-900 text-center">{row.rate}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${statusStyles[row.status]}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottleneck Radar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-[15px] font-bold text-gray-900">Bottleneck Radar Leaderboard</h3>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Live
            </span>
          </div>
          <p className="text-[12px] text-gray-500 mb-4">Divisions with highest stuck queues</p>

          <div className="flex flex-col gap-4">
            {bottlenecks.map((b) => (
              <div key={b.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-bold text-gray-900">{b.name}</span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-red-600">
                    <AlertTriangle className="w-3 h-3" />
                    {b.stuck} stuck
                  </span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-gray-100">
                  {b.segments.map((seg) => (
                    <div
                      key={seg.label}
                      style={{ width: `${(seg.value / b.stuck) * 100}%`, backgroundColor: seg.color }}
                    ></div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  {b.segments.map((seg) => (
                    <span key={seg.label} className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: seg.color }}></span>
                      {seg.label}: {seg.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-5 pt-4">
            <p className="text-[12px] font-semibold text-indigo-600">Total stuck</p>
            <p className="text-[28px] font-bold text-gray-900 leading-none mt-1">{totalStuck}</p>
          </div>
        </div>
      </div>
    </>
  );
}
