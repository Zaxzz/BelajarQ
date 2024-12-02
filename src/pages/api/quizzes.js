import {
  createData,
  deleteData,
  getData,
  updateData,
} from "@/lib/kontenbase/service";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        const quizzes = await getData("quizzes");

        res.status(200).json({
          success: true,
          data: quizzes,
        });
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({
          success: false,
          message: "Unable to fetch quizzes",
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

        const newQuiz = await createData("quizzes", req.body);

        res.status(201).json({
          success: true,
          data: newQuiz,
        });
      } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({
          success: false,
          message: "Unable to create quiz",
          error: error.message,
        });
      }
      break;

    case "PATCH":
      try {
        if (!id) {
          return res.status(400).json({
            success: false,
            message: "Quiz ID is required",
          });
        }

        const updatedQuiz = await updateData("quizzes", id, req.body);

        res.status(200).json({
          success: true,
          data: updatedQuiz,
        });
      } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({
          success: false,
          message: "Unable to update quiz",
          error: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        if (!id) {
          return res.status(400).json({
            success: false,
            message: "Quiz ID is required",
          });
        }

        await deleteData("quizzes", id);

        res.status(200).json({
          success: true,
          message: "Quiz deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({
          success: false,
          message: "Unable to delete quiz",
          error: error.message,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
