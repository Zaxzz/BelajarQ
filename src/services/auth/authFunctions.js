import kontenbase from "@/lib/kontenbase/init";
import { createData, getData } from "@/lib/kontenbase/service";

export const registerUser = async (userData) => {
  const { userName, email, password, firstName = "", lastName = "" } = userData;

  const fetchDataUserName = async () => {
    try {
      const data = await getData(
        `Users?$select[0]=userName&userName=${userName}`
      );
      if (data === userName) {
        throw new Error("Username already exists");
      }
    } catch (error) {
      throw new Error("Failed to check username availability");
    }
  };
  await fetchDataUserName();

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

export const syncGoogleUser = async (userData, callback) => {
  try {
    const existingUsers = await getData(`Users?email=${userData.email}`);

    if (existingUsers.length > 0) {
      callback(existingUsers[0]);
    } else {
      try {
        userData.firstName = "";
        userData.lastName = "";
        userData.password = "";
        userData.isEmailVerified = true;
        userData.phoneNumber = null;
        userData.role = ["authenticated"];
        const newUser = await createData("Users", userData);
        callback(newUser);
      } catch (error) {
        console.error("Error creating new user:", error);
        callback(userData);
      }
    }
  } catch (error) {
    console.error("Error syncing Google user:", error);
    callback(userData);
  }
};
