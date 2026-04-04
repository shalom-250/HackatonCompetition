'use client';

import { useState, useEffect } from 'react';
import {
    Briefcase,
    Plus,
    Search,
    MoreVertical,
    Users,
    Clock,
    MapPin,
    ExternalLink,
    Loader2,
    Sparkles,
    Trash2,
    Edit3
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function JobsPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false);
            });
    }, []);

    const deleteJob = async (id: string) => {
        if (!confirm('Are you sure you want to decommission this job node?')) return;
        try {
            const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
            if (res.ok) setJobs(jobs.filter(j => j._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 space-y-8 animate-in fade-in duration-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Intelligence Nodes</h1>
                            <p className="text-slate-500 font-bold mt-1">Manage and monitor all career opportunities in the Umurava matrix.</p>
                        </div>
                        <Link href="/jobs/new" className="bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-[#2563EB] transition-all shadow-lg active:scale-95">
                            <Plus className="w-5 h-5" />
                            Deploy New Node
                        </Link>
                    </div>

                    <div className="bg-white p-2 rounded-2xl border border-slate-100 flex items-center shadow-sm max-w-md">
                        <div className="flex-1 flex items-center px-4">
                            <Search className="w-5 h-5 text-slate-400 mr-3" />
                            <input placeholder="Search job titles..." className="w-full text-slate-900 font-bold outline-none placeholder:text-slate-300 bg-transparent text-sm" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 text-slate-200 animate-spin" />
                            <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Accessing Neural Matrix...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {jobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    whileHover={{ x: 8 }}
                                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex items-center justify-between group"
                                >
                                    <div className="flex gap-6 items-center">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner group-hover:bg-[#1E3A8A] group-hover:text-white transition-all">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 leading-tight">{job.title}</h3>
                                            <div className="flex items-center gap-4 mt-1.5 font-bold text-slate-400 text-xs uppercase tracking-tighter">
                                                <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</div>
                                                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.employmentType || 'Full-time'}</div>
                                                <div className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />AI Screening Enabled</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="hidden lg:flex flex-col items-end">
                                            <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Deployed on</span>
                                            <span className="font-bold text-slate-600">{new Date(job.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <span className={`text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest shadow-sm border ${job.status === 'open' ? 'bg-green-50 text-[#16A34A] border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                            }`}>
                                            {job.status}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <button className="p-3 text-slate-400 hover:text-[#1E3A8A] hover:bg-slate-50 rounded-2xl transition-all"><Edit3 className="w-5 h-5" /></button>
                                            <button onClick={() => deleteJob(job._id)} className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                            <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all"><MoreVertical className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
