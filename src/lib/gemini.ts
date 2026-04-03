import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const screenCandidates = async (jobDescription: string, candidates: any[]) => {
  const prompt = `
    You are an AI recruitment expert for Umurava AI. 
    Your task is to screen and rank candidates based on a job description.

    Job Description:
    ${jobDescription}

    Candidates:
    ${JSON.stringify(candidates)}

    Evaluation Criteria:
    - Skills (40%): How well do the candidate's skills match the requirements?
    - Experience (30%): Relevance and depth of experience.
    - Education (10%): Academic background relevance.
    - Potential/Relevance (20%): Overall fit and career trajectory.

    For each candidate, provide:
    1. Rank (1 to ${candidates.length})
    2. Match Score (0-100)
    3. Strengths (Bullet points)
    4. Gaps/Risks (Bullet points)
    5. Final Recommendation (Concise sentence)
    6. Potential Interview Questions (2-3 tailored questions)
    7. Bias Detection Note (Check for any potential bias signals and flag them)

    Return the result as a structured JSON array of objects.
  `;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from the response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  throw new Error("Failed to parse AI response");
};
