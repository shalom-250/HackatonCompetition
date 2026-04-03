'use client';

import { Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RadarPage() {
    return (
        <div className="p-8 space-y-12">
            <header>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Skill Radar</h1>
                <p className="text-slate-500 font-bold mt-1">Real-time benchmarking against Rwanda's tech industry standards.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl flex items-center justify-center min-h-[400px]">
                    <div className="relative w-64 h-64 border-4 border-slate-50 rounded-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-50/20 rounded-full animate-pulse" />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-48 h-48 bg-gradient-to-br from-[#1E3A8A] to-[#7C3AED] rounded-full shadow-2xl flex items-center justify-center text-white"
                        >
                            <Sparkles className="w-16 h-16" />
                        </motion.div>
                        <div className="absolute top-0 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">Innovation</div>
                        <div className="absolute right-0 translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">Execution</div>
                        <div className="absolute bottom-0 translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">Synergy</div>
                        <div className="absolute left-0 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">Velocity</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#1E3A8A] p-8 rounded-[3rem] text-white shadow-2xl">
                        <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            Market Intelligence
                        </h2>
                        <p className="text-blue-100 text-sm font-medium leading-relaxed">
                            Our AI has benchmarked your current execution velocity at **7.2x** the Kigali industry average. This makes you a prime candidate for fast-growing startups.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                        <h3 className="font-black text-slate-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            Growth Roadmap
                        </h3>
                        <div className="space-y-1">
                            <div className="text-xs font-bold text-slate-400">Target for next month:</div>
                            <div className="text-sm font-black text-slate-700">Advance to "Senior AI Architect" tier (+42 points)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
