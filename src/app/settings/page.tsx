'use client';

import { Settings, User, Shield, Bell, CreditCard, Building2, Globe, Mail, Save } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function SettingsPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'company', label: 'Organization', icon: Building2 },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
    ];

    return (
        <div className="p-8 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
                <p className="text-slate-500 font-bold mt-1">Manage your recruiter profile and organization preferences</p>
            </div>

            <div className="flex gap-8">
                {/* Sidebar Tabs */}
                <div className="w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === tab.id
                                    ? 'bg-[#1E3A8A] text-white shadow-xl shadow-blue-100'
                                    : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-xl p-10">
                    {activeTab === 'profile' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
                                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl">
                                    <User className="w-12 h-12 text-[#1E3A8A]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 truncate">{session?.user?.name || 'Recruiter Name'}</h3>
                                    <p className="text-sm text-slate-500 font-bold mb-3">{session?.user?.email}</p>
                                    <span className="bg-ai-gradient text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                        Pro Recruiter
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Display Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#2563EB]" />
                                        <input
                                            type="text"
                                            defaultValue={session?.user?.name || ''}
                                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2563EB] font-bold text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#2563EB]" />
                                        <input
                                            type="email"
                                            defaultValue={session?.user?.email || ''}
                                            disabled
                                            className="w-full bg-slate-100 border-2 border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none font-bold text-sm text-slate-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Default Workspace</label>
                                    <div className="relative group">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#2563EB]" />
                                        <select className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2563EB] font-bold text-sm appearance-none">
                                            <option>Rwanda (Kigali)</option>
                                            <option>Global (Remote)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button className="bg-[#1E3A8A] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-[#2563EB] transition-all shadow-xl shadow-blue-100 mt-4">
                                <Save className="w-5 h-5" />
                                Save Profile Changes
                            </button>
                        </div>
                    )}

                    {activeTab !== 'profile' && (
                        <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
                            <Settings className="w-12 h-12 text-slate-200 animate-spin-slow" />
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">{tabs.find(t => t.id === activeTab)?.label} Module</h3>
                            <p className="text-sm text-slate-500 font-bold max-w-xs">Connecting to secure cloud infrastructure... This module will be live in the production rollout.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
