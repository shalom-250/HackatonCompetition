'use client';

import { BarChart3, TrendingUp, Users, Target, ShieldCheck, Zap, ArrowRight, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recruitment Intelligence</h1>
                <p className="text-slate-500 font-bold mt-1">Deep AI insights and performance forecasting</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Time to Hire', value: '14 Days', trend: '-2.4 days', icon: Target, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                    { label: 'Screening Efficiency', value: '94%', trend: '+8.1%', icon: Brain, color: 'text-[#7C3AED]', bg: 'bg-purple-50' },
                    { label: 'Quality of Hire', value: '8.8/10', trend: '+12%', icon: ShieldCheck, color: 'text-[#16A34A]', bg: 'bg-green-50' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl shadow-inner`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                        </div>
                        <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</h3>
                        <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-[#1E3A8A] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all">
                    <Zap className="w-32 h-32" />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-black mb-4">AI Talent Growth Prediction</h2>
                    <p className="text-blue-100 text-lg font-medium leading-relaxed mb-8">
                        Based on your current screening patterns and Rwandan market trends, we predict a **42% increase** in high-quality matches for Software Engineering roles in the next quarter.
                    </p>
                    <button className="bg-white text-[#1E3A8A] px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-50 transition-all shadow-xl">
                        Download Full AI Forecast
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                    <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                        Success Rate by Region
                    </h3>
                    <div className="space-y-6">
                        {[
                            { region: 'Kigali (Urban)', rate: 88, color: 'bg-[#1E3A8A]' },
                            { region: 'Musanze (North)', rate: 64, color: 'bg-[#2563EB]' },
                            { region: 'Gisenyi (West)', rate: 42, color: 'bg-[#7C3AED]' },
                        ].map((r, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-600">{r.region}</span>
                                    <span className="text-slate-900">{r.rate}%</span>
                                </div>
                                <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${r.rate}%` }}
                                        className={`h-full ${r.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                        <BarChart3 className="w-10 h-10 text-[#7C3AED]" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Historical Performance</h3>
                    <p className="text-slate-400 font-medium text-sm max-w-xs mb-6">Connect your legacy ATS data to visualize multi-year recruitment trends and ROI.</p>
                    <button className="border-2 border-slate-100 text-slate-400 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all cursor-not-allowed">
                        Coming Soon (Integration)
                    </button>
                </div>
            </div>
        </div>
    );
}
