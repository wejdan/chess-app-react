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
function GameoverModal() {
  const { init, winner } = useContext(Context);

  return (
    <Wrapper>
      <Box>
        <h2
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
            pointerEvents: "none",
          }}
        >
          {winner.charAt(0).toUpperCase() + winner.slice(1)} Wins
        </h2>
        <div
          onClick={() => {
            init();
          }}
          style={{
            backgroundColor: "#AACB73",
            borderRadius: "12px",
            width: "40%",
            height: 50,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            New Game
          </span>
        </div>
      </Box>
    </Wrapper>
  );
}

export default GameoverModal;
