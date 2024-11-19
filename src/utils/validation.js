import { getData } from "@/lib/kontenbase/service";

export const validateForm = {
  checkUserName: async (formData) => {
    try {
      const data = await getData(
        `Users?$select[0]=userName&userName=${formData.userName}`
      );

      if (data.length > 0) {
        return "Username already exists";
      }

      return "";
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return "Error checking username availability";
    }
  },
  checkPassword: (formData) => {
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return "";
  },
  validateAll: async (formData) => {
    const userNameError = await validateForm.checkUserName(formData);
    if (userNameError) {
      return userNameError;
    }

    const passwordError = validateForm.checkPassword(formData);
    if (passwordError) {
      return passwordError;
    }

    return "";
  },
};
