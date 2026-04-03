'use client';

import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, ShieldCheck, AlertTriangle } from 'lucide-react';

interface PredictiveStats {
    successProbability: number;
    estimatedTenure: number; // months
    synergy: {
        Technical: number;
        Leadership: number;
        Innovation: number;
        Execution: number;
        Communication: number;
    };
    risks: string[];
}

const COLORS = ['#2563EB', '#7C3AED'];

export default function AIPredictiveAnalytics({ stats }: { stats: PredictiveStats }) {
    const synergyData = [
        { subject: 'Technical', A: stats.synergy.Technical, fullMark: 100 },
        { subject: 'Leadership', A: stats.synergy.Leadership, fullMark: 100 },
        { subject: 'Innovation', A: stats.synergy.Innovation, fullMark: 100 },
        { subject: 'Execution', A: stats.synergy.Execution, fullMark: 100 },
        { subject: 'Communication', A: stats.synergy.Communication, fullMark: 100 },
    ];

    const pieData = [
        { name: 'Success', value: stats.successProbability },
        { name: 'Remaining', value: 100 - stats.successProbability },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Success Probability & Tenure */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp className="w-12 h-12 text-[#2563EB]" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                        Success Probability
                    </h4>

                    <div className="flex items-center gap-8">
                        <div className="w-32 h-32 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={40}
                                        outerRadius={55}
                                        paddingAngle={5}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        <Cell fill="#7C3AED" />
                                        <Cell fill="#f1f5f9" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-[#7C3AED] leading-none">{stats.successProbability}%</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">AI Match</span>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Retention Prediction</p>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#2563EB]" />
                                    <span className="text-lg font-bold text-slate-800">{Math.floor(stats.estimatedTenure / 12)}y {stats.estimatedTenure % 12}m</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-[#7C3AED]/20 pl-3">
                                "Career trajectory suggests high stability. 84% probability of staying beyond 24 months."
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1E3A8A] p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#7C3AED]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        Predictive Risk Signals
                    </h4>
                    <div className="space-y-2 relative z-10">
                        {stats.risks.map((risk, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-white/80 bg-white/5 p-2 rounded-lg border border-white/5 backdrop-blur-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0" />
                                {risk}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Synergy Radar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <h4 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#2563EB]" />
                        Team Synergy Mapping
                    </div>
                    <span className="text-[10px] font-bold uppercase text-white bg-ai-gradient px-2 py-1 rounded-full shadow-sm">AI Pulse Insights</span>
                </h4>

                <div className="flex-1 min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={synergyData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Candidate"
                                dataKey="A"
                                stroke="#7C3AED"
                                fill="#2563EB"
                                fillOpacity={0.3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        <strong className="text-[#1E3A8A]">Synergy Note:</strong> This candidate perfectly fills the <strong className="text-[#7C3AED]">Leadership</strong> and <strong className="text-[#7C3AED]">Execution</strong> gaps currently present in the Frontend squad.
                    </p>
                </div>
            </div>
        </div>
    );
}
