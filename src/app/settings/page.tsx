'use client';

import { Settings, User, Bell, Shield, Wallet, Globe, ArrowRight, Save, Loader2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1500);
    };

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 max-w-4xl mx-auto w-full space-y-8 animate-in slide-in-from-right-4 duration-700">
                    <header>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Configuration</h1>
                        <p className="text-slate-500 font-bold mt-1">Manage your identity, security, and neural preferences.</p>
                    </header>

                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                        <div className="flex">
                            <aside className="w-64 bg-slate-50 border-r border-slate-100 p-8 space-y-2">
                                {[
                                    { icon: User, label: 'Profile Settings', active: true },
                                    { icon: Shield, label: 'Security & Access' },
                                    { icon: Bell, label: 'Notifications' },
                                    { icon: Wallet, label: 'Payroll & Tiers' },
                                    { icon: Globe, label: 'Matrix Location' }
                                ].map(item => (
                                    <button
                                        key={item.label}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${item.active ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </button>
                                ))}
                            </aside>

                            <div className="flex-1 p-12 space-y-8">
                                <section className="space-y-6">
                                    <h3 className="font-black text-slate-900 flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        Authorized Identity
                                    </h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                                            <input className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-3 px-5 outline-none focus:border-[#1E3A8A] transition-all font-bold text-slate-900" defaultValue="Authorized User" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Work Email</label>
                                            <input className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-3 px-5 outline-none focus:border-slate-200 transition-all font-bold text-slate-300" defaultValue="user@umurava.ai" readOnly />
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <h3 className="font-black text-slate-900 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-purple-600" />
                                        Neural Security
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-[#7C3AED] transition-all">
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900">Multi-Factor Authentication</h4>
                                                <p className="text-xs text-slate-400 font-bold">Biometric verification via AI-link.</p>
                                            </div>
                                            <div className="w-12 h-6 bg-slate-200 rounded-full relative shadow-inner"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" /></div>
                                        </div>
                                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-[#1E3A8A] transition-all">
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900">Neural Visibility</h4>
                                                <p className="text-xs text-slate-400 font-bold">Show your skills to verified recruiters.</p>
                                            </div>
                                            <div className="w-12 h-6 bg-[#16A34A] rounded-full relative shadow-inner shadow-green-900/10"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" /></div>
                                        </div>
                                    </div>
                                </section>

                                <div className="pt-6">
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="bg-[#1E3A8A] text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-blue-100 hover:bg-[#2563EB] transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50 min-w-[200px] justify-center"
                                    >
                                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        {saving ? 'Syncing...' : 'Save Matrix Prefs'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
