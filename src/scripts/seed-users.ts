import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

async function seedUsers() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error('MONGODB_URI not found');

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
        name: String,
        email: { type: String, unique: true },
        password: { type: String },
        role: String,
    }));

    const hashedPassword = await bcrypt.hash('password123', 12);

    const users = [
        {
            name: 'Elite Recruiter',
            email: 'recruiter@umurava.ai',
            password: hashedPassword,
            role: 'recruiter',
        },
        {
            name: 'Ambitious Seeker',
            email: 'seeker@umurava.ai',
            password: hashedPassword,
            role: 'jobseeker',
        }
    ];

    for (const userData of users) {
        await User.findOneAndUpdate(
            { email: userData.email },
            userData,
            { upsert: true, new: true }
        );
        console.log(`User seeded: ${userData.email} (Role: ${userData.role})`);
    }

    await mongoose.disconnect();
    console.log('Seeding complete.');
}

seedUsers().catch(console.error);
