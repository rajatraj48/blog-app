import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layout/MainLayout.jsx";

import PostListPage from "./routes/PostListPage.jsx";
import HomePage from "./routes/HomePage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import Write from "./routes/Write.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import  UserProvider  from './context/userContext';
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/posts",
        element: <PostListPage/>,
      },
      {
        path: "/test",
        element: <SinglePostPage/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/login",
        element:(
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
