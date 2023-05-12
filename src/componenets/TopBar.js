import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import { WIDTH } from "../utils/constants";
import IconButton from "./IconButton";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: ${(props) => `${props.width}px`};
  height: 50px;
  background-color: black;
  color: #fff;
`;
function TopBar() {
  const {
    isCheckMate,
    turn,
    goBack,
    isGameOver,
    init,
    goForward,
    forward,
    history,
    total,
  } = useContext(Context);
  return (
    <Wrapper width={WIDTH} style={{ pointerEvents: "none" }}>
      <div
        style={{ fontWeight: "bold", fontSize: "20px" }}
      >{`${total}-Turn: ${turn} `}</div>

      <p
        style={{
          color: "white",
          fontSize: 30,
          fontVariant: ["tabular-nums"],
          opacity: isCheckMate ? 1 : 0,
        }}
      >
        CHEECK MATE
      </p>
    </Wrapper>
  );
}

export default TopBar;
