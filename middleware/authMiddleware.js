import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import jwt from "jsonwebtoken";
import User from "./../model/UserModel.js";
import { findOne } from "./../database/query.js";

async function authMiddleware(req, res, next) {
  try {
    const { _access_token } = req.body.access_token;
    try {
      const { user_id } = jwt.verify(_access_token, process.env.JWT_SECRET);
      const result = await findOne(User, { _id: user_id });
      if (!result) {
        next(new ErrorHandler("Unauthorized access", 401));
      } else {
        const { _id, firstName, lastName, image, emailAddress } = result;
        req.body.user = { _id, firstName, lastName, image, emailAddress };
        next();
      }
    } catch (error) {
      next(new ErrorHandler("Invalid access token", 401));
    }
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default authMiddleware;
