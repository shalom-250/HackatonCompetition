import { useEffect, useState } from 'react';
import { MoreVertical, Users, Briefcase } from 'lucide-react';

export default function RecentJobs() {
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold">Recent Job Postings</h3>
                <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
                {!Array.isArray(jobs) || jobs.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 text-sm italic">
                        {Array.isArray(jobs) ? "No active jobs found. Create one to get started." : "Unable to load jobs. Please check database connection."}
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner">
                                    <Briefcase className="w-6 h-6 text-[#1E3A8A]" />
                                </div>
                                <div>
                                    <h4 className="font-black text-sm text-[#111827]">{job.title}</h4>
                                    <p className="text-xs text-[#6B7280] font-medium tracking-tight">Kigali, Rwanda • {job.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#2563EB]" />
                                    <span className="text-xs font-black uppercase text-slate-400">AI Screening Active</span>
                                </div>
                                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${job.status === 'open' ? 'bg-green-50 text-[#16A34A] border border-green-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                                    }`}>
                                    {job.status}
                                </span>
                                <button className="p-1 text-slate-400 hover:text-slate-600">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
