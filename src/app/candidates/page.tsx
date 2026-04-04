'use client';

import { Users, Search, Filter, MoreHorizontal, Download, UserCheck, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import CandidateScorecard from '@/components/CandidateScorecard';

export default function CandidatesPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/applications')
            .then(res => res.json())
            .then(data => {
                setApplications(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Matrix</h1>
                    <p className="text-slate-500 font-bold mt-1">AI-Ranked applications across all deployed mission nodes.</p>
                </div>
                <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-[#2563EB] transition-all shadow-lg shadow-blue-100">
                    <Download className="w-5 h-5" />
                    Export Analytics
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100">
                    <Search className="w-5 h-5 text-slate-400 mr-2" />
                    <input type="text" placeholder="Search by name, role, or predicted score..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden font-bold">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate Node</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Mission</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Neural Score</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan={5} className="p-12 text-center text-slate-400 font-black uppercase tracking-widest">Synchronizing Neural Data...</td></tr>
                        ) : (
                            applications.map((app: any) => (
                                <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedApp(app)}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-ai-gradient rounded-2xl flex items-center justify-center text-white font-black shadow-xl text-lg">
                                                {app.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-slate-900 leading-none">{app.fullName}</p>
                                                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{app.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-[#1E3A8A]" />
                                            <span className="text-sm font-black text-[#1E3A8A] tracking-tight">{app.job?.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${app.matchScore > 80 ? 'bg-green-500' : app.matchScore > 50 ? 'bg-blue-500' : 'bg-amber-500'
                                                        }`}
                                                    style={{ width: `${app.matchScore}%` }}
                                                />
                                            </div>
                                            <span className={`text-xs font-black ${app.matchScore > 80 ? 'text-green-600' : app.matchScore > 50 ? 'text-blue-600' : 'text-amber-600'
                                                }`}>{app.matchScore}% Relevance</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm border ${app.status === 'applied' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            app.status === 'shortlisted' ? 'bg-green-50 text-green-600 border-green-100' :
                                                'bg-slate-50 text-slate-400 border-slate-100'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="bg-white border border-slate-100 p-2 rounded-xl text-slate-400 hover:text-[#1E3A8A] hover:border-[#1E3A8A] transition-all shadow-sm">
                                            <UserCheck className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedApp && (
                <CandidateScorecard
                    candidate={selectedApp}
                    onClose={() => setSelectedApp(null)}
                />
            )}
        </div>
    );
}
