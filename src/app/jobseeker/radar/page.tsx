'use client';

import { Sparkles, Zap, ShieldCheck, Award, Target, Rocket, Loader2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function AIRadarPage() {
    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 space-y-8 animate-in zoom-in-95 duration-1000">
                    <header>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Skill Radar</h1>
                        <p className="text-slate-500 font-bold mt-1">Benchmarking your identity against the Rwandan tech sector ecosystem.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1E3A8A] via-[#7C3AED] to-[#1E3A8A]" />

                            <div className="relative w-64 h-64 flex items-center justify-center">
                                {/* SVG Pseudo Radar Chart */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="128" cy="128" r="100" fill="none" stroke="#F1F5F9" strokeWidth="2" />
                                    <circle cx="128" cy="128" r="75" fill="none" stroke="#F1F5F9" strokeWidth="2" />
                                    <circle cx="128" cy="128" r="50" fill="none" stroke="#F1F5F9" strokeWidth="2" />
                                    <path d="M128 28 L128 228 M28 128 L228 128" stroke="#F1F5F9" strokeWidth="2" />

                                    {/* Data Shape */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 2 }}
                                        d="M128 40 L190 100 L180 180 L80 170 L60 90 Z"
                                        fill="rgba(30, 58, 138, 0.1)"
                                        stroke="#1E3A8A"
                                        strokeWidth="4"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-slate-900 leading-none">88</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED] mt-1">IQ SECTOR</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-x-12 gap-y-6 w-full max-w-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">Execution: 92%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">Innovation: 84%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">Velocity: 78%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-amber-600 rounded-full" />
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">Leadership: 86%</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-amber-500" />
                                    AI Recommendation
                                </h3>
                                <p className="text-slate-600 font-bold leading-relaxed">
                                    Based on your <span className="text-[#1E3A8A]">Execution Score</span>, you are in the top 4% of developers in Kigali. To reach the "Architect" tier, focus on increasing your <span className="text-[#7C3AED]">Velocity</span> by contributing to open-source infrastructure projects.
                                </p>
                                <button className="w-full bg-[#1E3A8A] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-[#2563EB] transition-all flex items-center justify-center gap-3">
                                    Generate Development Plan
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-[2.5rem] border border-blue-100 space-y-2">
                                    <Award className="w-6 h-6 text-blue-600" />
                                    <div className="text-[10px] font-black uppercase text-blue-400">Badge Tier</div>
                                    <div className="text-lg font-black text-blue-900 uppercase italic tracking-tighter">Senior Node</div>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-[2.5rem] border border-purple-100 space-y-2">
                                    <Target className="w-6 h-6 text-purple-600" />
                                    <div className="text-[10px] font-black uppercase text-purple-400">Match Accuracy</div>
                                    <div className="text-lg font-black text-purple-900 italic tracking-tighter">98.4%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Dummy ArrowRight for import
function ArrowRight(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
}
