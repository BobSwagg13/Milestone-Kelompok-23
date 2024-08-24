import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import type { User as NextAuthUser } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your username" },
        password: { label: "Password", type: "password", placeholder: "your password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          await connectToDatabase();

          const user = await User.findOne({ username: credentials.username }).exec();

          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return { id: user._id.toString(), name: user.username } as NextAuthUser;
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    error: '/api/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Session max age in seconds (24 hours)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
};

export async function GET(req: Request) {
  return NextAuth(req, authOptions);
}
