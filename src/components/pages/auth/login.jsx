import AuthForm from "@/components/layout/authLayout";
import { Input } from "@/components/ui/input";
import useLoginForm from "@/hooks/useLoginForm";
import { Mail, RectangleEllipsis } from "lucide-react";
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

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        startIcon={<Mail />}
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        startIcon={<RectangleEllipsis />}
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        required
      />
    </AuthForm>
  );
}
