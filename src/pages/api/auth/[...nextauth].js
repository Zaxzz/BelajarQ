import { authCallbacks } from "@/lib/next-auth/callbacks";
import { authProviders } from "@/lib/next-auth/providers";
import NextAuth from "next-auth";

export default NextAuth({
  providers: authProviders,
  callbacks: authCallbacks,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
});
