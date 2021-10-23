import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  numberOfQuestion: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.ObjectId,
    required: true,
  },
  coverColor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;
