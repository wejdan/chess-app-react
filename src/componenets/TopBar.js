import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import { OnlineContext } from "../contexts/OnlineGameContext";
import { WIDTH } from "../utils/constants";
import IconButton from "./IconButton";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background-color: black;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
function TopBar() {
  const game = useSelector((state) => state.game);
  const room = useSelector((state) => state.room);

  return (
    <Wrapper width={WIDTH} style={{ pointerEvents: "none" }}>
      <div
        style={{ fontWeight: "bold", fontSize: "20px" }}
      >{`Turn: ${game.turn} `}</div>

      <p
        style={{
          color: "white",
          fontSize: 30,
          fontVariant: ["tabular-nums"],
        }}
      >
        {`You'r Team is ${room.color}`}
      </p>
    </Wrapper>
  );
}

export default TopBar;
