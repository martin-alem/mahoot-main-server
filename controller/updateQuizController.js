import ErrorHandler from "../utils/ErrorHandler.js";
import Logger from "../utils/Logger.js";
import { findAndUpdate, findOne, insertOne } from "./../database/query.js";
import Quiz from "./../model/QuizModel.js";
import Question from "./../model/QuestionModel.js";

async function updateQuizController(req, res, next) {
  try {
    //update quiz title;
    const quiz = req.body.quiz;
    await findAndUpdate(Quiz, { _id: quiz.id }, { title: quiz.title, numberOfQuestion: req.body.questions.length });
    const questions = req.body.questions;
    questions.forEach(async (question) => {
      if (!question._id) {
        await insertOne(Question, { ...question });
      } else {
        await findAndUpdate(Question, { _id: question._id }, { ...question });
      }
    });
    res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default updateQuizController;
