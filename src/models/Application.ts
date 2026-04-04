import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },

    // RDB Style Seeker Data
    identity: { type: String }, // National ID or Passport
    education: [{
        institution: String,
        degree: String,
        year: Number,
        field: String
    }],
    languages: [String],
    disability: { type: String, default: 'None' },
    referees: [{
        name: String,
        contact: String,
        organization: String
    }],
    experience: [{
        organization: String,
        role: String,
        years: Number,
        description: String
    }],
    certificates: [String],
    publications: [String],
    cvUrl: String,

    matchScore: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['applied', 'in-review', 'shortlisted', 'selected', 'rejected'],
        default: 'applied'
    },
    appliedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
