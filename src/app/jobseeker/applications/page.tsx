'use client';

import {
    Briefcase,
    Clock,
    CheckCircle2,
    FileText,
    ChevronRight,
    Search,
    MapPin,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SeekerApplications() {
    const applications = [
        { id: 1, role: 'Senior AI Engineer', company: 'RwandaCloud', status: 'In Review', date: 'Oct 12', score: 92, location: 'Kigali, RW' },
        { id: 2, role: 'Fullstack Developer', company: 'Irembo', status: 'Selection', date: 'Oct 10', score: 88, location: 'Remera, RW' },
        { id: 3, role: 'Data Scientist', company: 'MTN Rwanda', status: 'Applied', date: 'Oct 08', score: 75, location: 'Kigali Heights, RW' }
    ];

    return (
        <div className="p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Portfolio</h1>
                <p className="text-slate-500 font-bold mt-1">Track your progress across Rwanda's top AI opportunities.</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {applications.map((app, idx) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-8 h-8 text-[#1E3A8A]" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-black text-slate-900 group-hover:text-[#1E3A8A] transition-colors">{app.role}</h2>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                        <span className="text-slate-600 font-black">{app.company}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${app.status === 'In Review' ? 'bg-blue-100 text-blue-600' :
                                            app.status === 'Selection' ? 'bg-purple-100 text-purple-600' :
                                                'bg-slate-100 text-slate-500'
                                        }`}>
                                        {app.status === 'In Review' && <Clock className="w-3 h-3" />}
                                        {app.status === 'Selection' && <CheckCircle2 className="w-3 h-3" />}
                                        {app.status}
                                    </div>
                                    <div className="mt-2 flex items-center justify-end gap-1 text-[10px] font-black text-[#1E3A8A]">
                                        MATCH SCORE: {app.score}%
                                    </div>
                                </div>
                                <Link
                                    href={`/jobseeker/applications/${app.id}`}
                                    className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[#1E3A8A] group-hover:text-white transition-all shadow-inner"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {applications.length === 0 && (
                <div className="bg-white p-12 rounded-[3rem] border border-dashed border-slate-200 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center">
                        <FileText className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">No applications yet</h3>
                    <p className="text-slate-500 font-bold max-w-xs mx-auto">Start your journey by applying to curated opportunities in the Rwandan ecosystem.</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl font-black hover:bg-[#2563EB] transition-all">
                        <Search className="w-4 h-4" />
                        Explore Jobs
                    </Link>
                </div>
            )}
        </div>
    );
}
