'use client';

import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Search, ArrowRight, Zap, Globe, Sparkles, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export default function PublicJobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(Array.isArray(data) ? data.filter((j: any) => j.status === 'open') : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const dashboardHref = (session?.user as any)?.role === 'jobseeker' ? '/jobseeker/dashboard' : '/dashboard';

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white font-black shadow-lg">U</div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#1E3A8A] to-[#7C3AED] bg-clip-text text-transparent">Umurava Careers</span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href={dashboardHref} className="bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-100 hover:bg-[#2563EB] transition-all flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-[#1E3A8A]">Recruiter Login</Link>
                <Link href="/register" className="bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-100 hover:bg-[#2563EB] transition-all">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="bg-[#1E3A8A] py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Zap className="w-full h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-5xl font-black tracking-tight mb-6 leading-tight">
              Build the future of <span className="text-ai-gradient">Rwanda</span> with AI-powered careers.
            </h1>
            <p className="text-xl text-blue-100 font-medium mb-10 leading-relaxed">
              Join the most innovative companies in Kigali.
            </p>
            <div className="bg-white p-2 rounded-2xl flex items-center shadow-2xl max-w-2xl">
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search by job title or keyword..."
                  className="w-full text-slate-900 font-bold outline-none placeholder:text-slate-300"
                  suppressHydrationWarning={true}
                />
              </div>
              <button
                className="bg-[#2563EB] text-white px-8 py-3 rounded-xl font-black hover:bg-[#1E3A8A] transition-all"
                suppressHydrationWarning={true}
              >
                Search Jobs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Guidance Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-[2rem] bg-blue-50 border border-blue-100 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">AI Matching</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">Our AI analyzes your unique skills and projects to find the perfect squad fit instantly.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-[2rem] bg-purple-50 border border-purple-100 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Quick Selection</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">No more waiting weeks. Top talent gets identified and invited to interview within 48 hours.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-8 rounded-[2rem] bg-green-50 border border-green-100 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#16A34A] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">How to Get Selected</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">Highlight your Execution and Innovation scores. The more concrete projects you share, the better your rank.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#7C3AED]" />
            Featured Opportunities
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="bg-white h-64 rounded-3xl animate-pulse border border-slate-100" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job: any) => (
              <motion.div key={job._id} whileHover={{ y: -8 }} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all relative group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 shadow-inner group-hover:scale-110 transition-transform">
                  <Briefcase className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500 mb-6">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />Full-time</div>
                </div>
                <Link
                  href={`/apply/${job._id}`}
                  className="w-full bg-[#F9FAFB] text-[#1E3A8A] py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#1E3A8A] hover:text-white transition-all group-hover:bg-[#1E3A8A] group-hover:text-white shadow-sm"
                >
                  View Details & Apply
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
