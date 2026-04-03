import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function seed() {
    try {
        // Dynamic imports to ensure process.env is set
        const { default: dbConnect } = await import('../lib/mongodb');
        const { default: Candidate } = await import('../models/Candidate');
        const { default: Job } = await import('../models/Job');

        const rwandanCandidates = [
            {
                name: "Abel Mucyo",
                email: "abel.mucyo@example.rw",
                phone: "+250 788 123 456",
                skills: ["React", "Next.js", "TypeScript", "Node.js"],
                experience: "5 years",
                education: "BSc Computer Science, University of Rwanda",
                source: "external",
                screeningResults: {
                    score: 92,
                    rank: 1,
                    strengths: ["Expert knowledge of React/Next.js ecosystem", "Strong background in Huye tech hub projects", "Leadership Experience"],
                    gaps: ["Advanced AWS DevOps"],
                    recommendation: "Perfect fit for the Senior Frontend role in Kigali. Highly recommended.",
                    interviewQuestions: ["How do you optimize Next.js apps for slow internet connections in rural Rwanda?", "Talk about your work at the UR Innovation Lab."],
                    biasNote: "Evaluation objective based on technical merits.",
                    successProbability: 95,
                    estimatedTenure: 36,
                    synergy: { Technical: 94, Leadership: 88, Innovation: 85, Execution: 92, Communication: 90 }
                }
            },
            {
                name: "Divine Ishimwe",
                email: "divine.ishimwe@example.rw",
                phone: "+250 783 654 321",
                skills: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
                experience: "3 years",
                education: "MSc AI, CMU-Africa",
                source: "internal",
                screeningResults: {
                    score: 89,
                    rank: 2,
                    strengths: ["Strong AI/ML foundation from CMU-Africa", "High innovation score", "Excellent problem solving"],
                    gaps: ["Kigali market-standard UI/UX skills"],
                    recommendation: "Top talent for AI development. Fits well into our predictive intelligence squad.",
                    interviewQuestions: ["Describe your Master's thesis on local language NLP.", "How can we apply AI to improve Rwandan agriculture?"],
                    biasNote: "Fair and objective evaluation.",
                    successProbability: 91,
                    estimatedTenure: 24,
                    synergy: { Technical: 92, Leadership: 70, Innovation: 96, Execution: 82, Communication: 85 }
                }
            },
            {
                name: "Gaspard Niyonzima",
                email: "gaspard.n@example.rw",
                phone: "+250 785 987 654",
                skills: ["Java", "Spring Boot", "Microservices", "Docker"],
                experience: "7 years",
                education: "Kigali Institute of Science and Technology (KIST)",
                source: "external",
                screeningResults: {
                    score: 84,
                    rank: 3,
                    strengths: ["Robust backend experience", "Stable tenure history", "Mentorship experience"],
                    gaps: ["Modern Frontend integrations"],
                    recommendation: "Solid senior engineer. Great for enterprise-level projects in Kigali Finance sector.",
                    interviewQuestions: ["How did you scale the banking system at your previous firm?", "What is your mentorship style for junior devs?"],
                    biasNote: "No bias signals detected.",
                    successProbability: 88,
                    estimatedTenure: 48,
                    synergy: { Technical: 85, Leadership: 92, Innovation: 75, Execution: 88, Communication: 80 }
                }
            }
        ];

        const mockJobs = [
            {
                title: "Senior AI Engineer (Kigali)",
                description: "Leading the development of predictive recruitment models for African markets.",
                skills: ["Python", "TensorFlow", "Next.js", "MongoDB"],
                experience: "5+ Years",
                location: "Kigali, Rwanda",
                salary: "$2500 - $4000",
                status: "open"
            }
        ];

        await dbConnect();

        console.log("Cleaning database...");
        await Candidate.deleteMany({});
        await Job.deleteMany({});

        console.log("Seeding Rwandan Candidates...");
        await Candidate.insertMany(rwandanCandidates);

        console.log("Seeding Hackathon Jobs...");
        await Job.insertMany(mockJobs);

        console.log("Seeding Complete! 🇷🇼");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
}

seed();
