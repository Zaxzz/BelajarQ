import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import CardWithForm from "./app/cardbelajar";
import kontenbase from "@/lib/kontenbase/init";
import { signOut } from "next-auth/react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Inisialisasi useRouter

  const handleRegisterClick = () => {
    router.push("/auth/register"); // Arahkan ke halaman register
  };

  const handleLoginClick = () => {
    router.push("/auth/login"); // Arahkan ke halaman login
  };

  return (
    <div>
      {isLoggedIn ? (
        <CardWithForm />
      ) : (
        <div className="flex flex-col justify-center flex-wrap min-h-screen p-20 gap-4">
          <h1>Welcome to the Home Page</h1>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleRegisterClick}
          >
            Register
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
