import instance from "@/lib/axios/init";

export const authServices = {
  registerAccount: async (data) => {
    try {
      const response = await instance.post("/user/register", data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      throw new Error(errorMessage);
    }
  },
};
