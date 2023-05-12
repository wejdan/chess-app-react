import React from "react";
import styled from "styled-components";
import { HEIGHT, SIZE, WIDTH, width } from "../utils/constants";
const Wrapper = styled.div``;

const color1 = "#fcfed5";
const color2 = "#648840";
const blocks = Array(8)
  .fill()
  .map((v, i) => i);

function Chessborad() {
  return (
    <Wrapper>
      {blocks.map((_, j) => {
        return (
          <div
            key={j}
            style={{ display: "flex", flexDirection: "row", width: WIDTH }}
          >
            {blocks.map((_, i) => {
              return (
                <div
                  key={i + j}
                  style={{
                    width: SIZE,
                    height: SIZE,
                    backgroundColor: (i + j) % 2 == 0 ? color1 : color2,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </Wrapper>
  );
}

export default Chessborad;
