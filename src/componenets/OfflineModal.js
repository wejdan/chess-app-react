import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

import { Button, Header, Icon, Modal } from "semantic-ui-react";
function OfflineModal({ isOnline }) {
  return (
    <Modal basic open={!isOnline} size="small">
      <Header icon>You are Offline </Header>
      <Modal.Content>
        <h4 style={{ textAlign: "center" }}>
          You'r Not Connected To The Server
        </h4>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default OfflineModal;
