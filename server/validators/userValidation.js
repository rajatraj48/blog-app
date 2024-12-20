import { customError } from "../customError/customError.js";

export const validateRegisterInput = (name, username, email, password) => {
  if (!name || name.trim() === "") {
    throw new customError("Name is required", 400, "ValidationError", { field: "name" });
  }

  if (!username || username.trim() === "") {
    throw new customError("Username is required", 400, "ValidationError", { field: "username" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new customError("Invalid email format", 400, "ValidationError", { field: "email" });
  }

  if (!password || password.length < 6) {
    throw new customError("Password must be at least 6 characters long", 400, "ValidationError", { field: "password" });
  }
};
