import { useEffect, useState } from 'react';
import { MoreVertical, Users, Briefcase, Sparkles } from 'lucide-react';

export default function RecentJobs() {
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-slate-900 tracking-tight">Active Intelligence Nodes</h3>
                </div>
                <button className="text-[#1E3A8A] text-xs font-black uppercase tracking-widest hover:text-[#2563EB] transition-colors">View All Archive</button>
            </div>
            <div className="divide-y divide-slate-50">
                {!Array.isArray(jobs) || jobs.length === 0 ? (
                    <div className="p-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100 shadow-inner">
                            <Briefcase className="w-8 h-8 text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-bold text-sm italic">
                            {Array.isArray(jobs) ? "The matrix is empty. Deploy your first job node." : "Neural link interrupted. Reconnecting to database..."}
                        </p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className="p-8 hover:bg-slate-50/80 transition-all flex items-center justify-between group">
                            <div className="flex gap-6 items-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-xl group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-6 h-6 text-[#7C3AED]" />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg text-slate-900 leading-tight">{job.title}</h4>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{job.location}</p>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <p className="text-xs text-[#2563EB] font-black uppercase tracking-tighter">{job.employmentType || 'Full-time'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-10">
                                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                                    <Users className="w-4 h-4 text-[#1E3A8A]" />
                                    <span className="text-[10px] font-black uppercase text-[#1E3A8A] tracking-widest">AI Matrix Active</span>
                                </div>
                                <span className={`text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest shadow-sm ${job.status === 'open' ? 'bg-green-50 text-[#16A34A] border border-green-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                                    }`}>
                                    {job.status}
                                </span>
                                <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
