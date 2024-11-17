import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter(); // Inisialisasi useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post(
        "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/auth/login", // Pastikan API URL sesuai
        { email, password }
      );
      alert("Login successful!");
      console.log("Token:", response.data.token);

      // Simpan token ke localStorage (opsional)
      localStorage.setItem("token", response.data.token);

      // Setelah login berhasil, arahkan ke halaman cardbelajar (CardWithForm)
      router.push("/app/cardbelajar"); // Menggunakan router.push untuk navigasi ke cardbelajar.js
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
