'use client';

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    ChevronLeft,
    MessageSquare,
    User,
    Star,
    CheckCircle,
    ClipboardCheck,
    ChevronRight,
    ShieldAlert,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const interviewData = {
    candidate: "Sarah Umutoni",
    role: "Senior Frontend Engineer",
    sections: [
        {
            title: "Technical Depth: React & Next.js",
            questions: [
                {
                    q: "How do you handle state management in large scale Next.js apps?",
                    rubric: "Look for mentions of Server Components vs Client Components, and when to use libraries like Redux or Zustand.",
                    difficulty: "Advanced"
                },
                {
                    q: "Explain the difference between Incremental Static Regeneration (ISR) and Server Side Rendering (SSR) in Next.js 15.",
                    rubric: "The candidate should understand the performance implications and caching strategies.",
                    difficulty: "Intermediate"
                }
            ]
        },
        {
            title: "Architecture & Problem Solving",
            questions: [
                {
                    q: "Describe a time you had to optimize a slow web application. What metrics did you look at?",
                    rubric: "Points for Core Web Vitals, Lighthouse scores, and specific profiling tools.",
                    difficulty: "Hard"
                }
            ]
        },
        {
            title: "Cultural Fit & Leadership",
            questions: [
                {
                    q: "How do you handle a situation where a fellow engineer disagrees with your architectural choice?",
                    rubric: "Look for empathy, data-driven reasoning, and collaboration skills.",
                    difficulty: "Behavioral"
                }
            ]
        }
    ]
};

export default function InterviewGuidePage() {
    const [activeSection, setActiveSection] = useState(0);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 max-w-5xl mx-auto w-full space-y-8">
                    <div className="flex items-center justify-between">
                        <Link href="/jobs/1/results" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                            Back to Results
                        </Link>
                        <div className="flex gap-3">
                            <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                                Print Guide
                            </button>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-md">
                                Start Live Interview
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-indigo-600 text-white">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{interviewData.candidate}</h2>
                                        <p className="text-white/80 font-medium">Interviewer Guide: {interviewData.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Confidence</p>
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                        </div>
                                    </div>
                                    <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">AI Match</p>
                                        <p className="text-lg font-black italic">94% <Zap className="w-4 h-4 inline" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
                            <div className="lg:col-span-1 border-r border-slate-100 p-4 space-y-2 bg-slate-50/50">
                                {interviewData.sections.map((section, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveSection(idx)}
                                        className={`w-full text-left p-4 rounded-xl transition-all group ${activeSection === idx
                                            ? 'bg-white shadow-md border border-slate-200 text-indigo-700'
                                            : 'text-slate-500 hover:bg-white hover:text-slate-900'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold">{section.title}</span>
                                            <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === idx ? 'rotate-90 text-indigo-600' : 'opacity-0 group-hover:opacity-100'}`} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="lg:col-span-3 p-8">
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold text-slate-800">{interviewData.sections[activeSection].title}</h3>
                                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Section {activeSection + 1} of {interviewData.sections.length}
                                        </span>
                                    </div>

                                    {interviewData.sections[activeSection].questions.map((item, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-900 leading-snug">Question {idx + 1}</h4>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.difficulty === 'Hard' ? 'bg-red-50 text-red-600' :
                                                            item.difficulty === 'Behavioral' ? 'bg-amber-50 text-amber-600' :
                                                                'bg-green-50 text-green-600'
                                                            }`}>
                                                            {item.difficulty}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-700 text-lg font-medium">{item.q}</p>
                                                    <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                                                        <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-1 flex items-center gap-1">
                                                            <ClipboardCheck className="w-3 h-3" />
                                                            Evaluation Rubric
                                                        </p>
                                                        <p className="text-sm text-indigo-800 opacity-80 italic">
                                                            "{item.rubric}"
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                            <ShieldAlert className="w-4 h-4" />
                                            AI-GENERATED EVALUATION GUIDE
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="text-slate-400 font-bold hover:text-slate-600 transition-colors">Skip</button>
                                            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
                                                Next Question
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
