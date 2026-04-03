import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function GET() {
    try {
        await connectDB();
        const candidates = await Candidate.find().sort({ score: -1 }).limit(20);
        return NextResponse.json(candidates, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
