import { createData, getData } from "@/lib/kontenbase/service";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const subjects = await getData("subjects");

        res.status(200).json({
          success: true,
          data: subjects,
        });
      } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({
          success: false,
          message: "Unable to fetch subjects",
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

        const newSubject = await createData("subjects", req.body);

        res.status(201).json({
          success: true,
          data: newSubject,
        });
      } catch (error) {
        console.error("Error creating subject:", error);
        res.status(500).json({
          success: false,
          message: "Unable to create subject",
          error: error.message,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
