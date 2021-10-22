import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectToMahootDatabase from "./database/connection.js";

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
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, statusText: "OK", message: "server up and running" });
});

app.all("*", (req, res) => {
  res.status(404).json({ status: 404, statusText: "fail", message: "The path you are requesting does not exist" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Main server listening on port " + PORT);
});
