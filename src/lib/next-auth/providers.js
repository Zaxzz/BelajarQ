import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import kontenbase from "../kontenbase/init";

export const authProviders = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      try {
        // Mengirim permintaan login ke API kontenbase
        const { token, user, error } = await kontenbase.auth.login({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !user) {
          console.error("Login failed:", error?.message);
          return null;
        }

        // Mengembalikan objek yang berisi informasi user dan token
        return {
          id: user._id,
          name: user.userName,
          email: user.email,
          role: user.role, // Menambahkan role
          token: token, // Menambahkan token dari API
          // expiresOn: "2024-12-05T04:49:25.089619362Z", // Menambahkan expiresOn dari respons API
        };
      } catch (error) {
        console.error("Authorization error:", error);
        return null;
      }
    },
  }),

  GoogleProvider({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: "consent select_account",
        access_type: "offline",
        response_type: "code",
      },
    },
    async profile(profile) {
      // Menyesuaikan profil yang diterima dari Google dengan data yang dibutuhkan
      const data = {
        email: profile.email,
        userName: profile.name,
      };

      // Misalkan Anda perlu memproses data Google user di sini, misalnya, sinkronisasi
      // const syncedData = await syncGoogleUser(data); // Contoh jika perlu sinkronisasi

      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        userName: profile.name, // Atur nama sesuai kebutuhan
        role: ["user"], // Anda bisa menyesuaikan role sesuai kebutuhan
        token: "", // Token dapat ditambahkan jika diperlukan
        // expiresOn: "", // Anda bisa mengatur expiresOn jika diinginkan
      };
    },
  }),
];
