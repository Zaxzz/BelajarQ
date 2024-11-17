import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const router = useRouter(); // Inisialisasi useRouter

  // Fungsi untuk memeriksa ketersediaan username
  const checkUserNameAvailability = async (userName) => {
    try {
      const response = await axios.get(
        `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Users`
      );
      
      // Cek apakah ada pengguna dengan userName yang sama
      const isUserNameTaken = response.data.some(user => user.userName === userName);
      return !isUserNameTaken; // Jika userName tidak ada, maka available
    } catch (error) {
      setErrorMessage("Error checking username availability.");
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Lakukan pengecekan ketersediaan username hanya saat tombol "Register" ditekan
    const isUserNameAvailable = await checkUserNameAvailability(userName);

    if (!isUserNameAvailable) {
      setErrorMessage("Username is already taken. Please choose another one.");
      return; // Jangan lanjutkan jika username sudah ada
    }

    try {
      const response = await axios.post(
        "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/auth/register",
        { userName, firstName, lastName, email, password }
      );
      setSuccessMessage("Registration successful! Please log in.");

      // Arahkan pengguna ke halaman login setelah pendaftaran berhasil
      setTimeout(() => {
        router.push("/auth/login"); // Menggunakan router.push untuk menuju halaman login
      }, 2000); // Menunggu 2 detik sebelum mengarahkan

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Register</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
