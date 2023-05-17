import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import { OnlineContext } from "../contexts/OnlineGameContext";
import { reset, resetStateForRematch } from "../store/gameSlice";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  acceptRematch,
  deleteRoom,
  rejectRematch,
  requestRematch,
} from "../utils/chessOnline";
import { resetRoom } from "../store/roomSlice";

function GameoverModal({
  isRematchRequsted,
  rematchRequstStatus,
  isOpponentOnline,
  opponent,
}) {
  const game = useSelector((state) => state.game);
  const room = useSelector((state) => state.room);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <>
      <Modal basic open={!isOpponentOnline} size="small">
        <Header icon>{`${opponent.name} Has Left The Game`}</Header>
        <Modal.Content>
          <h4 style={{ textAlign: "center" }}>
            You Can Create A new Game Or Join Other Friends
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={() => {
              dispatch(resetRoom());

              dispatch(reset());
              deleteRoom(room.roomID);
              navigate("/", { replace: true });
            }}
          >
            <Icon name="checkmark" /> Go To Home
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        basic
        open={game.end.isGameEnded && rematchRequstStatus}
        size="small"
      >
        <Header icon>Game Is Over</Header>
        <Modal.Content>
          <h4 style={{ textAlign: "center" }}>
            {rematchRequstStatus == "waiting"
              ? "Wating For Your Opponent Response"
              : "Your Opponent Dose Not Want To Play Another Game You Can Create A new Game Or Join Other Friends"}
          </h4>
        </Modal.Content>
        {rematchRequstStatus == "rejected" && (
          <Modal.Actions>
            <Button
              color="green"
              inverted
              onClick={() => {
                dispatch(resetRoom());

                dispatch(reset());
                deleteRoom(room.roomID);

                navigate("/", { replace: true });
              }}
            >
              <Icon name="checkmark" /> Go To Home
            </Button>
          </Modal.Actions>
        )}
      </Modal>
      <Modal
        basic
        open={game.end.isGameEnded && isRematchRequsted}
        size="small"
      >
        <Header icon>Game Is Over</Header>
        <Modal.Content>
          <h3 style={{ textAlign: "center" }}>
            {`${isRematchRequsted} Want To Play Another Game Do You Want To join? `}
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => {
              rejectRematch(room.roomID);
              dispatch(resetRoom());
              dispatch(reset());
              navigate("/", { replace: true });
            }}
          >
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              acceptRematch(room.roomID);
              dispatch(reset());
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        basic
        open={
          game.end.isGameEnded && !isRematchRequsted && !rematchRequstStatus
        }
        size="small"
      >
        <Header icon>Game Is Over</Header>
        <Modal.Content>
          <h3 style={{ textAlign: "center" }}>
            Do You Want To Play Another Game?
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => {
              dispatch(resetRoom());
              dispatch(reset());
              navigate("/", { replace: true });
            }}
          >
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              requestRematch(room.color, room.roomID);
              //  dispatch(reset());
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default GameoverModal;
