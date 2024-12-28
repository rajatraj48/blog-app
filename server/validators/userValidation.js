import { customError } from "../customError/customError.js";

export const validateInput = (fieldsRequired) => {
  return (req, res, next) => {
    const { name, username, email, password } = req.body;
    const errors = [];

    // Validate based on fieldsRequired passed as an argument
    if (fieldsRequired.includes("name") && (!name || name.trim() === "")) {
      errors.push({ field: "name", message: "Name is required" });
    }

    if (fieldsRequired.includes("username") && (!username || username.trim() === "")) {
      errors.push({ field: "username", message: "Username is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fieldsRequired.includes("email") && (!email || !emailRegex.test(email))) {
      errors.push({ field: "email", message: "Invalid email format" });
    }

    if (fieldsRequired.includes("password") && (!password || password.length < 6)) {
      errors.push({ field: "password", message: "Password must be at least 6 characters long" });
    }

    if (errors.length > 0) {
      return next(new customError("Validation failed", 400, "ValidationError", errors));
    }

   
    next();
  };
};
