import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { candidateName, role, gaps, action } = await req.json();

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
      You are a professional corporate recruiter. 
      Generate a professional and constructive email for a candidate named "${candidateName}" for the "${role}" position.
      Action: ${action} (Invite to Interview / Reject)
      AI Analysis Gaps identified: ${gaps.join(', ')}
      
      Requirements for the email:
      1. Tone: Empathetic, professional, and helpful.
      2. If Rejecting: Briefly mention the skill gaps in a constructive way (e.g., "While your background in X is strong, we are looking for more deep experience in Y"). 
      3. If Inviting: Express excitement about their specific strengths and propose a 30-min call.
      4. Language: Clear and concise.
      
      Return only the subject line and body of the email in Markdown format.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ outreach: text });
    } catch (error) {
        console.error('Outreach error:', error);
        return NextResponse.json({ error: 'Failed to generate outreach' }, { status: 500 });
    }
}
