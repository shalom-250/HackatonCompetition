'use client';

import { Users, Search, Filter, MoreHorizontal, Download, UserCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import CandidateScorecard from '@/components/CandidateScorecard';

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState<any[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/candidates')
            .then(res => res.json())
            .then(data => {
                setCandidates(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Talent Pool</h1>
                    <p className="text-slate-500 font-bold mt-1">AI-Ranked Candidates for your open positions</p>
                </div>
                <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-[#2563EB] transition-all shadow-lg shadow-blue-100">
                    <Download className="w-5 h-5" />
                    Export CSV
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100">
                    <Search className="w-5 h-5 text-slate-400 mr-2" />
                    <input type="text" placeholder="Search by name, skill, or role..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Match</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Score</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan={5} className="p-12 text-center text-slate-400 font-bold">Analyzing profiles...</td></tr>
                        ) : (
                            candidates.map((c: any) => (
                                <tr key={c._id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedCandidate(c)}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-ai-gradient rounded-xl flex items-center justify-center text-white font-black shadow-lg">
                                                {c.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 tracking-tight">{c.name}</p>
                                                <p className="text-xs text-slate-500 font-bold">{c.location || 'Kigali, Rwanda'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold text-slate-700">{c.role}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${c.score}%` }} />
                                            </div>
                                            <span className="text-sm font-black text-[#2563EB]">{c.score}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-[10px] bg-green-50 text-[#16A34A] border border-green-100 px-2 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm">
                                            {c.status || 'Screened'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="p-2 text-slate-300 hover:text-[#1E3A8A] transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedCandidate && (
                <CandidateScorecard
                    candidate={selectedCandidate}
                    onClose={() => setSelectedCandidate(null)}
                />
            )}
        </div>
    );
}
