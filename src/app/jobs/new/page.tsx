'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    FileText,
    Sparkles,
    ArrowRight,
    Loader2,
    ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function NewJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        level: '5.III',
        postCount: 1,
        contractType: 'Under Contract',
        reportsTo: 'SPIU Coordinator',
        location: 'Kigali, Rwanda',
        employmentType: 'Full-time',
        deadline: '',
        responsibilities: [''],
        exams: ['PsychometricTest', 'Written', 'Oral'],
        qualifications: [{ degree: 'Bachelor\'s Degree in Accounting', experienceNeeded: 3, field: 'Accounting' }],
        competencies: ['Integrity', 'Communication', 'Teamwork'],
        languages: ['English', 'Kinyarwanda'],
        salaryRange: {
            min: 500000,
            max: 1500000,
            currency: 'RWF'
        }
    });

    const addField = (field: 'responsibilities' | 'exams' | 'competencies' | 'languages') => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeField = (field: 'responsibilities' | 'exams' | 'competencies' | 'languages', index: number) => {
        const next = [...formData[field]];
        next.splice(index, 1);
        setFormData({ ...formData, [field]: next });
    };

    const addQual = () => {
        setFormData({
            ...formData,
            qualifications: [...formData.qualifications, { degree: '', experienceNeeded: 0, field: '' }]
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create job');
            }

            router.push('/jobs');
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 max-w-5xl mx-auto w-full space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-20">
                    <header className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Mission Deployment</h1>
                            <p className="text-slate-500 font-bold">RDB-Style high-fidelity job configuration engine.</p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#1E3A8A]" />
                            <span className="text-[10px] font-black uppercase text-[#1E3A8A] tracking-[0.2em]">Neural Matcher Active</span>
                        </div>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                            <div className="p-12 space-y-12">
                                {/* Section 1: Core Intelligence */}
                                <section className="space-y-8">
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#7C3AED] flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#7C3AED] rounded-full" />
                                        Core mission configuration
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Target Mission Title</label>
                                            <input
                                                required
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                                placeholder="e.g. SPIU Accountant"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Level (Node Tier)</label>
                                            <input
                                                value={formData.level}
                                                onChange={e => setFormData({ ...formData, level: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                                placeholder="5.III"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Quota (Posts)</label>
                                            <input
                                                type="number"
                                                value={formData.postCount}
                                                onChange={e => setFormData({ ...formData, postCount: parseInt(e.target.value) })}
                                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Reports To (Neural Authority)</label>
                                            <input
                                                value={formData.reportsTo}
                                                onChange={e => setFormData({ ...formData, reportsTo: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deadline Node</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.deadline}
                                                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Technical Specifications */}
                                <section className="space-y-8">
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#1E3A8A] flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#1E3A8A] rounded-full" />
                                        Neural Requirements & Responsibilities
                                    </h2>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex justify-between items-center">
                                            Core Responsibilities
                                            <button type="button" onClick={() => addField('responsibilities')} className="text-[#1E3A8A] hover:underline">+ Add Entry</button>
                                        </label>
                                        {formData.responsibilities.map((resp, i) => (
                                            <div key={i} className="flex gap-4">
                                                <input
                                                    value={resp}
                                                    onChange={e => {
                                                        const next = [...formData.responsibilities];
                                                        next[i] = e.target.value;
                                                        setFormData({ ...formData, responsibilities: next });
                                                    }}
                                                    className="flex-1 bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                                    placeholder="e.g. Prepare monthly reconciliation..."
                                                />
                                                <button type="button" onClick={() => removeField('responsibilities', i)} className="text-red-400 hover:text-red-600">×</button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex justify-between items-center">
                                            Mandatory Qualifications
                                            <button type="button" onClick={addQual} className="text-[#1E3A8A] hover:underline">+ Add Qualification</button>
                                        </label>
                                        {formData.qualifications.map((qual, i) => (
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 relative">
                                                <input
                                                    placeholder="Degree Title"
                                                    value={qual.degree}
                                                    onChange={e => {
                                                        const next = [...formData.qualifications];
                                                        next[i].degree = e.target.value;
                                                        setFormData({ ...formData, qualifications: next });
                                                    }}
                                                    className="bg-white border border-slate-100 rounded-xl py-2 px-4 font-bold text-sm"
                                                />
                                                <input
                                                    placeholder="Specialization"
                                                    value={qual.field}
                                                    onChange={e => {
                                                        const next = [...formData.qualifications];
                                                        next[i].field = e.target.value;
                                                        setFormData({ ...formData, qualifications: next });
                                                    }}
                                                    className="bg-white border border-slate-100 rounded-xl py-2 px-4 font-bold text-sm"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Years Experience"
                                                    value={qual.experienceNeeded}
                                                    onChange={e => {
                                                        const next = [...formData.qualifications];
                                                        next[i].experienceNeeded = parseInt(e.target.value);
                                                        setFormData({ ...formData, qualifications: next });
                                                    }}
                                                    className="bg-white border border-slate-100 rounded-xl py-2 px-4 font-bold text-sm"
                                                />
                                                <button type="button" onClick={() => {
                                                    const next = [...formData.qualifications];
                                                    next.splice(i, 1);
                                                    setFormData({ ...formData, qualifications: next });
                                                }} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Section 3: Eval Matrix */}
                                <section className="space-y-8">
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#16A34A] flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#16A34A] rounded-full" />
                                        Evaluation Matrix (Exams)
                                    </h2>
                                    <div className="flex flex-wrap gap-4">
                                        {['PsychometricTest', 'Written', 'Oral', 'Practical', 'Presentation'].map(exam => (
                                            <button
                                                type="button"
                                                key={exam}
                                                onClick={() => {
                                                    const next = formData.exams.includes(exam)
                                                        ? formData.exams.filter(e => e !== exam)
                                                        : [...formData.exams, exam];
                                                    setFormData({ ...formData, exams: next });
                                                }}
                                                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all ${formData.exams.includes(exam)
                                                    ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
                                                    : 'bg-white border-slate-100 text-slate-400'
                                                    }`}
                                            >
                                                {exam}
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="bg-slate-50 p-12 flex items-center justify-between border-t border-slate-100">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Deploy to Matrix?</h4>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Instant visibility to all nodes.</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#1E3A8A] text-white px-12 py-5 rounded-[2rem] font-black shadow-2xl shadow-blue-100 hover:bg-[#2563EB] transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Execute Deployment'}
                                    {!loading && <ArrowRight className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
