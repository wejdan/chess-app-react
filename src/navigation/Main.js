import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import Home from "../pages/Home";
import CreateGame from "../pages/CreateGame";
import JoinGame from "../pages/JoinGame";
import NoPage from "../pages/NoPage";
import Login from "../pages/Login";

import PlayPage from "../pages/PlayPage";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route
          path="create-game"
          element={
            <ProtectedRoute>
              <CreateGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="play"
          element={
            <ProtectedRoute>
              <PlayPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="join-game"
          element={
            <ProtectedRoute>
              <JoinGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default Main;
