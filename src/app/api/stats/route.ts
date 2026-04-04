import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';
import Application from '@/models/Application';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || ((session.user as any).role !== 'recruiter' && (session.user as any).role !== 'admin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const totalJobs = await Job.countDocuments({});
        const openJobs = await Job.countDocuments({ status: 'open' });
        const totalCandidates = await Application.countDocuments({});
        const shortlisted = await Application.countDocuments({ status: 'shortlisted' });
        const selected = await Application.countDocuments({ status: 'selected' });

        // Growth calculation (simulated or based on last 7 days)
        const stats = {
            totalJobs,
            openJobs,
            totalCandidates,
            shortlisted,
            selected,
            fillRate: totalJobs > 0 ? Math.round((selected / totalJobs) * 100) : 0,
            activeTalent: await User.countDocuments({ role: 'jobseeker' })
        };

        return NextResponse.json(stats);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
