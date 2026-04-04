'use client';

import { BarChart3, TrendingUp, Users, Zap, Briefcase, Sparkles, Clock, Globe } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 space-y-8 animate-in fade-in duration-700">
                    <header>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Analytics</h1>
                        <p className="text-slate-500 font-bold mt-1">Predictive talent flow and performance metrics for the Umurava matrix.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 text-slate-100"><BarChart3 className="w-32 h-32" /></div>
                                <h3 className="font-black text-slate-900 mb-8 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                    Talent Acquisition Funnel
                                </h3>
                                <div className="space-y-6 relative z-10">
                                    {[
                                        { label: 'Impressions', value: '42.8k', percent: 100, color: 'bg-slate-100' },
                                        { label: 'Applications', value: '1,284', percent: 65, color: 'bg-blue-200' },
                                        { label: 'AI Screened', value: '842', percent: 45, color: 'bg-[#1E3A8A]' },
                                        { label: 'Interviews', value: '156', percent: 25, color: 'bg-[#7C3AED]' },
                                        { label: 'Hired', value: '42', percent: 12, color: 'bg-green-500' }
                                    ].map((step) => (
                                        <div key={step.label} className="space-y-2">
                                            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                                <span>{step.label}</span>
                                                <span className="text-slate-900">{step.value}</span>
                                            </div>
                                            <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${step.percent}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className={`h-full ${step.color} shadow-inner`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-[#1E3A8A] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
                                <Sparkles className="w-10 h-10 mb-6 text-blue-300" />
                                <h4 className="text-xl font-black mb-2 tracking-tight">AI Matching Efficiency</h4>
                                <p className="text-blue-100 font-bold text-sm leading-relaxed mb-6">Our neural matching engine reduced time-to-hire by 64% this quarter.</p>
                                <div className="text-4xl font-black">+4.2% <span className="text-xs font-medium text-blue-300 uppercase tracking-widest">vs Last Month</span></div>
                            </div>

                            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl">
                                <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-purple-600" />
                                    Regional Impact
                                </h4>
                                <div className="space-y-4">
                                    {[
                                        { loc: 'Kigali City', value: '72%' },
                                        { loc: 'Musanze District', value: '14%' },
                                        { loc: 'Huye District', value: '8%' },
                                        { loc: 'Other Nodes', value: '6%' }
                                    ].map(loc => (
                                        <div key={loc.loc} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                            <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{loc.loc}</span>
                                            <span className="text-xs font-black text-slate-900">{loc.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
