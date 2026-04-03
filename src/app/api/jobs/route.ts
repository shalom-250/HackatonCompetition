import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET() {
    try {
        await dbConnect();
        const jobs = await Job.find({}).sort({ createdAt: -1 }).limit(10);
        return NextResponse.json(jobs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();
        const job = await Job.create(data);
        return NextResponse.json(job);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
