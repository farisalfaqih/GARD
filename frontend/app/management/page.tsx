'use client';

import {
  RefreshCw,
  ClipboardList,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';

export default function ManagementDashboard() {
  const statusDistribution = [
    { label: 'Need Revision', value: 123, color: '#f59e0b' },
    { label: 'Approved Use Case', value: 321, color: '#a855f7' },
    { label: 'Completed', value: 830, color: '#22c55e' },
  ];
  const statusDisplayTotal = 1247;
  const statusDonutTotal = statusDistribution.reduce((sum, s) => sum + s.value, 0);

  let donutCursor = 0;
  const donutStops = statusDistribution
    .map((s) => {
      const start = (donutCursor / statusDonutTotal) * 360;
      donutCursor += s.value;
      const end = (donutCursor / statusDonutTotal) * 360;
      return `${s.color} ${start}deg ${end}deg`;
    })
    .join(', ');

  const trendData = [
    { label: 'Mar 24', submission: 3, completed: 1 },
    { label: 'Apr 24', submission: 1, completed: 1 },
    { label: 'May 24', submission: 2, completed: 1 },
    { label: 'Jun 24', submission: 3, completed: 2 },
    { label: 'Jul 24', submission: 2, completed: 1 },
    { label: 'Aug 24', submission: 3, completed: 2 },
  ];
  const maxTrendValue = 3;

  const byDivision = [
    { name: 'DIREKTORAT IT DIGITAL', value: 342, color: 'bg-[#4361ee]' },
    { name: 'HUMAN CAPITAL SERVICE OPERATIONS', value: 215, color: 'bg-[#f59e0b]' },
    { name: 'DIREKTORAT KEUANGAN DAN MANAJEMEN RESIKO', value: 189, color: 'bg-[#10b981]' },
  ];
  const maxDivisionValue = 342;

  const leaderboard = [
    { rank: 1, division: 'Direktorat IT Digital', submitted: 342, completed: 336, rate: '98.2%', status: 'On Track' },
    { rank: 2, division: 'HC Service Operations', submitted: 215, completed: 205, rate: '95.5%', status: 'On Track' },
    { rank: 3, division: 'Direktorat Keuangan', submitted: 189, completed: 172, rate: '91.0%', status: 'On Track' },
    { rank: 4, division: 'Divisi Digital Product', submitted: 284, completed: 239, rate: '84.3%', status: 'At Risk' },
    { rank: 5, division: 'Divisi Government Service', submitted: 125, completed: 91, rate: '72.4%', status: 'Critical' },
    { rank: 6, division: 'Divisi General Support', submitted: 92, completed: 63, rate: '68.1%', status: 'Critical' },
  ];

  const statusStyles: Record<string, string> = {
    'On Track': 'bg-green-100 text-green-700',
    'At Risk': 'bg-amber-100 text-amber-700',
    Critical: 'bg-red-100 text-red-700',
  };

  const bottlenecks = [
    {
      name: 'Operations',
      stuck: 23,
      segments: [
        { label: 'DG Council', value: 8, color: '#4361ee' },
        { label: 'Direktur Use Case', value: 6, color: '#f59e0b' },
        { label: 'Data Owner', value: 5, color: '#10b981' },
        { label: 'Corporate NDA', value: 4, color: '#a855f7' },
      ],
    },
    {
      name: 'Human Capital',
      stuck: 16,
      segments: [
        { label: 'DG Council', value: 6, color: '#4361ee' },
        { label: 'Direktur Use Case', value: 4, color: '#f59e0b' },
        { label: 'Data Owner', value: 3, color: '#10b981' },
        { label: 'Corporate NDA', value: 3, color: '#a855f7' },
      ],
    },
    {
      name: 'Marketing',
      stuck: 15,
      segments: [
        { label: 'DG Council', value: 5, color: '#4361ee' },
        { label: 'Direktur Use Case', value: 4, color: '#f59e0b' },
        { label: 'Data Owner', value: 3, color: '#10b981' },
        { label: 'Corporate NDA', value: 3, color: '#a855f7' },
      ],
    },
    {
      name: 'Finance',
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
              <select className="w-full appearance-none border border-gray-300 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer">
                <option>All divisions</option>
                <option>Direktorat IT Digital</option>
                <option>Human Capital Service Operations</option>
                <option>Direktorat Keuangan dan Manajemen Resiko</option>
                <option>Divisi Digital Product</option>
                <option>Divisi Government Service</option>
                <option>Divisi General Support</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="w-[180px]">
            <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Month</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer">
                <option>All month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="w-[120px]">
            <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Year</label>
            <div className="relative">
              <select className="w-full appearance-none border-2 border-indigo-500 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer">
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
          <p className="text-[32px] font-bold leading-none mt-3">1,247</p>
          <p className="text-[12px] font-medium opacity-90 flex items-center gap-1 mt-3">
            <TrendingUp className="w-3.5 h-3.5" />
            +12.3% vs last month
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#22c55e] to-[#15803d] rounded-xl p-5 text-white shadow-sm hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[13px] font-semibold opacity-90">Approval Rate</h3>
          <p className="text-[32px] font-bold leading-none mt-3">87.4%</p>
          <p className="text-[12px] font-medium opacity-90 flex items-center gap-1 mt-3">
            <TrendingDown className="w-3.5 h-3.5" />
            Target KPI is &gt; 85%
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#ef4444] to-[#b91c1c] rounded-xl p-5 text-white shadow-sm hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[13px] font-semibold opacity-90">Pending PIR</h3>
          <p className="text-[32px] font-bold leading-none mt-3">23</p>
          <p className="text-[12px] font-medium opacity-90 flex items-center gap-1 mt-3">
            <TrendingDown className="w-3.5 h-3.5" />
            +4 New alerts this week
          </p>
        </div>
      </div>

      {/* Status distribution / Trend / By division */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Status distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-[15px] font-bold text-gray-900">Status distribution</h3>
          <p className="text-[12px] text-gray-500 mt-0.5 mb-6">All requests in your scope</p>
          <div className="flex flex-wrap items-center gap-6">
            <div
              className="relative w-[140px] h-[140px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: `conic-gradient(${donutStops})` }}
            >
              <div className="w-[92px] h-[92px] rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-[22px] font-bold text-gray-900 leading-none">{statusDisplayTotal.toLocaleString()}</span>
                <span className="text-[10px] text-gray-400 font-medium mt-1">total</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {statusDistribution.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></span>
                    <span className="text-[12px] text-gray-600 font-medium">{s.label}</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission & Complete Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-[15px] font-bold text-gray-900">Submission & Complete Trend</h3>
          <p className="text-[12px] text-gray-500 mt-0.5">Submissions and completions per month (6 months)</p>
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

          <div className="overflow-x-auto">
            <div className="relative h-[160px] min-w-[380px] pt-6">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[3, 2, 1, 0].map((val) => (
                  <div key={val} className="w-full flex items-center relative pl-6">
                    <span className="absolute left-0 w-6 text-[10px] text-gray-400 font-medium -mt-0.5">{val}</span>
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 pl-9 pr-2 flex justify-between items-end pb-8">
                {trendData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end relative">
                    <div className="flex items-end gap-1.5 h-full">
                      <div
                        className="w-[14px] bg-[#4361ee] rounded-t-sm relative transition-all duration-300"
                        style={{ height: `${(d.submission / maxTrendValue) * 100}%` }}
                      >
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#4361ee]">{d.submission}</span>
                      </div>
                      <div
                        className="w-[14px] bg-[#2a9d8f] rounded-t-sm relative transition-all duration-300"
                        style={{ height: `${(d.completed / maxTrendValue) * 100}%` }}
                      >
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#2a9d8f]">{d.completed}</span>
                      </div>
                    </div>
                    <span className="absolute -bottom-6 text-[10px] text-gray-500 font-medium whitespace-nowrap">{d.label}</span>
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
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide">Rank</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide">Division</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-right">Submitted</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-right">Completed</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-right">Rate</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row) => (
                <tr key={row.rank} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-[13px] font-semibold text-gray-500">#{row.rank}</td>
                  <td className="py-3 text-[13px] font-bold text-gray-900">{row.division}</td>
                  <td className="py-3 text-[13px] text-gray-600 text-right">{row.submitted}</td>
                  <td className="py-3 text-[13px] text-gray-600 text-right">{row.completed}</td>
                  <td className="py-3 text-[13px] font-bold text-gray-900 text-right">{row.rate}</td>
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
            <h3 className="text-[15px] font-bold text-gray-900">Bottleneck Radar</h3>
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
