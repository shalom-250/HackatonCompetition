import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/models/Candidate';
import Job from '@/models/Job';

export async function GET() {
    try {
        await dbConnect();

        const totalApplicants = await Candidate.countDocuments();
        const activeJobs = await Job.countDocuments({ status: 'open' });
        const shortlisted = await Candidate.countDocuments({ 'screeningResults.score': { $gte: 80 } });
        const waitlisted = await Candidate.countDocuments({ 'screeningResults.score': { $lt: 80, $gte: 60 } });

        return NextResponse.json({
            totalApplicants,
            activeJobs,
            shortlisted,
            waitlisted
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
