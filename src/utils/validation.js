import { getData } from "@/lib/kontenbase/service";

export const validateForm = {
  checkUserNameAndEmail: async (formData) => {
    try {
      const checkUserName = await getData(
        `Users?userName=${formData.userName}`
      );
      const checkEmail = await getData(`Users?email=${formData.email}`);

      if (checkUserName.length > 0) {
        throw new Error("Username already exists");
      } else if (checkEmail.length > 0) {
        throw new Error("Email already exists");
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
    const userNameEmailError = await validateForm.checkUserNameAndEmail(
      formData
    );
    if (userNameEmailError) {
      return userNameEmailError;
    }

    const passwordError = validateForm.checkPassword(formData);
    if (passwordError) {
      return passwordError;
    }

    return "";
  },
};
