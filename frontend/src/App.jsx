import React from "react";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { AuthProvider } from "./features/auth/auth.context";
import { PostProvider } from "./features/posts/post.context";
import { Navbar } from "./features/Navbar/Navbar";
import { BrowserRouter } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <Navbar />
          <AppRoutes />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
