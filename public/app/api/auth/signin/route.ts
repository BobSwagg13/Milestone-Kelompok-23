// app/api/auth/signin/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb'; 
import User from '@/models/User'; 

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log("Received username:", username);

    await connectToDatabase();

    const user = await User.findOne({ username });
    console.log("Fetched user:", user); 

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    console.log("Password valid:", isValidPassword);

    if (!isValidPassword) {
      return new NextResponse(JSON.stringify({ message: 'Invalid password' }), {
        status: 401, 
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify({ message: 'Sign in successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error during sign-in:', error); 
    return new NextResponse(JSON.stringify({ message: 'Sign in failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
