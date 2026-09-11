'use client';

import { 
  RefreshCw, 
  ClipboardList, 
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export default function ReviewerDashboard() {
  const chartData = [
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

  const maxChartValue = 150;

  const divisionData = [
    { name: 'DIVISI DIGITAL PRODUCT', value: 355, max: 400, color: 'bg-[#4361ee]' },
    { name: 'DIVISI GOVERNMENT SERVICE', value: 268, max: 400, color: 'bg-[#b05bff]' },
    { name: 'DIREKTORAT IT DIGITAL', value: 205, max: 400, color: 'bg-[#2a9d8f]' },
    { name: 'HUMAN CAPITAL SERVICE OPS', value: 176, max: 400, color: 'bg-[#f77f00]' },
    { name: 'DIVISI DATA & ANALYTICS', value: 143, max: 400, color: 'bg-[#4cc9f0]' },
    { name: 'DIREKTORAT KEUANGAN & RISIKO', value: 100, max: 400, color: 'bg-[#8e9aaf]' },
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
              <select className="w-full appearance-none border border-gray-300 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer">
                <option>All divisions</option>
                <option>Direktorat IT Digital</option>
                <option>Divisi Government Service</option>
                <option>Divisi Digital Product</option>
                <option>Human Capital Service Operations</option>
                <option>Divisi Data & Analytics</option>
                <option>Direktorat Keuangan & Resiko</option>
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
              <select className="w-full appearance-none border border-gray-300 text-gray-700 text-[13px] rounded-md px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer">
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
          <p className="text-[28px] font-bold leading-none mt-2">1247</p>
        </div>
        <div className="bg-gradient-to-br from-[#60a5fa] to-[#2563eb] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">In Review</h3>
          <p className="text-[28px] font-bold leading-none mt-2">325</p>
        </div>
        <div className="bg-gradient-to-br from-[#fbbf24] to-[#d97706] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Need Revision</h3>
          <p className="text-[28px] font-bold leading-none mt-2">148</p>
        </div>
        <div className="bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Approved Use Case</h3>
          <p className="text-[28px] font-bold leading-none mt-2">214</p>
        </div>
        <div className="bg-gradient-to-br from-[#10b981] to-[#047857] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] relative hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Completed</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-[28px] font-bold leading-none">560</p>
            <div className="text-right flex flex-col gap-0.5">
              <div className="text-[9px] font-semibold flex items-center justify-end gap-1.5 opacity-90">
                <span>Need PIR</span>
                <span className="w-6 text-right">205</span>
              </div>
              <div className="text-[9px] font-semibold flex items-center justify-end gap-1.5 opacity-90">
                <span>PIR</span>
                <span className="w-6 text-right">355</span>
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
        <div className="relative h-[220px] w-full pt-6">
          {/* Y-axis lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
            {[150, 100, 50, 0].map((val) => (
              <div key={val} className="w-full flex items-center relative pl-8">
                <span className="absolute left-0 w-8 text-[10px] text-gray-400 font-medium -mt-0.5">{val}</span>
                <div className="w-full border-t border-gray-100"></div>
              </div>
            ))}
          </div>

          {/* Bars container */}
          <div className="absolute inset-0 pl-12 pr-6 flex justify-between items-end pb-8">
            {chartData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1 h-full justify-end relative group">
                <div className="flex items-end gap-2 h-full">
                  {/* Submission Bar */}
                  <div 
                    className="w-[20px] bg-[#4361ee] rounded-t-sm relative transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(d.submission / maxChartValue) * 100}%` }}
                  >
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#4361ee]">{d.submission}</span>
                  </div>
                  {/* Completed Bar */}
                  <div 
                    className="w-[20px] bg-[#2a9d8f] rounded-t-sm relative transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(d.completed / maxChartValue) * 100}%` }}
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
