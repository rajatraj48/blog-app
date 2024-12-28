import { customError } from "../customError/customError.js";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header.

  if (!token) {
    return next(new customError("Invalid Token", 401, "AuthenticationError")); // Pass the error to the handler.
  }

  try {
    // Token validation logic can go here, e.g., using JWT:
    // const decoded = jwt.verify(token, SECRET_KEY);
    // req.user = decoded; // Attach user info to the request object for further use.
    
    next(); // Call the next middleware if authentication is successful.
  } catch (error) {
    throw next(new customError("Invalid or Expired Token", 401, "AuthenticationError")); 
  }
};

export default authenticate;
