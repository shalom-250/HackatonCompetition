'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Users, CheckCircle2, TrendingUp, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardStats() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const cards = [
        { label: 'Intelligence Nodes (Jobs)', value: stats?.openJobs || 0, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Talent Flow', value: stats?.totalCandidates || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Selected Outcomes', value: stats?.selected || 0, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Network Fill Rate', value: `${stats?.fillRate || 0}%`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-center h-32">
                        <Loader2 className="w-8 h-8 text-slate-200 animate-spin" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-4 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform shadow-inner`}>
                            <card.icon className="w-6 h-6" />
                        </div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Active Matrix</div>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{card.label}</h3>
                        <p className="text-3xl font-black text-slate-900 mt-1">{card.value}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
