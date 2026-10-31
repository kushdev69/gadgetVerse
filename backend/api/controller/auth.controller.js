import { Auth } from "../model/auth.schema.js";

const normalizeEmail = (email) => String(email ?? "").trim().toLowerCase();

export const signup = async (req, res, next) => {
  try {
    const userName = String(req.body.userName ?? "").trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password ?? "").trim();

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const isUserExist = await Auth.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await Auth.create({
      userName,
      email,
      password,
    });

    return res.status(201).json({
      message: "user created successfully",
      data: {
        _id: user._id,
        userName: user.userName,
        username: user.userName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password ?? "").trim();

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    return res.status(201).json({
      message: "user login successful",
      data: {
        _id: user._id,
        userName: user.userName,
        username: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
