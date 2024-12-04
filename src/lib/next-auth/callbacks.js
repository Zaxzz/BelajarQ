import { syncGoogleUser } from "@/services/auth/authFunctions";

export const authCallbacks = {
  // Callback untuk JWT
  async jwt({ token, user, account }) {
    // Jika user login menggunakan credentials
    if (account?.provider === "credentials" && user) {
      token.email = user.email;
      token.userName = user.userName;
      token.role = user.role; // Menambahkan role
      token.token = user.token; // Menambahkan token dari respons API
      // token.expiresOn = user.expiresOn; // Menambahkan expiresOn dari respons API
      token.provider = "credentials";
    }

    // Jika user login menggunakan Google
    if (account?.provider === "google" && user) {
      const data = {
        email: user.email,
        userName: user.name,
      };
      // Menyinkronkan data Google user
      const syncedData = await syncGoogleUser(data);
      token.email = syncedData.email;
      token.userName = syncedData.userName;
      token.role = syncedData.role || []; // Menambahkan role dari Google (jika ada)
      token.token = syncedData.token; // Menambahkan token dari Google (jika ada)
      // token.expiresOn = syncedData.expiresOn || ""; // Menambahkan expiresOn dari Google (jika ada)
      token.provider = "google";
    }

    return token;
  },

  // Callback untuk Session
  async session({ session, token }) {
    // Menambahkan data dari token ke session
    session.user.id = token.id || session.user.id; // Jika id tidak ada, biarkan yang ada
    session.user.email = token.email || session.user.email;
    session.user.name = token.userName || session.user.name;
    session.user.role = token.role || []; // Pastikan role ditambahkan ke session
    session.user.token = token.token || ""; // Menambahkan token ke session
    // session.user.expiresOn = token.expiresOn || ""; // Menambahkan expiresOn ke session
    session.user.provider = token.provider || "credentials"; // Menambahkan provider ke session
    return session;
  },
};
