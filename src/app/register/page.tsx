'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Zap, Award, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');

            setSuccess(true);
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white shadow-xl shadow-green-100">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Account Created!</h2>
                    <p className="text-slate-500 font-bold">Redirecting you to the portal...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#2563EB]/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#7C3AED]/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative z-10"
            >
                <div className="p-10 pb-0 text-center">
                    <div className="w-16 h-16 bg-[#16A34A] rounded-2xl mx-auto flex items-center justify-center text-white mb-6 shadow-2xl shadow-green-100 ring-4 ring-white/50">
                        <User className="w-10 h-10" />
                    </div>
                    <h1 className="text-2xl font-black text-[#111827] tracking-tight mb-2">Join Umurava AI</h1>
                    <p className="text-[#6B7280] font-bold text-xs tracking-wide uppercase">Recruiter Talent Cloud</p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-[#DC2626] p-4 rounded-2xl text-xs font-black flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest pl-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#2563EB]" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-3.5 pl-12 pr-6 outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm font-bold"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest pl-1">Work Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#2563EB]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-3.5 pl-12 pr-6 outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm font-bold"
                                placeholder="recruiter@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest pl-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#2563EB]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-3.5 pl-12 pr-6 outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm font-bold"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1E3A8A] text-white rounded-2xl py-4 font-black flex items-center justify-center gap-3 hover:bg-[#2563EB] transition-all shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-[0.98]"
                    >
                        {loading ? 'Creating Account...' : 'Create Recruiter Profile'}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-xs font-bold text-slate-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[#2563EB] hover:underline decoration-2 underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>

                <div className="bg-[#1E3A8A]/5 p-6 flex items-center justify-center gap-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[9px] font-black text-[#1E3A8A] uppercase tracking-[0.15em]">
                        <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
                        Instant Setup
                    </div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="flex items-center gap-2 text-[9px] font-black text-[#1E3A8A] uppercase tracking-[0.15em]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                        Encryption Active
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
