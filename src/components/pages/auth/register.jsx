import AuthForm from "@/components/layout/authLayout";
import { InputField } from "@/components/ui/inputField";
import { useRegisterForm } from "@/hooks/useRegisterForm";

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

      <InputField
        id="userName"
        name="userName"
        label="Username"
        value={formData.userName}
        onChange={handleInputChange}
        placeholder="Enter your username"
        required
      />

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
