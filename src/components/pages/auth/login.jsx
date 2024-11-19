import AuthForm from "@/components/layout/authLayout";
import { InputField } from "@/components/ui/inputField";
import useLoginForm from "@/hooks/useLoginForm";
import { signIn } from "next-auth/react";

export default function LoginView() {
  const { formData, error, isLoading, handleInputChange, handleSubmit } =
    useLoginForm();

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <AuthForm
      title="Log in to your Account"
      onSubmit={handleSubmit}
      loading={isLoading}
      buttonLabel="Log in"
      handleSocialLogin={handleGoogleLogin}
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        required
      />

      <InputField
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        required
      />
    </AuthForm>
  );
}
