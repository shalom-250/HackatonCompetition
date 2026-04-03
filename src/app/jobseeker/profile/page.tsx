'use client';

import { useSession } from 'next-auth/react';
import {
    User,
    Mail,
    ShieldCheck,
    Award,
    Globe,
    ArrowUpRight,
    Edit3,
    Camera,
    MapPin,
    Calendar,
    Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SeekerProfile() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 bg-gradient-to-br from-[#1E3A8A] to-[#7C3AED] rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative overflow-hidden">
                            <User className="w-16 h-16 opacity-50 group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Camera className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user?.name || 'Talent User'}</h1>
                        <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
                            <Briefcase className="w-4 h-4" />
                            Premium AI Talent Node
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100" />
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endorsed by Umurava AI</span>
                        </div>
                    </div>
                </div>
                <button className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl font-black shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm active:scale-95">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Credentials Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            Credentials
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-50 group hover:border-blue-100 transition-all">
                                <Mail className="w-5 h-5 text-slate-400 group-hover:text-[#1E3A8A]" />
                                <div className="overflow-hidden">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email Node</div>
                                    <div className="text-xs font-black text-slate-700 truncate">{user?.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-50 group hover:border-blue-100 transition-all">
                                <MapPin className="w-5 h-5 text-slate-400 group-hover:text-[#16A34A]" />
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Location</div>
                                    <div className="text-xs font-black text-slate-700">Kigali, Rwanda</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-50 group hover:border-blue-100 transition-all">
                                <Calendar className="w-5 h-5 text-slate-400 group-hover:text-[#7C3AED]" />
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Member Since</div>
                                    <div className="text-xs font-black text-slate-700">Oct 2026</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-50 flex justify-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#F9FAFB] hover:text-slate-900 transition-all cursor-pointer"><ArrowUpRight className="w-5 h-5" /></div>
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#F9FAFB] hover:text-slate-900 transition-all cursor-pointer"><Globe className="w-5 h-5" /></div>
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#F9FAFB] hover:text-slate-900 transition-all cursor-pointer"><Globe className="w-5 h-5" /></div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1E3A8A] to-[#7C3AED] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all"><ShieldCheck className="w-24 h-24" /></div>
                        <h3 className="text-lg font-black mb-2 tracking-tight">AI Identity Verified</h3>
                        <p className="text-blue-100 text-[11px] font-medium leading-relaxed">Your professional credentials have been validated by the Umurava AI Node. You are eligible for High-Priority selection.</p>
                    </div>
                </div>

                {/* Main Profile Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <section>
                            <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Professional Synopsis</h2>
                            <p className="text-slate-500 font-bold leading-relaxed">
                                Innovative AI Engineer based in Kigali, focused on building distributed systems and high-velocity applications. Committed to local ecosystem growth and technical excellence.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Core Competencies</h2>
                            <div className="flex flex-wrap gap-3">
                                {['React Server Components', 'Distributed Systems', 'Python AI Libraries', 'Next.js 16', 'Rwanda Fintech API'].map(skill => (
                                    <div key={skill} className="px-5 py-2 bg-blue-50 text-[#1E3A8A] rounded-2xl text-xs font-black border border-blue-100/50">
                                        {skill}
                                    </div>
                                ))}
                                <div className="px-5 py-2 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black border border-slate-100 border-dashed cursor-pointer hover:bg-slate-100 transition-all">
                                    + Add Skill
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Technical Achievements</h2>
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#7C3AED]"><Award className="w-6 h-6" /></div>
                                        <div>
                                            <div className="font-black text-slate-900">AI Innovation Grant</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Umurava AI Hub • 2026</div>
                                        </div>
                                    </div>
                                    <div className="text-[#16A34A] font-black text-[10px] uppercase tracking-tighter bg-green-50 px-3 py-1 rounded-full border border-green-100">Verified</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
