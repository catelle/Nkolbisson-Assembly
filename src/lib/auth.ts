import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongo";

export type UserDoc = {
  _id: ObjectId;
  name?: string;
  email?: string;
  username?: string;
  passwordHash: string;
  role: "admin" | "user";
  createdAt: string;
};

async function ensureAdminUser() {
  const db = await getDb();
  const users = db.collection<UserDoc>("users");
  const existing = await users.findOne({ role: "admin" });
  if (existing) return;

  const passwordHash = await bcrypt.hash("Ubuntu1234.", 10);
  await users.insertOne({
    _id: new ObjectId(),
    name: "Administrator",
    email: "admin@cmfi-nkolbisson.org",
    username: "admin",
    passwordHash,
    role: "admin",
    createdAt: new Date().toISOString()
  });
}

async function findUser(identifier: string) {
  const db = await getDb();
  const users = db.collection<UserDoc>("users");
  return users.findOne({
    $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
  });
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        await ensureAdminUser();

        const user = await findUser(credentials.identifier.trim());
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          name: user.name || user.username || "User",
          email: user.email || undefined,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "admin" | "user") || "user";
      }
      return session;
    }
  }
};
