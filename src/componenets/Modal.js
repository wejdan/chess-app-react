import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";
const Box = styled.div`
  background-color: #f8f8f8;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 400px;
`;
const Wrapper = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Modal({ children, setOpen }) {
  return (
    <Wrapper
      onClick={() => {
        setOpen(false);
      }}
    >
      <Box>{children}</Box>
    </Wrapper>
  );
}

export default Modal;
