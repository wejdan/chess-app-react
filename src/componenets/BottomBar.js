import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import { WIDTH } from "../utils/constants";
import IconButton from "./IconButton";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => `${props.width}px`};
  height: 50px;
  background-color: black;
  color: #fff;
`;
function BottomBar() {
  const {
    isCheckMate,
    turn,
    goBack,
    isGameOver,
    init,
    goForward,
    forward,
    history,
  } = useContext(Context);
  return (
    <Wrapper width={WIDTH}>
      <IconButton
        icon="fa-solid fa-chevron-left"
        text="Back"
        onClick={goBack}
        disabled={history.length == 0}
      />

      <IconButton
        icon="fa-solid fa-chevron-right"
        text="Forward"
        onClick={goForward}
        disabled={forward.length == 0}
      />
    </Wrapper>
  );
}

export default BottomBar;
