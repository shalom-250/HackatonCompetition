'use client';

import { useState, useEffect } from 'react';
import {
    FileText,
    Search,
    ArrowRight,
    CheckCircle2,
    Clock,
    XCircle,
    Sparkles,
    Briefcase,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function SeekerApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking for now, will link to API in future
        setTimeout(() => {
            setApplications([
                { id: '1', title: 'Senior AI Engineer', status: 'shortlisted', date: '2026-03-28' },
                { id: '2', title: 'Frontend Specialist', status: 'in-review', date: '2026-03-15' },
                { id: '3', title: 'Product UI/UX', status: 'applied', date: '2026-03-10' }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'shortlisted': return 'bg-green-50 text-green-700 border-green-100';
            case 'in-review': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'rejected': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                    <header>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mission History</h1>
                        <p className="text-slate-500 font-bold mt-1">Track all your applications and recruitment status in the matrix.</p>
                    </header>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 text-slate-200 animate-spin" />
                            <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Syncing with Neural Hub...</p>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-xl text-center space-y-6">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
                                <FileText className="w-10 h-10 text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">No active missions found.</h3>
                            <p className="text-slate-500 font-bold max-w-sm mx-auto">Explore the portal and inject your identity into open career nodes.</p>
                            <Link href="/" className="inline-flex bg-[#1E3A8A] text-white px-8 py-3 rounded-2xl font-black gap-2 hover:bg-[#2563EB] transition-all">
                                <Search className="w-5 h-5" />
                                Find Opportunities
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {applications.map((app) => (
                                <motion.div
                                    key={app.id}
                                    whileHover={{ y: -4 }}
                                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center justify-between group"
                                >
                                    <div className="flex gap-6 items-center">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner group-hover:bg-[#1E3A8A] group-hover:text-white transition-all">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 leading-tight">{app.title}</h3>
                                            <div className="flex items-center gap-3 mt-1.5 font-bold text-slate-400 text-xs uppercase tracking-tighter">
                                                <Clock className="w-4 h-4" />
                                                Applied on {new Date(app.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="hidden md:flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                                            <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">AI Readiness: 94%</span>
                                        </div>

                                        <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyles(app.status)}`}>
                                            {app.status}
                                        </div>

                                        <button className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white transition-all shadow-sm">
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
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
