import AuthForm from "@/components/layout/authLayout";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { Mail, RectangleEllipsis, User } from "lucide-react";

export default function RegisterView() {
  const { formData, error, isLoading, handleInputChange, handleSubmit } =
    useRegisterForm();

  return (
    <AuthForm
      title="Create an Account"
      onSubmit={handleSubmit}
      loading={isLoading}
      buttonLabel="Register"
      isLogin={false}
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Input
        id="userName"
        name="userName"
        label="Username"
        value={formData.userName}
        startIcon={<User />}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
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
        onChange={handleInputChange}
        placeholder="Enter your password"
        required
      />
    </AuthForm>
  );
}
