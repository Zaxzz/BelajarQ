import { createData, getData } from "@/lib/kontenbase/service";

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
