import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { jobId, name, email, skills } = await req.json();

        if (!jobId || !name || !email) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Simulate AI Scoring (would be real in prod)
        const score = Math.floor(Math.random() * (95 - 75 + 1) + 75);

        const candidate = await Candidate.create({
            name,
            email,
            role: 'Job Seeker', // In real app, this would be the job's title
            score,
            status: 'Applied',
            location: 'Kigali, Rwanda', // Default for now
            jobId: jobId, // Store job association
            predictedInnovation: score > 85 ? 'High' : 'Moderate',
            successProbability: score,
            tenurePrediction: 24, // 2 years
            synergyMapping: {
                technical: score - 5,
                cultural: score,
                innovation: score + 5
            }
        });

        return NextResponse.json({ message: 'Applied successfully', candidate }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
