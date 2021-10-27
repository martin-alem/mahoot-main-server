import ErrorHandler from "../utils/ErrorHandler.js";
import Logger from "../utils/Logger.js";
import { insertOne, insertMany } from "./../database/query.js";
import Quiz from "./../model/QuizModel.js";
import Question from "./../model/QuestionModel.js";

async function createQuizController(req, res, next) {
  try {
    const { quiz, questions, user } = req.body;
    if (quiz.title !== "" && questions.every((question) => question.title !== "")) {
      const quizData = { title: quiz.title, numberOfQuestion: questions.length, author: user._id, date: new Date() };
      const result = await insertOne(Quiz, quizData);
      const quizId = result._id;
      const questionsData = modifyQuestions(questions, quizId);
      await insertMany(Question, questionsData);
      res.status(200).json({ status: 200, statusText: "OK", message: "quiz received and successfully saved" });
    } else {
      res.status(404).json({ status: 404, statusText: "fail", message: "Invalid quiz and question format" });
    }
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

function modifyQuestions(questions, quizId) {
  const modifiedQuestions = questions.map((question) => {
    return {
      title: question.title,
      media: question.media,
      answers: question.answers,
      questionType: question.questionType,
      duration: question.duration,
      quizId: quizId,
      date: new Date(),
    };
  });

  return modifiedQuestions;
}

export default createQuizController;
