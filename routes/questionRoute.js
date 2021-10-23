import express from "express";
import getAllQuestionsController from "./../controller/getAllQuestionsController.js";
import authMiddleware from "./../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/:quizId").get(getAllQuestionsController);
router
  .route("/")
  .post((req, res) => res.json({ message: "POST Successfully reached" }))
  .delete((req, res) => res.json({ message: "DELETE Successfully reached" }))
  .put((req, res) => res.json({ message: "PUT Successfully reached" }));

router.use((error, req, res, next) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default router;
