export const validateForm = (formData) => {
  if (!formData.email.includes("@")) {
    return "Please enter a valid email address";
  }

  if (formData.password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  return "";
};
