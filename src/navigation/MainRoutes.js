import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "../pages/Home";
import CreateGame from "../pages/CreateGame";
import JoinGame from "../pages/JoinGame";
import NoPage from "../pages/NoPage";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { setUsers } from "../store/usersSlice";
import Game from "../pages/Game";
import Play from "../pages/Play";
import PlayPage from "../pages/PlayPage";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  console.log("ProtectedRoute", user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="test" element={<NoPage />} />

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
    </>
  )
);
function MainRoutes() {
  return <RouterProvider router={router} />;
}

export default MainRoutes;
