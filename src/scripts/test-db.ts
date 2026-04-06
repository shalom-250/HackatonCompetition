import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testConn() {
    const uri = process.env.MONGODB_URI;
    console.log('Testing URI:', uri);
    try {
        await mongoose.connect(uri!);
        console.log('Connected Successfully');
        await mongoose.disconnect();
    } catch (e) {
        console.error('Connection Failed:', e);
    }
}
testConn();