'use client';

import {
    CheckCircle,
    XCircle,
    Clock,
    UserPlus,
    Search,
    Filter,
    MoreHorizontal,
    ChevronDown,
    Star,
    Award,
    Zap,
    BadgeCheck,
    ShieldAlert,
    Sparkles,
    AlertCircle,
    MessageSquare,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIPredictiveAnalytics from "./AIPredictiveAnalytics";

export default function CandidateScorecard({ candidate, onClose }: { candidate: any, onClose: () => void }) {
    const [activeTab, setActiveTab] = useState('overview');

    // Simulated predictive stats based on candidate score/rank
    const predictiveStats = {
        successProbability: candidate.score > 90 ? 94 : candidate.score > 80 ? 88 : 76,
        estimatedTenure: candidate.rank === 1 ? 38 : candidate.rank === 2 ? 24 : 14,
        synergy: {
            Technical: candidate.score,
            Leadership: candidate.rank === 1 ? 90 : 65,
            Innovation: 82,
            Execution: 88,
            Communication: 75,
        },
        risks: candidate.rank === 3
            ? ['High pivot risk (3 companies in 2 years)', 'Leadership gap for this seniority level']
            : ['Niche technology focus may limit broad stack versatility', 'High market value may lead to early poaching']
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
            >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 leading-tight">{candidate.name}</h2>
                            <p className="text-sm text-slate-500 font-bold">{candidate.role} • <span className="text-[#2563EB]">Match Score: {candidate.score}%</span></p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <XCircle className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <div className="flex border-b border-slate-100 px-6 bg-slate-50 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'predictive', label: 'Predictive Insights' },
                        { id: 'skills', label: 'Detailed Skills' },
                        { id: 'notes', label: 'Recruiter Notes' },
                        { id: 'outreach', label: 'AI Outreach' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-[#1E3A8A]' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A]" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center shadow-sm">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Rank</p>
                                    <p className="text-2xl font-black text-[#1E3A8A]">#{candidate.rank}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center shadow-sm">
                                    <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Experience</p>
                                    <p className="text-2xl font-black text-[#16A34A]">8+ Yrs</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center shadow-sm">
                                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Confidence</p>
                                    <p className="text-2xl font-black text-[#7C3AED]">High</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-amber-500" />
                                    AI Fit Summary
                                </h3>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 leading-relaxed shadow-inner">
                                    <p className="text-slate-700 font-medium text-sm">
                                        {candidate.recommendation}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-[#16A34A]" />
                                    Key Strengths
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {candidate.strengths.map((s: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm transition-all hover:translate-x-1">
                                            <div className="w-2 h-2 bg-[#16A34A] rounded-full" />
                                            <span className="text-sm font-bold text-slate-700">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'predictive' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-[#7C3AED]" />
                                    Predictive Analysis
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                    <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
                                    Live AI Matrix
                                </div>
                            </div>
                            <AIPredictiveAnalytics stats={predictiveStats} />
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                            <h3 className="font-bold text-slate-800">Skill Breakdown</h3>
                            {[
                                { name: 'React/Next.js', score: 95 },
                                { name: 'TypeScript', score: 92 },
                                { name: 'System Design', score: 85 },
                                { name: 'Team Leadership', score: 78 }
                            ].map(skill => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span>{skill.name}</span>
                                        <span className="text-[#2563EB]">{skill.score}%</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.score}%` }}
                                            className="h-full bg-ai-gradient rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="space-y-4 animate-in fade-in duration-500">
                            <h3 className="font-bold text-slate-800">Internal Recruiter Notes</h3>
                            <textarea
                                className="w-full h-40 p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm font-medium"
                                placeholder="Add your thoughts about this candidate..."
                            ></textarea>
                            <button className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-black hover:bg-[#2563EB] transition-all text-sm shadow-lg shadow-blue-100">
                                Save Note
                            </button>
                        </div>
                    )}

                    {activeTab === 'outreach' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="bg-ai-gradient p-8 rounded-3xl text-white shadow-xl shadow-purple-100 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                                <h3 className="font-black text-xl mb-3 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-amber-300" />
                                    AI Outreach Pilot
                                </h3>
                                <p className="text-sm font-medium opacity-90 mb-6 leading-relaxed">Generate personalized communication based on their verified AI matrix results.</p>
                                <div className="flex gap-3">
                                    <button className="bg-white text-[#1E3A8A] px-5 py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-lg">
                                        Invite to Interview
                                    </button>
                                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-black transition-all border border-white/20">
                                        Request Info
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-12 rounded-3xl border-2 border-slate-100 border-dashed flex flex-col items-center justify-center text-center">
                                <MessageSquare className="w-12 h-12 text-slate-200 mb-4" />
                                <p className="text-sm text-slate-400 font-bold tracking-tight">Select an action to generate an AI email draft.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 border-t border-slate-100 bg-white flex gap-4 mt-auto shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
                    <button className="flex-2 bg-[#16A34A] text-white py-4 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-[#15803d] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Shortlist
                    </button>
                    <button className="flex-1 bg-white border-2 border-slate-100 py-4 rounded-2xl font-black text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                        <MessageSquare className="w-5 h-5 text-slate-400" />
                        Interview
                    </button>
                    <button className="flex-1 bg-red-50 text-[#DC2626] border border-red-100 py-4 rounded-2xl font-black hover:bg-red-100 transition-all flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Reject
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
