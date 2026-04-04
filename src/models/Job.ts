import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },

    // RDB Style Fields
    level: { type: String }, // e.g. "5.III"
    postCount: { type: Number, default: 1 },
    contractType: { type: String, default: 'Under Contract' },
    deadline: { type: Date },
    reportsTo: { type: String },

    exams: [String], // ["Psychometric", "Written", "Oral"]
    responsibilities: [String],
    qualifications: [{
        degree: String,
        experienceNeeded: Number,
        field: String
    }],
    competencies: [String],
    languages: [String],

    location: { type: String, default: 'Kigali' },
    salaryRange: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'RWF' }
    },
    employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
    status: { type: String, enum: ['draft', 'open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
