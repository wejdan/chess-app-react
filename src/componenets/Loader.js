import React from "react";
import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

function Loader() {
  const Wrapper = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #282a37;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return (
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
    </Wrapper>
  );
}

export default Loader;
