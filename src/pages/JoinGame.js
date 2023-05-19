import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "./Game";
import styled from "styled-components";
import { Button, Form, Message } from "semantic-ui-react";
import { createRoom, joinRoom } from "../utils/chessOnline";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { off, onValue, ref } from "firebase/database";
import { auth, database } from "../firebase";
import { setRoomData, startGame } from "../store/roomSlice";
import Loader from "../componenets/Loader";
import { Navigate } from "react-router-dom";

export default function JoinGame() {
  const room = useSelector((state) => state.room);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [inputForm, setInputForm] = useState({
    name: "",
    roomId: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (inputForm.name && inputForm.roomId) {
      setLoading(true);
      try {
        const { color, isFirstPlayer } = await joinRoom(
          inputForm.name,
          inputForm.roomId,
          auth.currentUser.uid
        );
        dispatch(
          setRoomData({
            roomID: inputForm.roomId,
            name: inputForm.name,
            color: color,
            status: "started",
            isFirstPlayer: isFirstPlayer,
          })
        );
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    //   dispatch(createRoom(inputForm.name.value));
  };
  let renderComponent = (
    <Wrapper>
      {error && <Message error header="Error" content={error} />}
      <Form onSubmit={onSubmitHandler} inverted>
        <Form.Field required>
          <label>Name</label>
          <input
            value={inputForm.name}
            placeholder="First Name"
            onChange={(e) => {
              setInputForm((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
        </Form.Field>
        <Form.Field required>
          <label>Room Id</label>
          <input
            value={inputForm.roomId}
            placeholder="Room Id"
            onChange={(e) => {
              setInputForm((prev) => {
                return {
                  ...prev,
                  roomId: e.target.value,
                };
              });
            }}
          />
        </Form.Field>

        <Button color="twitter" style={{ width: "100%" }} type="submit">
          Join
        </Button>
      </Form>
    </Wrapper>
  );
  if (loading) {
    return <Loader />;
  }
  if (room.status === "loading") {
    renderComponent = (
      <Wrapper>
        <h2 style={{ color: "white" }}>waiting</h2>
      </Wrapper>
    );
  } else if (room.status === "started") {
    renderComponent = <Navigate to="/play" replace />;
  } else if (room.status === "error") {
    // renderComponent = <Error />;
  }
  return <>{renderComponent}</>;
}

const Wrapper = styled.div`
  background-color: #222222;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
