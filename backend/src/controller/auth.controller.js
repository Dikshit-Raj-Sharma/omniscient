import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("fullname",fullname);
  if ([name, email, password].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUserQuery = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );
  if (existedUserQuery.rows.length > 0)
    throw new ApiError(409, "User already exists");
  // console.log(req.files)

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userQuery = await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`,
    [name, email, hashedPassword]
  );
  if (!userQuery.rows || userQuery.rows.length === 0)
    throw new ApiError(500, "Failed to create user");

  const createdUser = userQuery.rows[0];

  const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const options = { httpOnly: true, secure: false }
  return res
    .status(201)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, token },
        "User registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const userQuery = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (userQuery.rows.length === 0) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const user = userQuery.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  delete user.password;
  const options = { httpOnly: true, secure: false }
  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

export { registerUser, loginUser };
