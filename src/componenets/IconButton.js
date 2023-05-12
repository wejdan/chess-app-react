import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  background-color: #000;
  width: 100px;
  height: 40px;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  * {
    color: ${(props) => (props.disabled ? "#555" : "#fff")};
  }
  i {
    margin-right: 5px;
  }
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
`;
function IconButton({ onClick, text, icon, disabled }) {
  return (
    <Wrapper
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      <div style={{ alignItems: "center" }}>
        <i className={icon}></i>

        <span>{text}</span>
      </div>
    </Wrapper>
  );
}

export default IconButton;
