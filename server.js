import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMahootDatabase from "./database/connection.js";
import quizRouter from "./routes/quizRoute.js";
import questionRouter from "./routes/questionRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

//connect to database
connectToMahootDatabase();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/", authMiddleware, (req, res) => {
  res.status(200).json({ status: 200, statusText: "OK", message: req.body.user });
});

app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/question", questionRouter);

app.all("*", (req, res) => {
  res.status(404).json({ status: 404, statusText: "fail", message: "The path you are requesting does not exist" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Main server listening on port " + PORT);
});
