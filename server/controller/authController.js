import { customError } from "../customError/customError.js";
import { registerUser } from "../service/authService.js";
import { loginUser } from "../service/authService.js";
import { updateUser } from "../service/authService.js";
export const registerController = async (req, res) => {
  try {
    // Get the user data from the request body
    const { name, username, email, password } = req.body;

    // Call the service layer to register the user
    const newUser = await registerUser(name, username, email, password);

    // Send the successful response
    res.status(201).json({
      status: 201,
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error instanceof customError) {
      // Handle custom errors thrown in the service layer
      res.status(error.statusCode).json({
        message: error.message,
        errorType: error.errorType,
        details: error.details || null,
      });
    } else if (
      error.message === "All Fields are required" ||
      error.message === "Invalid email format" ||
      error.message === "Password must be at least 6 characters long"
    ) {
      res.status(400).json({ message: error.message });
    } else if (error.message === "Username or Email already exists!") {
      res.status(409).json({ message: error.message });
    } else {
      // Handle unexpected errors
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new customError("All Fields are required", 400, "ValidationError");
    }

    // Call the service layer to login the user
    const { user, token } = await loginUser(username, password);

    // Send the successful response with user details and token
    res.status(200).json({
      status: 200,
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    // Handle custom errors thrown in the service layer
    if (error instanceof customError) {
      res.status(error.statusCode).json({
        message: error.message,
        statusCode: error.statusCode,
        success: false,
        errorType: error.errorType,
        details: error.details || null,
      });
    }
    // Handle specific login validation error (incorrect credentials)
    else if (error.message === "Invalid credentials") {
      res.status(401).json({ message: error.message });
    }
    // Handle missing fields in the request
    else if (error.message === "All Fields are required") {
      res.status(400).json({ message: error.message });
    }
    // Handle unexpected errors
    else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

//profile update
export const updateProfileController = async (req, res) => {
  try {
    console.log(req.body)
    const { username, ...updatedData } = req.body;
    if(!updatedData || !username){
      throw new customError("All Fields are required", 400, "ValidationError");
    }
    const { user } = await updateUser(username, updatedData);
    res.status(200).json({
      status: 200,
      message: "updated successfully",
      success: true,
     
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
       
      },
    });
  } catch (error) {
    console.log(error);
    if(error instanceof customError){
      res.status(error.statusCode).json({
        message: error.message,
        statusCode: error.statusCode,
        success: false,
        errorType: error.errorType,
        details: error.details || null,
      });
    }
    else if (error.message === "All Fields are required") {
      res.status(400).json({ message: error.message });
    }
    // Handle unexpected errors
    else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
