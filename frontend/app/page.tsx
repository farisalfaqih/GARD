'use client';

import { useEffect, useState } from 'react';
import {
  Shield,
  Bell,
  RefreshCw,
  Circle,
  Plus,
  Check,
  ChevronDown,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Pencil,
  Moon,
  User,
  ShieldCheck,
  Building2,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface DashboardData {
  stats: {
    total: number;
    inReview: number;
    needRevision: number;
    completed: number;
  };
  assessmentProgresses: {
    current: string;
    version: string;
    status: string;
    steps: { name: string; completed: boolean; current?: boolean }[];
  }[];
  actionRequired: {
    id: string;
    badge: string;
    title: string;
    time: string;
  }[];
  recentRequests: {
    threadId: string;
    title: string;
    type: string;
    version: string;
    status: string;
    lastUpdated: string;
  }[];
}

const mockData: DashboardData = {
  stats: {
    total: 30,
    inReview: 10,
    needRevision: 4,
    completed: 16,
  },
  assessmentProgresses: [
    {
      current: 'Permintaan Penggunaan HCSO',
      version: 'v2',
      status: 'NEED REVISION',
      steps: [
        { name: 'Draft', completed: true },
        { name: 'Submitted', completed: true },
        { name: 'Review', completed: true },
        { name: 'Revision', completed: true, current: true },
        { name: 'DG Council', completed: true },
        { name: 'Completed', completed: false },
      ],
    },
    {
      current: 'Test Use Case Baru',
      version: 'v1',
      status: 'COMPLETED',
      steps: [
        { name: 'Draft', completed: true },
        { name: 'Submitted', completed: true },
        { name: 'Review', completed: true },
        { name: 'Revision', completed: true },
        { name: 'DG Council', completed: true },
        { name: 'Completed', completed: true, current: true },
      ],
    },
    {
      current: 'Perubahan Data Target',
      version: 'v2',
      status: 'IN REVIEW',
      steps: [
        { name: 'Draft', completed: true },
        { name: 'Submitted', completed: true },
        { name: 'Review', completed: true, current: true },
        { name: 'Revision', completed: false },
        { name: 'DG Council', completed: false },
        { name: 'Completed', completed: false },
      ],
    }
  ],
  actionRequired: [
    {
      id: 'GRD-2026-0008',
      badge: 'NEED REVISION',
      title: 'Permintaan Penggunaan HCSO',
      time: '7 days ago',
    },
    {
      id: 'GRD-2026-0008',
      badge: 'NEED DATA PROVIDER EVIDENCE',
      title: 'Permintaan Penggunaan HCSO',
      time: '7 days ago',
    },
    {
      id: 'GRD-2026-0008',
      badge: 'NEED DATA PROCESSING APPROVALS',
      title: 'Permintaan Penggunaan HCSO',
      time: '7 days ago',
    },
  ],
  recentRequests: [
    {
      threadId: 'GRD-2026-0008',
      title: 'Permintaan Penggunaan HCSO',
      type: 'Assessment',
      version: 'v2',
      status: 'Need Revision',
      lastUpdated: '7 days ago',
    },
    {
      threadId: 'GRD-2026-0005',
      title: 'Test Use Case Baru',
      type: 'Assessment',
      version: 'v1',
      status: 'Completed',
      lastUpdated: '10 days ago',
    },
    {
      threadId: 'GRD-2026-0007',
      title: 'Perubahan Data Target',
      type: 'Reassessment',
      version: 'v2',
      status: 'In Review',
      lastUpdated: '10 days ago',
    },
  ],
};

const getBadgeColor = (badge: string) => {
  const b = badge.toLowerCase();
  if (b.includes('need revision')) return 'bg-[#f8e5c4] text-[#8e5c1d]';
  if (b.includes('data provider')) return 'bg-[#f8e5c4] text-[#8e5c1d]';
  if (b.includes('data processing')) return 'bg-[#f8e5c4] text-[#8e5c1d]';
  if (b === 'completed') return 'bg-green-100 text-green-700';
  if (b === 'in review') return 'bg-purple-100 text-purple-700';
  return 'bg-gray-100 text-gray-800';
};

const getTableBadgeColor = (status: string) => {
  const s = status.toLowerCase();
  if (s === 'need revision') return 'bg-[#f8e5c4] text-[#8e5c1d]';
  if (s === 'completed') return 'bg-[#d2f3d8] text-[#1c7835]';
  if (s === 'in review') return 'bg-[#ebd9f8] text-[#6b2c91]';
  return 'bg-gray-100 text-gray-700';
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(mockData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedProgressIdx, setSelectedProgressIdx] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      // Use mock data if API not available
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { stats, assessmentProgresses, actionRequired, recentRequests } = data;
  const currentProgress = assessmentProgresses ? (assessmentProgresses[selectedProgressIdx] || assessmentProgresses[0]) : null;

  const filteredRequests = recentRequests.filter(
    (r) =>
      r.threadId.toLowerCase().includes(searchText.toLowerCase()) ||
      r.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
          {/* Page Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Dashboard Requester</h2>
              <p className="text-[13px] text-gray-500 mt-0.5">Your assessment overview and upcoming tasks.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                className="w-10 h-10 rounded-md bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button className="px-4 py-2 h-10 rounded-md border-2 border-gard-header bg-white text-gard-header text-[13px] font-semibold hover:bg-indigo-50 transition shadow-sm">
                MY REQUESTS
              </button>
              <button className="px-4 py-2 h-10 rounded-md bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white text-[13px] font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-sm">
                <Plus className="w-4 h-4" />
                CREATE ASSESSMENT
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div className="bg-gradient-to-br from-[#2e347b] to-[#12164a] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Total</h3>
              <p className="text-[28px] font-bold leading-none mt-2">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">In Review</h3>
              <p className="text-[28px] font-bold leading-none mt-2">{stats.inReview}</p>
            </div>
            <div className="bg-gradient-to-br from-[#f59e0b] to-[#9a3412] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Need Revision</h3>
              <p className="text-[28px] font-bold leading-none mt-2">{stats.needRevision}</p>
            </div>
            <div className="bg-gradient-to-br from-[#10b981] to-[#064e3b] rounded-xl p-4 text-white shadow-sm flex flex-col justify-between min-h-[90px] hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90">Completed</h3>
              <p className="text-[28px] font-bold leading-none mt-2">{stats.completed}</p>
            </div>
          </div>

          {/* My Assessment Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
            <h3 className="text-[15px] font-bold text-gray-900 mb-4">My Assessment Progress</h3>
            {currentProgress && (
              <>
                <div className="flex items-center gap-3 mb-12">
                  <div className="relative">
                    <select
                      className="appearance-none border border-[#3b3f94] rounded-md px-3 py-1.5 pr-8 text-[13px] font-medium text-[#2d2d2d] bg-white focus:outline-none cursor-pointer"
                      value={selectedProgressIdx}
                      onChange={(e) => setSelectedProgressIdx(Number(e.target.value))}
                    >
                      {assessmentProgresses.map((p, idx) => (
                        <option key={idx} value={idx}>{p.current}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#2d2d2d] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e6e8eb] text-[#717682] text-[11px] font-medium inline-flex items-center">
                    {currentProgress.version}
                  </span>
                  <span className={`px-1.5 py-[2px] rounded text-[9px] font-bold ${getBadgeColor(currentProgress.status)} uppercase tracking-wider`}>
                    {currentProgress.status}
                  </span>
                </div>

                {/* Stepper */}
                <div className="relative px-8 pt-2 pb-8 max-w-4xl mx-auto">
                  <div className="flex justify-between relative z-10">
                    {currentProgress.steps.map((step, idx) => {
                      const isLast = idx === currentProgress.steps.length - 1;
                      const hasNext = idx < currentProgress.steps.length - 1;
                      const nextStep = hasNext ? currentProgress.steps[idx + 1] : null;
                  const lineCompleted = hasNext && step.completed && nextStep!.completed;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center relative flex-1"
                    >
                      {hasNext && (
                        <div
                          className={`absolute top-[16px] left-[50%] w-full h-[2px] z-0 ${
                            lineCompleted ? 'bg-[#006c28]' : 'bg-[#717682]'
                          }`}
                        ></div>
                      )}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-0 z-10 relative ${
                          step.completed
                            ? 'bg-[#006c28] text-white'
                            : 'bg-[#717682] text-white'
                        }`}
                      >
                        {step.completed ? (
                          <Check className="w-4 h-4" strokeWidth={3} />
                        ) : (
                          <Pencil className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <p
                        className={`text-[13.5px] mt-2.5 text-center z-10 relative tracking-wide ${
                          step.completed
                            ? 'text-[#006c28]'
                            : 'text-[#717682]'
                        } ${step.current ? 'font-bold' : 'font-medium'}`}
                      >
                        {step.name}
                      </p>
                      {isLast && (
                        <button className="mt-1 px-3 py-[2px] bg-[#717682] text-white text-[9px] font-medium rounded hover:bg-gray-600 transition">
                          PIR
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            </>
          )}
          </div>

          {/* Action Required */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
            <div className="flex items-baseline gap-4 mb-4">
              <h3 className="text-[15px] font-bold text-gray-900">Action Required</h3>
              <a href="#" className="text-[12px] font-bold text-[#3b3f94] hover:underline">
                See All
              </a>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {actionRequired.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 border border-gray-200 rounded p-4 bg-[#fafafa] flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#3b3f94]/30 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[13px] text-gray-700">{item.id}</span>
                      <span className={`px-1.5 py-[2px] rounded text-[9px] font-bold ${getBadgeColor(item.badge)} uppercase tracking-wider`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[14px] font-medium text-gray-900 mb-6">{item.title}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[12px]">{item.time}</span>
                    </div>
                    <button className="px-3.5 py-1.5 bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white text-[10px] font-semibold rounded hover:opacity-90 transition tracking-wider shadow-sm">
                      REVIEW NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Recent Requests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-900">My Recent Requests</h3>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-9 pr-9 py-2 border border-gray-200 rounded-lg text-[13px] text-[#2d2d2d] focus:outline-none focus:border-[#3b3f94] w-64 shadow-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                  <Filter className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[#717682] text-[11px] font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="text-left py-3 px-4">Thread ID</th>
                    <th className="text-left py-3 px-4">Request Title</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Version</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 text-[13px] text-gray-600 font-medium">{req.threadId}</td>
                      <td className="py-4 px-4 text-[13px] text-[#2d2d2d] font-medium">{req.title}</td>
                      <td className="py-4 px-4 text-[13px] text-gray-600">{req.type}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 bg-[#e6e8eb] rounded text-[11px] text-[#717682] font-semibold">
                          {req.version}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold ${getTableBadgeColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[13px] text-gray-600">{req.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <button className="text-[13px] font-bold text-[#101828] hover:text-[#3b3f94] transition flex items-center gap-1.5 uppercase tracking-wider">
                VIEW ALL REQUESTS
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
    </>
  );
}
