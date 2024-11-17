import kontenbase from "@/lib/kontenbase/init";

export const registerUser = async (userData) => {
  const { userName, email, password, firstName = "", lastName = "" } = userData;

  if (!userName || !email || !password) {
    throw new Error("All fields are required");
  }

  const { user, error } = await kontenbase.auth.register({
    userName,
    email,
    password,
    firstName,
    lastName,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
  };
};
