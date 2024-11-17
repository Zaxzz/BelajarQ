import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const path = req.nextUrl.pathname;

      if (["/auth/login", "/auth/register"].includes(path)) {
        return true;
      }

      if (!token) return false;

      try {
        const validToken = await getToken({
          req,
          secret: process.env.JWT_SECRET,
        });

        if (!validToken) return false;

        const tokenAge = Date.now() - new Date(validToken.iat * 1000).getTime();
        if (tokenAge > 2 * 60 * 60 * 1000) return false;

        return true;
      } catch {
        return false;
      }
    },
  },
});

export const config = {
  matcher: ["/", "/auth/login", "/auth/register"],
};
