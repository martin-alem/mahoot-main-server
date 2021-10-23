import ErrorHandler from "../utils/ErrorHandler.js";
import Logger from "../utils/Logger.js";

function createQuizController(req, res, next) {
  try {
    const quiz = req.body;
    res.status(200).json({ status: 200, statusText: "OK", message: quiz });
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default createQuizController;
