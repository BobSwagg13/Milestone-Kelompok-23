import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your username" },
        password: { label: "Password", type: "password", placeholder: "your password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ username: credentials.username });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id, name: user.username };
        }
        return null;
      },
    }),
  ],
  pages: {
    error: '/api/auth/error',
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
