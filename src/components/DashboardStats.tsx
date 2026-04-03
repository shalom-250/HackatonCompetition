import { useEffect, useState } from 'react';
import { Users, Briefcase, CheckCircle, Clock } from 'lucide-react';

export default function DashboardStats() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    const statCards = [
        { label: 'Total Applicants', value: stats?.totalApplicants ?? '0', icon: Users, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
        { label: 'Active Jobs', value: stats?.activeJobs ?? '0', icon: Briefcase, color: 'text-[#1E3A8A]', bg: 'bg-indigo-50' },
        { label: 'Shortlisted', value: stats?.shortlisted ?? '0', icon: CheckCircle, color: 'text-[#16A34A]', bg: 'bg-green-50' },
        { label: 'Waitlisted', value: stats?.waitlisted ?? '0', icon: Clock, color: 'text-[#DC2626]', bg: 'bg-red-50' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-xl shadow-inner`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black text-[#16A34A] bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter shadow-sm">+12%</span>
                    </div>
                    <h3 className="text-[#6B7280] text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
                    <p className="text-3xl font-black mt-1 text-[#111827]">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}
