import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await dbConnect();

        const adminEmail = "admin@umurava.ai";
        const existingUser = await User.findOne({ email: adminEmail });

        if (existingUser) {
            return NextResponse.json({ message: "Admin user already exists." });
        }

        const hashedPassword = await bcrypt.hash("umurava2026", 12);

        await User.create({
            name: "Umurava Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        return NextResponse.json({
            success: true,
            message: "Default admin user created successfully.",
            credentials: {
                email: adminEmail,
                password: "umurava2026"
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
