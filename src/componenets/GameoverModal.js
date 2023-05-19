import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { reset, setGameData } from "../store/gameSlice";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  acceptRematch,
  deleteRoom,
  flipPlayersTurn,
  getFirstTurn,
  rejectRematch,
  requestRematch,
} from "../utils/chessOnline";
import { resetRoom, setRoomData } from "../store/roomSlice";
import { initBoard } from "../utils/boardHelper";
import { auth } from "../firebase";

function GameoverModal({
  isOppenentWantRematch,
  isWatingOppenentResponse,
  isOpponentOnline,
  opponent,
  me,
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
        open={
          game.end.isGameEnded && isWatingOppenentResponse && isOpponentOnline
        }
        size="small"
      >
        <Header icon>Game Is Over</Header>
        <Modal.Content>
          <h4 style={{ textAlign: "center" }}>
            Wating For Your Opponent Response
          </h4>
        </Modal.Content>
      </Modal>
      <Modal
        basic
        open={game.end.isGameEnded && isOppenentWantRematch && isOpponentOnline}
        size="small"
      >
        <Header icon>Game Is Over</Header>
        <Modal.Content>
          <h3 style={{ textAlign: "center" }}>
            {`${opponent.name} Want To Play Another Game Do You Want To join? `}
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => {
              // rejectRematch(room.roomID);
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
            onClick={async () => {
              dispatch(reset());
              const newTurn = await flipPlayersTurn(room.roomID);
              const newTurnColor =
                newTurn == auth.currentUser.uid ? room.color : opponent.color;
              const startBoard = initBoard(newTurnColor);
              dispatch(setGameData({ turn: newTurnColor, board: startBoard }));
              dispatch(
                setRoomData({
                  isFirstPlayer: newTurn == auth.currentUser.uid,
                })
              );
              //  acceptRematch(room.roomID);
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        basic
        open={
          game.end.isGameEnded &&
          !isOppenentWantRematch &&
          !isWatingOppenentResponse
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
            onClick={async () => {
              requestRematch(room.color, room.roomID);
              const oldTuren = await getFirstTurn(room.roomID);
              dispatch(
                setRoomData({
                  isFirstPlayer:
                    oldTuren != auth.currentUser.uid ? true : false,
                })
              );
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
