import { Bell, Search, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="h-16 bg-[#1E3A8A] border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-10 shadow-lg">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2 w-96 backdrop-blur-sm border border-white/10">
                <Search className="w-4 h-4 text-white/60 mr-2" />
                <input
                    type="text"
                    placeholder="Search jobs, candidates..."
                    className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/40 font-medium"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-white/60 hover:text-white relative transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#1E3A8A]"></span>
                </button>
                <div className="h-8 w-px bg-white/10 mx-2"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-bold text-white">{session?.user?.name || 'Recruiter'}</p>
                        <p className="text-xs text-white/60 font-medium">{session?.user ? 'Pro Plan' : 'Guest'}</p>
                    </div>
                    <div className="group relative">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer border-2 border-white/5 hover:border-white/40 transition-all">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        {session && (
                            <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-xl shadow-xl p-2 w-48 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform translate-y-2 group-hover:translate-y-0">
                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
