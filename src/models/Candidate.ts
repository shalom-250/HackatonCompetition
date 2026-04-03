import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    resumeUrl: String,
    skills: [String],
    experience: String,
    education: String,
    source: { type: String, enum: ['internal', 'external'], default: 'internal' },
    screeningResults: {
        score: Number,
        rank: Number,
        strengths: [String],
        gaps: [String],
        recommendation: String,
        interviewQuestions: [String],
        biasNote: String,
        // Predictive Innovation Fields
        successProbability: Number,
        estimatedTenure: Number, // months
        synergy: {
            Technical: Number,
            Leadership: Number,
            Innovation: Number,
            Execution: Number,
            Communication: Number,
        },
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Candidate || mongoose.model('Candidate', CandidateSchema);
