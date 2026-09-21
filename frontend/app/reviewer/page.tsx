'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  RefreshCw, 
  ClipboardList, 
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export default function ReviewerDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('All month');
  const [selectedDivision, setSelectedDivision] = useState('All divisions');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [selectedMonth, selectedDivision]);

  const baseChartData = [
    { label: 'Jan 26', submission: 80, completed: 50 },
    { label: 'Feb 26', submission: 95, completed: 68 },
    { label: 'Mar 26', submission: 82, completed: 60 },
    { label: 'Apr 26', submission: 110, completed: 85 },
    { label: 'May 26', submission: 98, completed: 72 },
    { label: 'Jun 26', submission: 125, completed: 95 },
    { label: 'Jul 26', submission: 105, completed: 80 },
    { label: 'Aug 26', submission: 130, completed: 100 },
    { label: 'Sep 26', submission: 115, completed: 88 },
    { label: 'Oct 26', submission: 128, completed: 98 },
    { label: 'Nov 26', submission: 116, completed: 90 },
    { label: 'Dec 26', submission: 132, completed: 105 },
  ];

  const divisionMap: Record<string, number> = {
    'Direktorat IT Digital': 342,
    'Divisi Digital Product': 284,
    'Human Capital Service Operations': 215,
    'Direktorat Keuangan dan Manajemen Resiko': 189,
    'Direktorat Network': 166,
    'Divisi Government Service': 125,
    'Divisi General Support': 92,
  };

  const chartData = useMemo(() => {
    if (selectedDivision === 'All divisions') return baseChartData;
    const ratio = (divisionMap[selectedDivision] || 1247) / 1247;
    return baseChartData.map(d => ({
      ...d,
      submission: Math.round(d.submission * ratio),
      completed: Math.round(d.completed * ratio)
    }));
  }, [selectedDivision]);

  const stats = useMemo(() => {
    const ratio = selectedDivision === 'All divisions' ? 1 : (divisionMap[selectedDivision] || 1247) / 1247;
    return {
      total: Math.round(1247 * ratio),
      inReview: Math.round(325 * ratio),
      needRevision: Math.round(148 * ratio),
      approved: Math.round(214 * ratio),
      completed: Math.round(560 * ratio),
      needPir: Math.round(205 * ratio),
      pir: Math.round(355 * ratio),
    };
  }, [selectedDivision]);

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
    if (selectedMonth === 'All month') return 150;
    let max = 0;
    displayChartData.forEach(d => {
      if (d.submission > max) max = d.submission;
      if (d.completed > max) max = d.completed;
    });
    return Math.ceil(max / 5) * 5 || 5;
  }, [selectedMonth, displayChartData]);

  const yAxisValues = [
    maxChartValue,
    Math.round((maxChartValue * 2) / 3),
    Math.round(maxChartValue / 3),
    0
  ];

  const divisionData = [
    { name: 'Direktorat IT Digital', value: 342, max: 342, color: 'bg-[#4361ee]' },
    { name: 'Divisi Digital Product', value: 284, max: 342, color: 'bg-[#a855f7]' },
    { name: 'HC Service Operations', value: 215, max: 342, color: 'bg-[#f59e0b]' },
    { name: 'Direktorat Keuangan', value: 189, max: 342, color: 'bg-[#10b981]' },
    { name: 'Direktorat Network', value: 166, max: 342, color: 'bg-[#ec4899]' },
    { name: 'Divisi Government Service', value: 125, max: 342, color: 'bg-[#06b6d4]' },
    { name: 'Divisi General Support', value: 92, max: 342, color: 'bg-[#ef4444]' },
  ];

  const awaitingReview = [
    { id: 'GRD-2026-0011', title: 'Test Use Case 3', time: 'just now' },
    { id: 'GRD-2026-0010', title: 'Test Use Case 2', time: '12 hours ago' },
    { id: 'GRD-2026-0009', title: 'Test Use Case 1', time: '2 days ago' },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Dashboard Reviewer</h2>
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
        <div className="flex items-end gap-6">
          <div className="flex-1 max-w-[300px]">
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
                <option>All year</option>
                <option>2026</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Total</h3>
          <p className="text-[28px] font-bold leading-none mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-[#60a5fa] to-[#2563eb] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">In Review</h3>
          <p className="text-[28px] font-bold leading-none mt-2">{stats.inReview}</p>
        </div>
        <div className="bg-gradient-to-br from-[#fbbf24] to-[#d97706] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Need Revision</h3>
          <p className="text-[28px] font-bold leading-none mt-2">{stats.needRevision}</p>
        </div>
        <div className="bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Approved Use Case</h3>
          <p className="text-[28px] font-bold leading-none mt-2">{stats.approved}</p>
        </div>
        <div className="bg-gradient-to-br from-[#10b981] to-[#047857] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] relative hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Completed</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-[28px] font-bold leading-none">{stats.completed}</p>
            <div className="text-right flex flex-col gap-0.5">
              <div className="text-[9px] font-semibold flex items-center justify-end gap-1.5 opacity-90">
                <span>Need PIR</span>
                <span className="w-6 text-right">{stats.needPir}</span>
              </div>
              <div className="text-[9px] font-semibold flex items-center justify-end gap-1.5 opacity-90">
                <span>PIR</span>
                <span className="w-6 text-right">{stats.pir}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
        <div className="mb-6">
          <h3 className="text-[15px] font-bold text-gray-900">Submission & Complete Trend</h3>
          <p className="text-[12px] text-gray-500 mt-0.5">Submissions and completions per month (12 months)</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#4361ee] rounded-sm"></div>
              <span className="text-[11px] text-gray-600 font-medium">Submission</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#2a9d8f] rounded-sm"></div>
              <span className="text-[11px] text-gray-600 font-medium">Completed</span>
            </div>
          </div>
        </div>

        {/* Custom Bar Chart */}
        <div className="relative h-[220px] w-full pt-6 overflow-x-auto overflow-y-hidden custom-scrollbar">
          <div className="min-w-[700px] h-full relative pb-8">
            {/* Y-axis lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {yAxisValues.map((val, idx) => (
                <div key={idx} className="w-full flex items-center relative pl-8">
                  <span className="absolute left-0 w-8 text-[10px] text-gray-400 font-medium -mt-0.5">{val}</span>
                  <div className="w-full border-t border-gray-100"></div>
                </div>
              ))}
            </div>

            {/* Bars container */}
            <div className="absolute inset-0 pl-12 pr-6 flex justify-between items-end pb-8">
              {displayChartData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1 h-full justify-end relative group">
                  <div className={`flex items-end h-full ${selectedMonth === 'All month' ? 'gap-2' : 'gap-1'}`}>
                    {/* Submission Bar */}
                    <div 
                      className={`${selectedMonth === 'All month' ? 'w-[20px]' : 'w-[8px] sm:w-[10px]'} bg-[#4361ee] rounded-t-sm relative transition-all duration-1000 ease-out hover:opacity-80`}
                      style={{ height: isAnimated ? `${(d.submission / maxChartValue) * 100}%` : '0%' }}
                    >
                      {selectedMonth === 'All month' && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#4361ee] opacity-0 group-hover:opacity-100 transition-opacity">{d.submission}</span>
                      )}
                    </div>
                    {/* Completed Bar */}
                    <div 
                      className={`${selectedMonth === 'All month' ? 'w-[20px]' : 'w-[8px] sm:w-[10px]'} bg-[#2a9d8f] rounded-t-sm relative transition-all duration-1000 ease-out hover:opacity-80`}
                      style={{ height: isAnimated ? `${(d.completed / maxChartValue) * 100}%` : '0%' }}
                    >
                      {selectedMonth === 'All month' && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#2a9d8f] opacity-0 group-hover:opacity-100 transition-opacity">{d.completed}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Tooltip for daily view */}
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

      {/* Bottom Panels */}
      <div className="grid grid-cols-2 gap-6">
        {/* By Division */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="mb-5">
            <h3 className="text-[15px] font-bold text-gray-900">By division</h3>
            <p className="text-[12px] text-gray-500 mt-0.5">Top divisions by request volume</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {divisionData.map((div, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">{div.name}</span>
                  <span className="text-[12px] font-bold text-gray-900">{div.value}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${div.color} rounded-full transition-all duration-700`}
                    style={{ width: `${(div.value / div.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awaiting Review */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">Awaiting review</h3>
              <p className="text-[12px] text-gray-500 mt-0.5">Oldest waiting first</p>
            </div>
            <button className="px-4 py-1.5 bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white text-[11px] font-semibold rounded-full hover:opacity-90 transition">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {awaitingReview.map((item, i) => (
              <div key={i} className="bg-[#f8f9fc] rounded-lg p-3.5 flex items-center justify-between cursor-pointer hover:bg-indigo-50/50 transition group border border-transparent hover:border-indigo-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[12px] font-bold text-[#2e347b]">{item.id}</span>
                    <span className="px-1.5 py-[2px] rounded text-[9px] font-bold bg-[#f8e5c4] text-[#8e5c1d] uppercase tracking-wider">
                      In Review
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-[11px] text-gray-500">Requester Dummy · {item.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2e347b] transition" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
