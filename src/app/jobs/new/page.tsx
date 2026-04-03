'use client';

import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Upload, FileText, CheckCircle, Users, BarChart3, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
    });

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-8 max-w-4xl mx-auto w-full">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === i ? 'bg-indigo-600 text-white' : step > i ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
                                            }`}>
                                            {step > i ? <CheckCircle className="w-5 h-5" /> : i}
                                        </div>
                                        <span className={`text-sm font-medium ${step === i ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {i === 1 ? 'Job Details' : i === 2 ? 'Upload Candidates' : i === 3 ? 'AI Rubric' : 'Review'}
                                        </span>
                                        {i < 4 && <div className="w-8 h-px bg-slate-200 ml-2" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8">
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Job Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Senior Fullstack Developer"
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                value={jobData.title}
                                                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Job Description</label>
                                            <textarea
                                                rows={6}
                                                placeholder="Describe the role, requirements, and responsibilities..."
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                value={jobData.description}
                                                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Location</label>
                                            <input
                                                type="text"
                                                placeholder="Remote / Kigali, Rwanda"
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                value={jobData.location}
                                                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-indigo-400 transition-colors cursor-pointer group">
                                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-indigo-600" />
                                        </div>
                                        <h3 className="text-lg font-bold">Upload Candidate List</h3>
                                        <p className="text-slate-500 max-w-xs mx-auto mt-2">
                                            Drag and drop your candidates CSV, Excel, or PDF resumes here.
                                        </p>
                                        <button className="mt-6 bg-white border border-slate-200 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-all inline-flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            Browse Files
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 bg-amber-50 border border-amber-100 p-4 rounded-lg">
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Users className="w-5 h-5 text-amber-700" />
                                        </div>
                                        <p className="text-sm text-amber-800">
                                            <strong>Tip:</strong> AI performs best when you include structured data like skills and years of experience in your CSV.
                                        </p>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-slate-600 font-bold px-8 py-2 hover:text-slate-900"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setStep(3)}
                                            className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">Configure AI Rubric</h3>
                                        <p className="text-sm text-slate-500">Define what the AI should prioritize during screening.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-3">Must-Have Skills (High Weight)</label>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {['React', 'Next.js', 'TypeScript'].map(tag => (
                                                    <span key={tag} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-2">
                                                        {tag}
                                                        <button className="hover:text-indigo-900">×</button>
                                                    </span>
                                                ))}
                                                <button className="text-xs font-bold text-indigo-600 hover:underline">+ Add Skill</button>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold mb-3 flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-indigo-600" />
                                                AI Bias Mitigation
                                            </h4>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-slate-500 pr-8">Automatically anonymize names and gender-identifying data during initial parsing to ensure fairness.</p>
                                                <div className="w-12 h-6 bg-indigo-600 rounded-full p-1 cursor-pointer">
                                                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="text-slate-500 font-bold px-8 py-2 hover:text-slate-900 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setStep(4)}
                                            className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                                    <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                                        <Sparkles className="absolute -right-4 -top-4 w-32 h-32 text-indigo-400 opacity-20 group-hover:rotate-12 transition-transform duration-700" />
                                        <h4 className="font-bold text-xl mb-2 relative z-10">Ready to Screen?</h4>
                                        <p className="text-indigo-100 text-sm opacity-80 relative z-10 leading-relaxed mb-6">
                                            Our AI will analyze 12 candidates against your requirements for "{jobData.title || 'the role'}".
                                            It will prioritize your custom rubric and bias mitigation settings.
                                        </p>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            onClick={() => setStep(3)}
                                            className="text-slate-600 font-bold px-8 py-2 hover:text-slate-900"
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="bg-indigo-900 text-white px-8 py-2 rounded-lg font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2"
                                            onClick={() => {
                                                router.push('/jobs/1/results');
                                            }}
                                        >
                                            <BarChart3 className="w-5 h-5" />
                                            Run AI Screening
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
