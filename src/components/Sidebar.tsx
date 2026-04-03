'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    Settings,
    BarChart3,
    LogOut,
    Sparkles,
    FileText,
    Search,
    User
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const recruiterMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Users, label: 'Candidates', href: '/candidates' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

const seekerMenu = [
    { icon: LayoutDashboard, label: 'My Journey', href: '/jobseeker/dashboard' },
    { icon: Search, label: 'Find Jobs', href: '/' },
    { icon: FileText, label: 'Applications', href: '/jobseeker/applications' },
    { icon: Sparkles, label: 'AI Skill Radar', href: '/jobseeker/radar' },
    { icon: User, label: 'Profile', href: '/jobseeker/profile' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user as any;
    const isSeeker = user?.role === 'jobseeker';
    const menuItems = isSeeker ? seekerMenu : recruiterMenu;

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shadow-sm">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100">U</div>
                    <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#1E3A8A] to-[#7C3AED] bg-clip-text text-transparent">Umurava AI</span>
                </div>

                <nav className="space-y-1.5">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                    isActive
                                        ? "bg-blue-50 text-[#1E3A8A] shadow-sm border-l-4 border-[#1E3A8A]"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-[#2563EB]"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-[#2563EB]" : "text-slate-400")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-slate-100">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
