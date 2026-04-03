'use client';

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function SeekerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </main>
            </div>
        </div>
    );
}
