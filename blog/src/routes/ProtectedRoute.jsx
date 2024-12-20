import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext); // Access user context
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged in, prevent navigation to the login page
    if (user) {
      navigate("/", { replace: true }); // Redirect to home or another page if logged in
    }
  }, [user, navigate]); // Effect depends on the user state

  // Only render the children if the user is not logged in (i.e., on the login page)
  return !user ? children : null;
};

export default ProtectedRoute;
