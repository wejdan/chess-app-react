import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "./Game";
import styled from "styled-components";
import { Button, Form, Input } from "semantic-ui-react";
import { createRoom } from "../utils/chessOnline";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { setRoomData, startGame } from "../store/roomSlice";
import { setGameData } from "../store/gameSlice";
import { Message, Icon } from "semantic-ui-react";
import Loader from "../componenets/Loader";
import { BallTriangle, Circles } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { initBoard } from "../utils/boardHelper";

export default function CreateGame() {
  const room = useSelector((state) => state.room);
  const game = useSelector((state) => state.game);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [inputForm, setInputForm] = useState({
    name: "",
    team: "white",
  });

  useEffect(() => {
    if (!room.roomID) return;
    const statusRef = ref(database, `rooms/${room.roomID}/status`);

    if (room.status === "loading") {
      onValue(statusRef, (snapshot) => {
        const data = snapshot.val();

        if (data === "started") {
          dispatch(startGame());
        }
      });
    }

    return () => off(statusRef);
  }, [room, dispatch]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (inputForm.name && inputForm.team) {
      const roomId = uuidv4();
      const gameObj = { ...game, turn: inputForm.team };
      setLoading(true);
      try {
        const id = await createRoom(
          inputForm.name,
          inputForm.team,
          gameObj,
          roomId
        );
        dispatch(
          setRoomData({
            roomID: id,
            name: inputForm.name,
            color: inputForm.team,
            status: "loading",
            isFirstPlayer: true,
          })
        );
        const startBoard = initBoard(inputForm.team);
        dispatch(setGameData({ turn: inputForm.team, board: startBoard }));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    //   dispatch(createRoom(inputForm.name.value));
  };
  let renderComponent = (
    <Wrapper>
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
        <Form.Select
          onChange={(e) => {
            setInputForm((prev) => {
              return {
                ...prev,
                team: e.target.innerText,
              };
            });
          }}
          required
          fluid
          label="Team"
          options={[
            { key: "w", text: "white", value: "white" },
            { key: "b", text: "black", value: "black" },
          ]}
          placeholder="Team"
        />

        <Button
          loading={loading}
          color="twitter"
          style={{ width: "100%" }}
          type="submit"
        >
          Start
        </Button>
      </Form>
    </Wrapper>
  );

  if (room.status === "loading") {
    renderComponent = (
      <Wrapper>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#1c91f4"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
        <div
          style={{
            color: "white",
            position: "absolute",
            bottom: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            You Can Share The Key With Your Friends
          </h3>
          <Input icon>
            <input style={{ with: "100%" }} value={room.roomID} />
            <Icon name="key" />
          </Input>
        </div>
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
