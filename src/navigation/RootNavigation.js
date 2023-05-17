import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../componenets/Loader";
import { auth } from "../firebase";
import Login from "../pages/Login";
import { setUser } from "../store/authSlice";
import Main from "./Main";
import MainRoutes from "./MainRoutes";
function RootNavigation() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      if (authenticatedUser) {
        const userInfo = {
          name: authenticatedUser.displayName,
          email: authenticatedUser.email,
          avatar: authenticatedUser.photoURL,
          uid: authenticatedUser.uid,
        };
        dispatch(setUser({ user: userInfo }));
      } else {
        dispatch(setUser({ user: null }));
      }
      setLoading(false);
    });

    return unsubscribe;
    // unsubscribe auth listener on unmount
  }, []);
  if (loading) {
    return <Loader />;
  }
  return <Main />;
}

export default RootNavigation;
