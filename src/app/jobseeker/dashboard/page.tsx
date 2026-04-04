'use client';

import { useSession } from 'next-auth/react';
import {
    Briefcase,
    Clock,
    CheckCircle2,
    TrendingUp,
    FileText,
    User,
    Sparkles,
    ChevronRight,
    Search,
    MapPin,
    Target,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SeekerDashboard() {
    const { data: session } = useSession();
    const user = session?.user;

    const applications = [
        { id: 1, role: 'Senior AI Engineer', company: 'RwandaCloud', status: 'In Review', date: 'Oct 12', score: 92 },
        { id: 2, role: 'Fullstack Developer', company: 'Irembo', status: 'Selection', date: 'Oct 10', score: 88 },
        { id: 3, role: 'Data Scientist', company: 'MTN Rwanda', status: 'Applied', date: 'Oct 08', score: 75 }
    ];

    const skills = [
        { name: 'Technical Depth', score: 85, industry: 70 },
        { name: 'Innovation Score', score: 92, industry: 65 },
        { name: 'Execution Speed', score: 78, industry: 75 },
        { name: 'Communication', score: 88, industry: 80 }
    ];

    return (
        <div className="p-0">
            {/* Dynamic Greeting */}
            <header className="p-8 pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            Mwirirwe, {user?.name?.split(' ')[0] || 'Talent'}! <Sparkles className="w-6 h-6 text-[#7C3AED]" />
                        </h1>
                        <p className="text-slate-500 font-bold mt-1">Your AI Career Coach has fresh insights for you today.</p>
                        <div className="flex items-center gap-4 mt-6">
                            <Link href="/" className="bg-[#1E3A8A] text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 hover:bg-[#2563EB] transition-all shadow-lg active:scale-95 text-sm">
                                <Search className="w-4 h-4" />
                                Find New Missions
                            </Link>
                            <Link href="/jobseeker/profile" className="bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm active:scale-95 text-sm">
                                <User className="w-4 h-4" />
                                Identity Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-8 pt-4 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="w-12 h-12 bg-blue-50 text-[#1E3A8A] rounded-2xl flex items-center justify-center mb-4"><Briefcase className="w-6 h-6" /></div>
                        <div className="text-2xl font-black text-slate-900">12</div>
                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Active Applications</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="w-12 h-12 bg-purple-50 text-[#7C3AED] rounded-2xl flex items-center justify-center mb-4"><Target className="w-6 h-6" /></div>
                        <div className="text-2xl font-black text-slate-900">89%</div>
                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">AI Match Score Avg</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="w-12 h-12 bg-green-50 text-[#16A34A] rounded-2xl flex items-center justify-center mb-4"><Clock className="w-6 h-6" /></div>
                        <div className="text-2xl font-black text-slate-900">48h</div>
                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Avg. Response Time</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="w-12 h-12 bg-[#1E3A8A] text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-100"><Sparkles className="w-6 h-6" /></div>
                        <div className="text-2xl font-black text-slate-900">Top 5%</div>
                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Global Talent Rank</div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Applications */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#1E3A8A]" />
                                Your Applications
                            </h2>
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div key={app.id} className="group p-6 rounded-2xl border border-slate-50 bg-[#F9FAFB] hover:bg-white hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-110 transition-transform">
                                                    <Briefcase className="w-6 h-6 text-[#1E3A8A]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-black text-slate-900 group-hover:text-[#1E3A8A] transition-colors">{app.role}</h3>
                                                        {app.status === 'Selection' && (
                                                            <span className="flex items-center gap-1 text-[9px] font-black bg-green-500 text-white px-2 py-0.5 rounded-full animate-bounce">
                                                                <CheckCircle2 className="w-2 h-2" /> RECRUITED
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 mt-1">
                                                        <span>{app.company}</span>
                                                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                                                        <span className="text-[#7C3AED]">Req: AI screening + Tech Int.</span>
                                                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                                                        <span>Applied {app.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${app.status === 'In Review' ? 'bg-blue-100 text-blue-600' :
                                                        app.status === 'Selection' ? 'bg-purple-100 text-purple-600' :
                                                            'bg-slate-200 text-slate-600'
                                                        }`}>
                                                        {app.status}
                                                    </div>
                                                    <div className="text-[10px] font-black text-slate-400 mt-2">MATCH: {app.score}%</div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-300 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Skill Radar (Simulated Visualization) */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp className="w-24 h-24" /></div>
                            <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                                AI Skill Radar
                            </h2>
                            <div className="space-y-6">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="space-y-2">
                                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                                            <span>{skill.name}</span>
                                            <span className="text-[#1E3A8A]">{skill.score}%</span>
                                        </div>
                                        <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                            {/* Industry Average Marker */}
                                            <div className="absolute top-0 w-0.5 h-full bg-[#DC2626] z-10" style={{ left: `${skill.industry}%` }} />
                                            {/* User Level */}
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.score}%` }}
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1E3A8A] to-[#7C3AED] rounded-full"
                                            />
                                        </div>
                                        {skill.score > skill.industry && (
                                            <div className="text-[9px] font-black text-[#16A34A] uppercase tracking-tighter">+{skill.score - skill.industry}% Above Kigali Avg</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-[#7C3AED]/5 rounded-2xl border border-[#7C3AED]/10 text-center">
                                <p className="text-[11px] font-bold text-[#7C3AED] leading-relaxed">
                                    "Your **Innovation Score** is in the top 1% of Rwanda's talent network. High priority for Senior AI roles."
                                </p>
                            </div>
                        </div>

                        {/* Recent Job Alerts */}
                        <div className="bg-[#1E3A8A] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                Recommended for You
                            </h3>
                            <div className="space-y-4 relative z-10">
                                <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/20 transition-all cursor-pointer border border-white/10">
                                    <div className="font-black text-sm">Product AI Lead</div>
                                    <div className="text-xs font-bold opacity-70 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Kigali Finance Center</div>
                                </div>
                                <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/20 transition-all cursor-pointer border border-white/10">
                                    <div className="font-black text-sm">Head of Innovation</div>
                                    <div className="text-xs font-bold opacity-70 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Norrsken House</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
