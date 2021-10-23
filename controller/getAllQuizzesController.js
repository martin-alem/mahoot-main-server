import ErrorHandler from "../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import Quiz from "./../model/QuizModel.js";
import { findAll } from "../database/query.js";

async function getAllQuizzesController(req, res, next) {
  try {
    const { user } = req.body;
    const quizzes = await findAll(Quiz, { author: user._id });
    res.status(200).json({ status: 200, statusText: "OK", quizzes });
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getAllQuizzesController;
