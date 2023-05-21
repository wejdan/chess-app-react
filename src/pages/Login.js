import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import React from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { setUser } from "../store/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #282a37;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-size: 24px;
  font-size: 700;
  color: white;
`;
const SignInButton = styled.div`
  cursor: pointer;
  background-color: #1c91f4;
  color: #fff;
  border-radius: 8px;
  padding: 12px 20px;
  margin-top: 20px;
  font-size: 500;
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleUserLogin = async () => {
    try {
      const login = await signInWithRedirect(auth, provider);
      const userInfo = {
        name: login.displayName,
        email: login.email,
        avatar: login.photoURL,
        uid: login.uid,
      };

      dispatch(setUser({ user: userInfo }));
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      alert(error);

      // The AuthCredential type that was used.
      //const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  return (
    <Wrapper>
      <SignInContainer>
        <Title>Sign in to contuine</Title>
        <SignInButton onClick={handleUserLogin}>Login wih Google</SignInButton>
      </SignInContainer>
    </Wrapper>
  );
}

export default Login;
