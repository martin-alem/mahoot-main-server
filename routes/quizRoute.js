import express from "express";
import createQuizController from "./../controller/createQuizController.js";
import authMiddleware from "./../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router
  .route("/")
  .post(createQuizController)
  .get((req, res) => res.json({ message: "GET Successfully reached" }))
  .delete((req, res) => res.json({ message: "DELETE Successfully reached" }))
  .put((req, res) => res.json({ message: "PUT Successfully reached" }));

router.use((error, req, res, next) => {
    res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default router;
