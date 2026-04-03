'use client';

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { BadgeCheck, ShieldAlert, Sparkles, AlertCircle, MessageSquare, ChevronRight, Award, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MultiSourceIntelligence from "@/components/MultiSourceIntelligence";
import CandidateScorecard from "@/components/CandidateScorecard";
import Link from "next/link";

const mockResults = [
    {
        id: 1,
        name: 'Sarah Umutoni',
        score: 94,
        rank: 1,
        status: 'Shortlisted',
        role: 'Lead Frontend Engineer',
        strengths: ['Expert Next.js & React knowledge', 'Previous experience leading remote teams', 'Strong architectural skills'],
        gaps: ['Limited experience with Python/Back-end'],
        recommendation: 'Highly recommended for this role. Her technical depth and leadership experience align perfectly with the seniority level required.',
        biasNote: 'No bias signals detected. Evaluation based strictly on technical merit and experience.',
        questions: ['How do you handle state management in large scale Next.js apps?', 'Describe a time you had to mentor a junior dev who was struggling.']
    },
    {
        id: 2,
        name: 'Jean-Claude Nshuti',
        score: 88,
        rank: 2,
        status: 'Interviewing',
        role: 'Senior Developer',
        strengths: ['8+ years in Node.js ecosystem', 'Excellent problem solving abilities', 'Proactive communication'],
        gaps: ['Modern CSS frameworks (Tailwind)'],
        recommendation: 'Strong candidate. May need a small ramp-up period on our specific UI stack, but core engineering skills are exceptional.',
        biasNote: 'Fair evaluation. Candidate has diverse background.',
        questions: ['Discuss your approach to optimizing database queries.', 'How do you stay updated with the fast-moving JS ecosystem?']
    },
    {
        id: 3,
        name: 'Alice Uwase',
        score: 72,
        rank: 3,
        status: 'New',
        role: 'Fullstack Developer',
        strengths: ['Versatile across stack', 'Strong academic background', 'Fast learner'],
        gaps: ['Lack of specific Lead experience'],
        recommendation: 'Recommended for a mid-level or senior role, but might be overwhelmed as a Lead initially.',
        biasNote: 'Evaluation focuses on experience gap in leadership.',
        questions: ['What is your preferred way to integrate AI APIs?', 'How do you manage your time between frontend and backend tasks?']
    }
];

export default function ResultsPage() {
    const [candidates, setCandidates] = useState(mockResults);
    const [selectedCandidate, setSelectedCandidate] = useState(mockResults[0]);
    const [showScorecard, setShowScorecard] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 space-y-8 h-screen overflow-y-auto pb-24">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">AI Screening Complete</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">Results: Senior Frontend Engineer</h1>
                            <p className="text-slate-500">Based on AI analysis of 12 applicants. Shortlisted Top 3.</p>
                        </div>

                        <div className="flex gap-3">
                            <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-all flex items-center gap-2">
                                Generate Report
                            </button>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
                                Export Shortlist (CSV)
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 space-y-4">
                            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4 px-2">Ranked Candidates</h3>
                            {candidates.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => setSelectedCandidate(c)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedCandidate.id === c.id
                                        ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600'
                                        : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${c.rank === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            #{c.rank}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                                c.status === 'Interviewing' ? 'bg-blue-100 text-blue-700' :
                                                    c.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-slate-100 text-slate-600'
                                                }`}>
                                                {c.status}
                                            </span>
                                            <div className="flex items-center gap-1 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-tighter">Propensity: {c.score > 90 ? 'High' : 'Med'} Success</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-lg">{c.name}</h4>
                                    <p className="text-sm text-slate-500 mb-3">{c.role}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {c.strengths.slice(0, 1).map((s, idx) => (
                                                <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1 font-bold text-indigo-600 text-sm">
                                            <Zap className="w-3 h-3" />
                                            {c.score}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-8">
                            <motion.div
                                key={selectedCandidate.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden min-h-[600px]"
                            >
                                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                                            <Award className="w-10 h-10 text-indigo-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedCandidate.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                                    selectedCandidate.status === 'Interviewing' ? 'bg-blue-100 text-blue-700' :
                                                        selectedCandidate.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                            'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {selectedCandidate.status}
                                                </span>
                                            </div>
                                            <p className="text-slate-500 font-medium">{selectedCandidate.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setShowScorecard(true)}
                                            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-slate-800 transition-all font-mono"
                                        >
                                            View Full Scorecard
                                        </button>
                                        <div className="text-right">
                                            <p className="text-3xl font-black text-indigo-600 leading-none">{selectedCandidate.score}%</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Match Score</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold mb-3">
                                                <Sparkles className="w-4 h-4 text-amber-500" />
                                                Strengths
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedCandidate.strengths.map((s, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-green-50/50 p-2 rounded-lg border border-green-100">
                                                        <BadgeCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold mb-3 text-slate-600">
                                                <ShieldAlert className="w-4 h-4 text-red-400" />
                                                Gaps / Risks
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedCandidate.gaps.map((g, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-red-50/50 p-2 rounded-lg border border-red-100">
                                                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                                        {g}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                                            <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-indigo-400 opacity-20 group-hover:rotate-12 transition-transform duration-700" />
                                            <h4 className="font-bold mb-3 relative z-10 flex items-center gap-2">
                                                AI Recommendation
                                            </h4>
                                            <p className="text-sm leading-relaxed opacity-90 relative z-10">
                                                {selectedCandidate.recommendation}
                                            </p>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                                                    Interview Guide
                                                </h4>
                                                <Link
                                                    href="/jobs/1/interview-guide"
                                                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                                >
                                                    Full Guide <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                            <div className="space-y-3">
                                                {selectedCandidate.questions.slice(0, 2).map((q, idx) => (
                                                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 text-sm shadow-sm flex items-start gap-2">
                                                        <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                                        {q}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
                                            <ShieldAlert className="w-3.5 h-3.5" />
                                            FAIRNESS CHECK: {selectedCandidate.biasNote}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 pb-8">
                                    <MultiSourceIntelligence candidate={selectedCandidate} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {showScorecard && (
                    <CandidateScorecard
                        candidate={selectedCandidate}
                        onClose={() => setShowScorecard(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
