import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import Job from '@/models/Job';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const { jobId, ...seekerData } = body;

        const job = await Job.findById(jobId);
        if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

        // SIMPLE AI MATCHING LOGIC (Predictive Relevance)
        let score = 0;

        // 1. Language Match (20 pts)
        const seekerLangs = seekerData.languages || [];
        const matchedLangs = seekerLangs.filter((l: string) => job.languages.includes(l));
        score += (matchedLangs.length / (job.languages.length || 1)) * 20;

        // 2. Education Logic (40 pts)
        const seekerEdu = seekerData.education || [];
        if (seekerEdu.length > 0) score += 20; // Basic education presence

        // Check if any seeker degree field matches job qualification field
        const seekerFields = seekerEdu.map((e: any) => e.field?.toLowerCase()).filter(Boolean);
        const jobFields = job.qualifications.map((q: any) => q.field?.toLowerCase()).filter(Boolean);

        const fieldMatch = seekerFields.some((f: string) => jobFields.includes(f));
        if (fieldMatch) score += 20;

        // 3. Experience Logic (40 pts)
        const seekerExp = seekerData.experience || [];
        const totalExp = seekerExp.reduce((acc: number, e: any) => acc + (parseInt(e.years) || 0), 0);
        const minReqExp = job.qualifications[0]?.experienceNeeded || 0;

        if (totalExp >= minReqExp) score += 40;
        else if (totalExp > 0) score += (totalExp / (minReqExp || 1)) * 40;

        // Cap score at 100
        const finalScore = Math.min(100, Math.round(score));

        const application = await Application.create({
            ...seekerData,
            job: jobId,
            user: (session.user as any).id,
            fullName: session.user.name,
            email: session.user.email,
            matchScore: finalScore
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error: any) {
        console.error('Application Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const applications = await Application.find({}).populate('job').populate('user').sort({ matchScore: -1 });
        return NextResponse.json(applications);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
