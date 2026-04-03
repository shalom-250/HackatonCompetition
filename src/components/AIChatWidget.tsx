'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { MessageSquare, Send, Bot, User, Sparkles, X, Lightbulb, MapPin, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIChatWidget() {
    const { data: session } = useSession();
    const user = session?.user as any;
    const isRecruiter = user?.role === 'recruiter' || user?.role === 'admin';

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: isRecruiter
                ? "Hi! I'm your AI Recruiter Assistant. I've finished screening the latest candidates. Want to see who matches your open roles?"
                : "Welcome to Umurava AI! I'm your Career Coach. Not sure where to start or how to get selected? Ask me anything about our application process!"
        }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        const currentInput = input;
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            let response = "";
            if (isRecruiter) {
                response = "Based on current rankings, Abel Mucyo is your top candidate for the Senior AI role with a 92% match score.";
            } else {
                if (currentInput.toLowerCase().includes('apply')) {
                    response = "To apply, simply click 'View Details' on any job. Our AI will guide you through a quick 2-minute screening where you can showcase your skills directly!";
                } else if (currentInput.toLowerCase().includes('selected')) {
                    response = "Great question! To get selected, focus on highlighting your project execution. Our AI prioritizes evidence of practical innovation and technical synergy with the team.";
                } else {
                    response = "I'm here to help you shine! You can ask about how our AI scoring works, how to improve your profile, or the status of your applications.";
                }
            }
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response
            }]);
        }, 1000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#2563EB] transition-all hover:scale-110 z-50 group"
            >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        className="fixed bottom-24 right-8 w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col z-50 overflow-hidden"
                    >
                        <div className="bg-[#1E3A8A] p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5 text-[#7C3AED]" />
                                <span className="font-black text-sm tracking-tight">{isRecruiter ? 'AI Talent Assistant' : 'AI Career Coach'}</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 rounded-lg p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 p-6 space-y-4 max-h-[400px] overflow-y-auto bg-[#F9FAFB]">
                            {messages.map((m, idx) => (
                                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-bold ${m.role === 'user'
                                        ? 'bg-[#1E3A8A] text-white rounded-tr-none'
                                        : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-white border-t border-slate-50 flex gap-2">
                            <input
                                type="text"
                                placeholder={isRecruiter ? "Ask about candidates..." : "Ask about your career..."}
                                className="flex-1 bg-[#F9FAFB] px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-[#1E3A8A] text-white p-3 rounded-xl hover:bg-[#2563EB] transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
