'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Bell,
  Moon,
  User,
  ShieldCheck,
  Building2,
  LogOut,
  ChevronRight,
  Check,
} from 'lucide-react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    setShowProfileMenu(false);
    router.push(path);
  };

  const isRequester = pathname === '/' || pathname === '';
  const isReviewer = pathname === '/reviewer';

  return (
    <div className="min-h-screen flex bg-[#f8f9fc]">
      {/* Sidebar - Fixed */}
      <aside className="w-16 bg-[#e6e8eb] flex flex-col items-center justify-between py-4 border-r border-gray-200 fixed h-screen top-0 left-0 z-50">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
            <svg viewBox="0 0 100 120" className="w-6 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 25 Q50 15 100 25 L100 40 Q50 30 0 40 Z" fill="#6a9ad1" />
              <path d="M0 45 Q50 35 100 45 L100 48 Q50 38 0 48 Z" fill="#a4cae8" />
              <path d="M0 53 Q50 43 100 53 L100 65 C85 62 75 58 75 58 L52 58 L52 72 L68 72 C64 85 50 90 50 90 C30 80 28 65 30 55 L0 53 C0 90 50 120 50 120 C50 120 100 95 100 65 Z" fill="#00205b" />
            </svg>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center cursor-pointer shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00205b]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          </div>
        </div>
        
        {/* Profile Menu Wrapper */}
        <div className="relative mt-auto">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-9 h-9 rounded-full bg-[#001b44] text-white flex items-center justify-center text-[10px] font-bold cursor-pointer hover:scale-105 transition-all shadow-sm border-2 border-transparent hover:border-white/20"
          >
            RD
          </div>

          {/* Popover Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-0 left-12 ml-2 w-64 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-[60] overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-900">
                  {isReviewer ? 'Reviewer Dummy' : 'Requester Dummy'}
                </p>
                <p className="text-[11px] text-gray-500 font-medium">
                  {isReviewer ? 'reviewer@gard.id' : 'requester@gard.id'}
                </p>
              </div>

              <div className="py-2 flex flex-col">
                <span className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Switch Role</span>

                {/* Requester */}
                <div
                  onClick={() => handleNavigation('/')}
                  className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition ${isRequester ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-gray-50 group'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded flex items-center justify-center shadow-sm transition ${isRequester ? 'bg-[#2e347b] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#2e347b]/10 group-hover:text-[#2e347b]'}`}>
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-[13px] transition ${isRequester ? 'font-semibold text-[#2e347b]' : 'font-medium text-gray-700 group-hover:text-gray-900'}`}>Requester</span>
                  </div>
                  {isRequester ? <Check className="w-4 h-4 text-[#2e347b]" /> : <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />}
                </div>

                {/* Reviewer */}
                <div
                  onClick={() => handleNavigation('/reviewer')}
                  className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition ${isReviewer ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-gray-50 group'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded flex items-center justify-center shadow-sm transition ${isReviewer ? 'bg-[#2e347b] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-700'}`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-[13px] transition ${isReviewer ? 'font-semibold text-[#2e347b]' : 'font-medium text-gray-700 group-hover:text-gray-900'}`}>Reviewer</span>
                  </div>
                  {isReviewer ? <Check className="w-4 h-4 text-[#2e347b]" /> : <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />}
                </div>

                {/* Management */}
                <div className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 flex items-center justify-center transition">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900 transition">Management</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2 pb-1">
                <div className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-red-50 text-gray-600 hover:text-red-600 transition group">
                  <div className="w-7 h-7 flex items-center justify-center">
                    <LogOut className="w-4 h-4 group-hover:text-red-500" />
                  </div>
                  <span className="text-[13px] font-medium">Log out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-16 min-h-screen">
        {/* Header - Sticky */}
        <header className="bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-bold tracking-wide">GARD</h1>
            <p className="text-[11px] text-indigo-200 uppercase tracking-wider font-semibold">Governance Assessment & Repository</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer hover:opacity-80 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-transparent"></span>
            </div>
            <div className="cursor-pointer hover:opacity-80 transition">
              <Moon className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
