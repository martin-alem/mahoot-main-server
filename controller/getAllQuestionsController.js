import ErrorHandler from "../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import Question from "./../model/QuestionModel.js";
import { findAll } from "../database/query.js";

async function getAllQuizzesController(req, res, next) {
  try {
      const quizId = req.params.quizId;
    const questions = await findAll(Question, { quizId: quizId });
    res.status(200).json({ status: 200, statusText: "OK", questions });
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getAllQuizzesController;
