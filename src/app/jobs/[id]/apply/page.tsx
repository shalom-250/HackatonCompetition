'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    User,
    BookOpen,
    Globe,
    Shield,
    Users,
    Upload,
    Briefcase,
    Award,
    FileText,
    ArrowRight,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function ApplicationForm() {
    const { id } = useParams();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        identity: '',
        education: [{ institution: '', degree: '', year: 2024, field: '' }],
        languages: ['English'],
        disability: 'None',
        referees: [{ name: '', contact: '', organization: '' }],
        experience: [{ organization: '', role: '', years: 0, description: '' }],
        certificates: [''],
        publications: [''],
        cvUrl: ''
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, jobId: id }),
            });
            if (res.ok) router.push('/jobseeker/applications');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-20">
                    <header className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Node Injection</h1>
                            <p className="text-slate-500 font-bold">Standardized RDB Mission Application Matrix.</p>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map(s => (
                                <div key={s} className={`w-8 h-1 rounded-full transition-all ${s <= step ? 'bg-[#1E3A8A]' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                    </header>

                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-12 flex-1"
                            >
                                {step === 1 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                            <User className="w-6 h-6 text-[#1E3A8A]" />
                                            Identity & Core Metrics
                                        </h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">National ID / Passport Number*</label>
                                                <input
                                                    value={formData.identity}
                                                    onChange={e => setFormData({ ...formData, identity: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                                    placeholder="1 199XXXXXXXXXXXX"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Languages (Comma separated)</label>
                                                <input
                                                    value={formData.languages.join(', ')}
                                                    onChange={e => setFormData({ ...formData, languages: e.target.value.split(',').map(l => l.trim()) })}
                                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                                    placeholder="English, Kinyarwanda, French"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Disability Declaration</label>
                                                <select
                                                    value={formData.disability}
                                                    onChange={e => setFormData({ ...formData, disability: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900 shadow-inner"
                                                >
                                                    <option>None</option>
                                                    <option>Visual Impairment</option>
                                                    <option>Hearing Impairment</option>
                                                    <option>Physical Disability</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                            <BookOpen className="w-6 h-6 text-[#7C3AED]" />
                                            Educational Trajectory
                                        </h3>
                                        {formData.education.map((edu, i) => (
                                            <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-4 shadow-inner relative">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input placeholder="Institution" value={edu.institution} onChange={e => {
                                                        const next = [...formData.education];
                                                        next[i].institution = e.target.value;
                                                        setFormData({ ...formData, education: next });
                                                    }} className="bg-white p-3 rounded-xl font-bold text-sm" />
                                                    <input placeholder="Degree" value={edu.degree} onChange={e => {
                                                        const next = [...formData.education];
                                                        next[i].degree = e.target.value;
                                                        setFormData({ ...formData, education: next });
                                                    }} className="bg-white p-3 rounded-xl font-bold text-sm" />
                                                </div>
                                                <button type="button" onClick={() => {
                                                    const next = [...formData.education];
                                                    next.splice(i, 1);
                                                    setFormData({ ...formData, education: next });
                                                }} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs">×</button>
                                            </div>
                                        ))}
                                        <button onClick={() => setFormData({ ...formData, education: [...formData.education, { institution: '', degree: '', year: 2024, field: '' }] })} className="text-[#1E3A8A] font-black uppercase text-[10px] tracking-widest">+ Add Education Node</button>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                            <Users className="w-6 h-6 text-[#16A34A]" />
                                            Professional Endorsements (Referees)
                                        </h3>
                                        <div className="space-y-4">
                                            {formData.referees.map((ref, i) => (
                                                <div key={i} className="grid grid-cols-3 gap-4">
                                                    <input placeholder="Full Name" className="bg-slate-50 p-4 rounded-xl font-bold" />
                                                    <input placeholder="Phone / Email" className="bg-slate-50 p-4 rounded-xl font-bold" />
                                                    <input placeholder="Relation" className="bg-slate-50 p-4 rounded-xl font-bold" />
                                                </div>
                                            ))}
                                            {formData.referees.length < 3 && <p className="text-red-400 text-xs font-black uppercase">* 3 Referees required for RDB screening</p>}
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                            <Upload className="w-6 h-6 text-[#2563EB]" />
                                            Artifact Verification
                                        </h3>
                                        <div className="border-4 border-dashed border-slate-100 rounded-[3rem] p-20 text-center space-y-4 group hover:border-[#1E3A8A] transition-all">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
                                                <FileText className="w-10 h-10 text-slate-200 group-hover:text-[#1E3A8A]" />
                                            </div>
                                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Upload your CV / Portfolio Node</p>
                                            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black shadow-xl">Select PDF File</button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="bg-slate-50 p-12 flex items-center justify-between border-t border-slate-100">
                            <button
                                onClick={prevStep}
                                disabled={step === 1}
                                className="text-slate-400 font-black uppercase text-xs tracking-widest disabled:opacity-0"
                            >
                                Revert Phase
                            </button>
                            {step < 4 ? (
                                <button onClick={nextStep} className="bg-[#1E3A8A] text-white px-10 py-4 rounded-2xl font-black shadow-xl flex items-center gap-2">
                                    Next Phase
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl flex items-center gap-2 active:scale-95">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                                    Finalize Application
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
