'use client';

import { useState, useEffect, use } from 'react';
import { Briefcase, MapPin, Clock, ArrowLeft, Send, CheckCircle2, ShieldCheck, Zap, Award, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [success, setSuccess] = useState(false);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: '',
        skills: '',
        motivation: ''
    });

    useEffect(() => {
        fetch(`/api/jobs`)
            .then(res => res.json())
            .then(data => {
                const found = Array.isArray(data) ? data.find((j: any) => j._id === id) : null;
                setJob(found);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            return;
        }
        setApplying(true);

        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId: id,
                    ...formData
                })
            });

            if (res.ok) {
                setSuccess(true);
            }
        } catch (error) {
            console.error('Apply error:', error);
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center font-black text-slate-400 p-8">Loading Intelligence...</div>;
    if (!job) return <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8 text-center text-slate-500 font-bold">Job No Longer Available. <Link href="/" className="text-blue-600 underline">Back to Home</Link></div>;

    if (success) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center max-w-lg">
                    <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-green-100">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Application Transmitted!</h2>
                    <p className="text-slate-500 font-bold mb-8 leading-relaxed">
                        Your profile for **{job.title}** has been securely screened by our AI. The recruiter in Kigali will be notified instantly.
                    </p>
                    <Link href="/jobseeker/dashboard" className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-[#2563EB] transition-all">
                        View Application Status
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1E3A8A] font-black uppercase text-[10px] tracking-widest mb-10 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to opportunites
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                                <Award className="w-32 h-32" />
                            </div>
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                                <Briefcase className="w-8 h-8 text-[#1E3A8A]" />
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{job.title}</h1>
                            <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 mb-10">
                                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                    Full-time
                                </div>
                                <div className="flex items-center gap-2 bg-green-50 text-[#16A34A] px-4 py-2 rounded-xl border border-green-100">
                                    <ShieldCheck className="w-5 h-5" />
                                    AI Verified
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <h3 className="text-xl font-black text-slate-900 mb-4">About the Role</h3>
                                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                    Join our expanding team and build world-class products. At Umurava AI, we are committed to accelerating Rwanda's tech ecosystem.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1E3A8A] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all">
                                <Zap className="w-32 h-32" />
                            </div>
                            <h2 className="text-2xl font-black mb-2">AI-Powered Journey</h2>
                            <p className="text-blue-100 text-sm font-medium">Your submission will be dynamically scored to ensure you land in the top percentile of candidate screening.</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl sticky top-28">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Express Interest</h2>
                                <div className="flex gap-1">
                                    <div className={cn("w-6 h-1 rounded-full transitions-all duration-500", step === 1 ? "bg-[#1E3A8A]" : "bg-slate-200")} />
                                    <div className={cn("w-6 h-1 rounded-full transitions-all duration-500", step === 2 ? "bg-[#1E3A8A]" : "bg-slate-200")} />
                                </div>
                            </div>

                            <form onSubmit={handleApply} className="space-y-6 text-left">
                                {step === 1 ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2563EB] font-bold text-sm transition-all"
                                                placeholder="Kezia Kalisa"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Work Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2563EB] font-bold text-sm transition-all"
                                                placeholder="talent@rwandacloud.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Key Skills</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.skills}
                                                onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2563EB] font-bold text-sm transition-all"
                                                placeholder="React, TypeScript"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Resume / CV (Simulated)</label>
                                            <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 group hover:border-[#1E3A8A] transition-all cursor-pointer">
                                                <FileText className="w-8 h-8 text-slate-300 group-hover:text-[#1E3A8A] transition-colors" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload PDF</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Why should we hire you? (AI Motivation)</label>
                                            <textarea
                                                required
                                                value={formData.motivation}
                                                onChange={e => setFormData({ ...formData, motivation: e.target.value })}
                                                rows={4}
                                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2563EB] font-bold text-sm transition-all resize-none"
                                                placeholder="I am passionate about..."
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={applying}
                                    className="w-full bg-[#1E3A8A] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#2563EB] transition-all shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-95"
                                >
                                    {applying ? 'AI Matching...' : step === 1 ? 'Next: Fulfillment' : 'Complete Application'}
                                    {!applying && <Send className="w-5 h-5" />}
                                </button>
                                {step === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-full text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-[#1E3A8A] transition-colors"
                                    >
                                        Back to Info
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
