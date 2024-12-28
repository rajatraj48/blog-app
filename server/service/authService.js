import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { validateInput } from "../validators/userValidation.js";
import { customError } from "../customError/customError.js";

const prisma = new PrismaClient();

export const registerUser = async (name, username, email, password) => {
  try {
   
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      throw new customError("Email or Username already exists", 409, "DuplicateError");
    }

    const saltRounds = 2;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return newUser; // Return the newly created user
  } catch (error) {
    // Handle and rethrow errors appropriately
    if (error instanceof customError) {
      throw error; // If it's a CustomError, just throw it
    } else {
      // For unexpected errors, you can throw a generic error
      throw new customError(
        "An unexpected error occurred",
        500,
        "ServerError",
        error.message
      );
    }
  }
};

//login service
export const loginUser = async (username, password) => {
  try {
    console.log(username, password, "ok janu");

    // Fetch user by username, including the role data
    const user = await prisma.user.findUnique({
      where: {
        username: username, // Check only the username
      },
      include: {
        role: { select: { name: true } }, // Include role information in the response
      },
    });

    console.log("Prisma query result:", user);
    if (!user) {
      throw new customError("Invalid credentials", 401, "AuthenticationError",'Please enter correct username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new customError("Invalid credentials", 401, "AuthenticationError",'Please enter correct password');
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role.name, // Include the role name in the token payload
      },
      process.env.JWT_SECRET_KEY, // Secret key stored in environment variables
      {
        expiresIn: "1h", // Token expiration time
        algorithm: "HS256", // Algorithm used for signing
      }
    );

    // Return the user and token data
    return {
      user: { ...user, role: user.role.name },
      token: `Bearer ${token}`,
    };
  } catch (error) {
    // Handle and rethrow errors appropriately
    if (error instanceof customError) {
      // If it's a CustomError, just throw it
      throw error;
    } else {
      // For any unexpected errors, create a new custom error
      throw new customError(
        "An unexpected error occurred",
        500,
        "ServerError",
        error.message
      );
    }
  }
};

//updateUser service
export const updateUser = async (username, updatedData) => {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user.email === updatedData.email) {
      throw new customError("Email already exist", 400, "ValidationError", {
        field: "email",
      });
    }

    // If no user is found, throw an error
    if (!user) {
      throw new customError(
        "User not found",404,"NotFound", `User with username ${username} does not exist.`
      );
    }

    // If password is provided, hash it
    if (updatedData.password && updatedData.password.trim()) {
      const saltRounds = 10; // You can adjust the salt rounds for stronger hashing
      const salt = await bcrypt.genSalt(saltRounds);
      updatedData.password = await bcrypt.hash(updatedData.password, salt);
    } else {
      // Retain the existing password if no valid new password is provided
      updatedData.password = user.password;
    }

    // Perform the update
    const updatedUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: updatedData,
    });

    // Return the updated user
    return { user: { ...updatedUser } };
  } catch (error) {
    console.log(error);
    if (error instanceof customError) {
      // If it's a CustomError, just throw it
      throw error;
    } else {
      // For any unexpected errors, throw a custom error
      throw new customError(
        "An unexpected error occurred",
        500,
        "ServerError",
        error.message
      );
    }
  }
};
