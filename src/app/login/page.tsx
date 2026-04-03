'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError('Invalid email or password');
            setLoading(false);
        } else {
            // Fetch session to check role for redirection
            const res = await fetch('/api/auth/session');
            const session = await res.json();

            if (session?.user?.role === 'admin' || session?.user?.role === 'recruiter') {
                router.push('/dashboard');
            } else {
                router.push('/');
            }
        }
    };

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
                    <div className="w-20 h-20 bg-[#1E3A8A] rounded-2xl mx-auto flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-100 ring-4 ring-white/50">
                        <Award className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-black text-[#111827] tracking-tight mb-2">Umurava AI</h1>
                    <p className="text-[#6B7280] font-bold text-sm tracking-wide uppercase">Talent Screening Co-Pilot</p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-[#DC2626] p-4 rounded-2xl text-xs font-black flex items-center gap-3 animate-shake">
                            <ShieldCheck className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest pl-1">Work Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] group-focus-within:text-[#2563EB] transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm font-bold placeholder:text-slate-300"
                                placeholder="recruiter@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Password</label>
                            <button
                                type="button"
                                onClick={() => alert("Verification: Password reset link would be sent via API.")}
                                className="text-[10px] font-black text-[#2563EB] hover:text-[#1E3A8A] underline decoration-blue-200 underline-offset-4"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] group-focus-within:text-[#2563EB] transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#F9FAFB] border-2 border-slate-50 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm font-bold placeholder:text-slate-300"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 pl-1">
                        <div className="relative flex items-center">
                            <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-[#2563EB] focus:ring-[#2563EB]/20 transition-all cursor-pointer" />
                        </div>
                        <label htmlFor="remember" className="text-xs font-black text-[#6B7280] cursor-pointer selection:bg-none">Remember this session</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1E3A8A] text-white rounded-2xl py-5 font-black flex items-center justify-center gap-3 hover:bg-[#2563EB] transition-all shadow-xl shadow-blue-100 disabled:opacity-50 group active:scale-[0.98]"
                    >
                        {loading ? 'Verifying Credentials...' : 'Sign In to Portal'}
                        {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-xs font-bold text-slate-500 mb-6">
                            New recruiter?{' '}
                            <Link href="/register" className="text-[#2563EB] hover:underline decoration-2 underline-offset-4">
                                Create Account
                            </Link>
                        </p>
                        <div className="h-px bg-slate-100 w-full mb-6" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed px-8">
                            Enterprise Access Restricted
                        </p>
                    </div>
                </form>

                <div className="bg-[#1E3A8A]/5 p-8 flex items-center justify-center gap-8 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest">
                        <Zap className="w-4 h-4 text-[#7C3AED]" />
                        AI Secure
                    </div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                        SSL Locked
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
