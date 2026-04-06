import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function importData() {
    try {
        const { default: dbConnect } = await import('../lib/mongodb');
        const { default: User } = await import('../models/User');
        const { default: Job } = await import('../models/Job');
        const { default: Candidate } = await import('../models/Candidate');
        const { default: Application } = await import('../models/Application');

        await dbConnect();
        console.log("Connected to MongoDB...");

        const seedDir = path.join(process.cwd(), 'data', 'seed');
        if (!fs.existsSync(seedDir)) {
            console.error("Seed directory not found. Please run export-db.ts first or provide the data/seed/ directory.");
            process.exit(1);
        }

        const collections = [
            { name: 'users', model: User, file: 'users.json' },
            { name: 'jobs', model: Job, file: 'jobs.json' },
            { name: 'candidates', model: Candidate, file: 'candidates.json' },
            { name: 'applications', model: Application, file: 'applications.json' }
        ];

        for (const col of collections) {
            const filePath = path.join(seedDir, col.file);
            if (fs.existsSync(filePath)) {
                console.log(`Importing ${col.name}...`);
                const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                // Clear existing data
                await col.model.deleteMany({});

                // Insert new data
                if (data.length > 0) {
                    await col.model.insertMany(data);
                }
                console.log(`Imported ${data.length} documents into ${col.name} collection.`);
            } else {
                console.warn(`File ${col.file} not found. Skipping...`);
            }
        }

        console.log("Import Complete! 🚀");
        process.exit(0);
    } catch (error) {
        console.error("Import Error:", error);
        process.exit(1);
    }
}

importData();
