import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { authServices } from "@/services/auth/authService";
import { validateForm } from "@/utils/validation";
import axios from "axios";

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

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
      router.push("/auth/login");
      return response.data;
    } catch (err) {
      setError(err?.message ?? "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
