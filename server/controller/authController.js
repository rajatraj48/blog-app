import { customError } from "../customError/customError.js";
import { registerUser } from "../service/authService.js";
import { loginUser } from "../service/authService.js";
import { updateUser } from "../service/authService.js";


export const registerController = async (req, res,next) => {
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
   
    next(error); // Pass the error to the next middleware (errorHandler)
  }
};


//login controller
export const loginController = async (req, res,next) => {
  try {
    const { username, password } = req.body;

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
    

    next(error);
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
        statusCode: error.statusCode,
        message: error.message,
        success: false,
        errorType: error.errorType,
        details: error.details || null,
      });
    }
    else if (error.message === "All Fields are required") {
      res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
        errorType: error.errorType,
        details: error.details || null,
      });
    }
    // Handle unexpected errors
    else {
      res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
        errorType: error.errorType,
        details: error.details || null,
      });
    }
  }
};
