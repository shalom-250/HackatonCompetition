import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],
    experience: String,
    location: String,
    salary: String,
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
