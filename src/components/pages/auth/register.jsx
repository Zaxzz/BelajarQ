import AuthForm from "@/components/layout/authLayout";
import { Input } from "@/components/ui/input";
import { validateForm } from "@/utils/validation";
import axios from "axios";
import { Mail, RectangleEllipsis, User } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterView() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const errorMessage = await validateForm.validateAll(formData);
    if (errorMessage) {
      setError(errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_KONTENBASE_API_URL}/auth/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFormData({ userName: "", email: "", password: "" });
      router.push("/auth/login");
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Create an Account"
      onSubmit={handleSubmit}
      loading={isLoading}
      buttonLabel="Register"
      isLogin={false}
      handleSocialLogin={handleLoginGoogle}
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Input
        id="userName"
        name="userName"
        label="Username"
        value={formData.userName}
        startIcon={<User />}
        onChange={(e) => handleFormChange("userName", e.target.value)}
        placeholder="Enter your username"
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        startIcon={<Mail />}
        onChange={(e) => handleFormChange("email", e.target.value)}
        placeholder="Enter your email"
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        startIcon={<RectangleEllipsis />}
        onChange={(e) => handleFormChange("password", e.target.value)}
        placeholder="Enter your password"
        required
      />
    </AuthForm>
  );
}
