'use client';

import { Users, LayoutDashboard, Sparkles, BadgeCheck, Award, MessageSquare, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MultiSourceIntelligence({ candidate }: { candidate: any }) {
    return (
        <div className="mt-8 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-indigo-500/30 transition-colors"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                        <h3 className="font-bold text-lg">Multi-Source Intelligence</h3>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-500/30 px-3 py-1 rounded-full border border-indigo-500/50">
                        Simulated Feed
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-400 transition-colors">
                                <Users className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 flex items-center gap-2">
                                    LinkedIn Insights
                                    <ChevronRight className="w-3 h-3 opacity-50" />
                                </h4>
                                <p className="text-xs text-white/60 mb-3">500+ Connections • Active in React Community</p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs bg-white/5 p-2 rounded-lg border border-white/5">
                                        <Sparkles className="w-3 h-3 text-amber-400 fill-current" />
                                        <span>Endorsed for 'Architectural Thinking' by 12 peers</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs bg-white/5 p-2 rounded-lg border border-white/5">
                                        <BadgeCheck className="w-3 h-3 text-green-400" />
                                        <span>Verified work history at Umurava Partners</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-slate-400 transition-colors">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 flex items-center gap-2">
                                    GitHub Analysis
                                    <ChevronRight className="w-3 h-3 opacity-50" />
                                </h4>
                                <p className="text-xs text-white/60 mb-3">124 Repositories • 450 Contributions this year</p>
                                <div className="space-y-2">
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <p className="text-[10px] font-bold text-white/40 uppercase mb-2 italic">AI Purity Check</p>
                                        <div className="flex items-center gap-2">
                                            <BadgeCheck className="w-4 h-4 text-green-400" />
                                            <span className="text-sm font-semibold">Code quality: 9.8/10</span>
                                        </div>
                                        <p className="text-[10px] text-white/50 mt-1">Excellent documentation & clean architecture patterns detected in recent commits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
