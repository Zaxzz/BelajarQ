import { createData, getData } from "@/lib/kontenbase/service";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await getData("Users");

        res.status(200).json({
          success: true,
          data: users,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
          success: false,
          message: "Unable to fetch users",
          error: error.message,
        });
      }
      break;

    case "POST":
      try {
        if (!req.body) {
          return res.status(400).json({
            success: false,
            message: "Request body is required",
          });
        }

        const newUsers = await createData("Users", req.body);

        res.status(201).json({
          success: true,
          data: newUsers,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
          success: false,
          message: "Unable to create user",
          error: error.message,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
