import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "user";
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    role: "admin" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "user";
    id?: string;
  }
}
