'use client';

import { useSession } from "next-auth/react";
import { Plus, User, ShieldCheck, Award, Zap } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import RecentJobs from "@/components/RecentJobs";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 space-y-8 overflow-y-auto animate-in fade-in duration-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recruiter Command Center</h1>
              <p className="text-slate-500 font-bold mt-1">
                Welcome back, {session?.user?.name || 'Recruiter'}. Here's your talent intelligence overview.
              </p>
            </div>
            <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-[#2563EB] transition-all shadow-lg shadow-blue-100 active:scale-95">
              <Plus className="w-5 h-5" />
              Create New Job
            </button>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentJobs />
            </div>

            <div className="space-y-8">
              {/* Recruiter Profile Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#7C3AED]/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700" />
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#2563EB]" />
                  Recruiter Profile
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-white shadow-lg">
                    <Award className="w-8 h-8 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 truncate max-w-[150px]">{session?.user?.name || 'Authorized Recruiter'}</p>
                    <p className="text-xs text-slate-400 font-bold">{session?.user?.email || 'recruiter@umurava.ai'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-500">Access Level</span>
                    <span className="text-[#16A34A] uppercase tracking-tighter">Pro Recruiter</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-500">Node Location</span>
                    <span className="text-slate-900">Kigali, Rwanda</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#7C3AED]" />
                  AI Screening Pulse
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 relative">
                      {i !== 3 && <div className="absolute left-2 top-6 bottom-[-24px] w-0.5 bg-slate-100" />}
                      <div className={`w-4 h-4 rounded-full mt-1 shrink-0 ${i === 1 ? 'bg-[#2563EB]' : i === 2 ? 'bg-[#7C3AED]' : 'bg-[#16A34A]'} ring-4 ring-white shadow-sm`} />
                      <div>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed">
                          {i === 1 && 'Screened 12 candidates for "Senior Frontend Engineer"'}
                          {i === 2 && 'AI Model updated: Predictive Accuracy +4.2%'}
                          {i === 3 && 'Shortlisted 3 candidates for "Product Lead"'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-black uppercase mt-1">{i * 2} hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
