import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import Candidate from '@/models/Candidate';
import { screenCandidates } from '@/lib/gemini';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { jobId, candidateIds } = await req.json();

        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        const candidates = await Candidate.find({ _id: { $in: candidateIds } });
        if (!candidates || candidates.length === 0) {
            return NextResponse.json({ error: 'No candidates found' }, { status: 404 });
        }

        // Call Gemini API for candidate screening
        const results = await screenCandidates(job.description, candidates);

        // Update candidates with screening results
        for (const result of results) {
            const candidateId = candidates.find(c => c.name.toLowerCase().includes(result.name?.toLowerCase() || ""))?._id;
            if (candidateId) {
                await Candidate.findByIdAndUpdate(candidateId, {
                    screeningResults: {
                        score: result.matchScore,
                        rank: result.rank,
                        strengths: result.strengths,
                        gaps: result.gaps || result.risks,
                        recommendation: result.finalRecommendation,
                        interviewQuestions: result.potentialInterviewQuestions,
                        biasNote: result.biasDetectionNote,
                    }
                });
            }
        }

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error("Screening Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
