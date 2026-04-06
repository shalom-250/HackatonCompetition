import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

// Load .env.local manually
dotenv.config({ path: '.env.local' });

async function exportData() {
    console.log("Starting export...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    try {
        const { default: dbConnect } = await import('../lib/mongodb');
        const { default: User } = await import('../models/User');
        const { default: Job } = await import('../models/Job');
        const { default: Candidate } = await import('../models/Candidate');
        const { default: Application } = await import('../models/Application');

        console.log("Connecting to DB...");
        await dbConnect();
        console.log("Connected to MongoDB!");

        const seedDir = path.join(process.cwd(), 'data', 'seed');
        if (!fs.existsSync(seedDir)) {
            fs.mkdirSync(seedDir, { recursive: true });
        }

        const collections = [
            { name: 'users', model: User },
            { name: 'jobs', model: Job },
            { name: 'candidates', model: Candidate },
            { name: 'applications', model: Application }
        ];

        for (const col of collections) {
            console.log(`Exporting ${col.name}...`);
            const data = await col.model.find({}).lean();
            fs.writeFileSync(
                path.join(seedDir, `${col.name}.json`),
                JSON.stringify(data, null, 2)
            );
            console.log(`Exported ${data.length} documents to ${col.name}.json`);
        }

        console.log("Export Complete! 📦");
        process.exit(0);
    } catch (error) {
        console.error("Export Error:", error);
        process.exit(1);
    }
}

exportData();
