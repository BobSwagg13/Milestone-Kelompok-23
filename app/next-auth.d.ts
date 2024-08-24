import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // User ID
    username: string; // Username
  }

  interface Session {
    user: User; // User object
  }

  interface JWT {
    id: string; // User ID
    username: string; // Username
  }
}
