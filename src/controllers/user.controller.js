import { read, write } from "../utils/model.js";
import crypto from "crypto";
import jwt from "../utils/jwt.js";

const LOGIN = (req, res, next) => {
  try {
    let users = read("users");
    let { userName, password } = req.body;

    password = crypto.createHash("sha256").update(password).digest("hex");
    let user = users.find(
      (user) => user.userName == userName && user.password == password,
    );

    if (!user) {
      return next(new Error("something is wrong"));
    }

    res.status(200).json({
      status: 200,
      message: "everything is fine",
      token: jwt.sign({ userId: user.userId }),
    });
  } catch (error) {}
};

export default {
  LOGIN,
};
