import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User'; 

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    await connectToDatabase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return new NextResponse(JSON.stringify({ message: 'User created successfully' }), { status: 201 });

  } catch (error: any) {
    console.error('Error during signup:', error);
    return new NextResponse(JSON.stringify({ message: 'Sign up failed', error: error.message || 'Unknown error' }), { status: 500 });
  }
}
