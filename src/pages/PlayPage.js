import {
  child,
  get,
  off,
  onDisconnect,
  onValue,
  ref,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { auth, database } from "../firebase";
import { setUsers } from "../store/usersSlice";
import Game from "./Game";

function PlayPage() {
  const dispatch = useDispatch();

  const game = useSelector((state) => state.game);
  const room = useSelector((state) => state.room);
  const onlineUsers = useSelector((state) => state.users.onlineUsers);

  const [isRematchRequsted, setIsRematchRequsted] = useState(false);
  const [rematchRequstStatus, setRematchRequstStatus] = useState(false);

  const [playerOne, setPlayerOne] = useState({
    color: "",
    name: "",
    uid: null,
  });
  const [playerTwo, setPlayerTwo] = useState({
    color: "",
    name: "",
    uid: null,
  });

  const blackUser =
    playerOne && playerTwo && playerOne.color == "black"
      ? playerOne
      : playerTwo;
  const whiteUser =
    playerOne && playerTwo && playerOne.color == "white"
      ? playerOne
      : playerTwo;
  // read once players names from database
  const opponent =
    playerOne && playerTwo && playerOne.color == room.color
      ? playerTwo
      : playerOne;

  const [isOpponentOnline, setIsOppenetOnline] = useState(true);

  useEffect(() => {
    const dbRef = ref(database);
    const childRef = child(dbRef, `rooms/${room.roomID}/playerOne`);

    get(childRef).then((snapshot) => {
      setPlayerOne(snapshot.val() || "Anonymous");
    });

    get(child(dbRef, `rooms/${room.roomID}/playerTwo`)).then((snapshot) => {
      setPlayerTwo(snapshot.val() || "Anonymous");
    });
  }, [room.roomID]);

  useEffect(() => {
    const connectRef = ref(database, ".info/connected");

    const myUserRef = child(
      ref(database),
      `rooms/${room.roomID}/USERS_ONLINE/${auth.currentUser.uid}`
    );
    onValue(connectRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // if we lose network then remove this user from the list
        //   const myUserRef = push(userListRef);
        onDisconnect(myUserRef).remove();
        //  console.log("onDisconnectObj,onDisconnectObj", onDisconnectObj);
        set(myUserRef, true);

        // setUserStatus("online")
      }
    });

    return () => off(connectRef);
  }, []);

  useEffect(() => {
    if (!opponent.uid) return;
    const connectRef = ref(database, `rooms/${room.roomID}/USERS_ONLINE`);
    // onChildAdded(connectRef, (data) => {});
    // onChildMoved(connectRef, (data) => {});

    onValue(connectRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setIsOppenetOnline(Object.keys(data).includes(opponent.uid));

        dispatch(setUsers({ users: Object.keys(data) }));
      }
    });

    return () => off(connectRef);
  }, [opponent]);
  useEffect(() => {
    if (!room.roomID) return;
    const rematchRef = ref(database, `rooms/${room.roomID}/rematchRequest`);

    onValue(rematchRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        if (data.from != room.color) {
          setIsRematchRequsted(
            data.from == "black" ? blackUser.name : whiteUser.name
          );
          setRematchRequstStatus(false);
        } else {
          setRematchRequstStatus(data.status);
          setIsRematchRequsted(false);
        }
      } else {
        setIsRematchRequsted(false);
        setRematchRequstStatus(false);
      }
    });

    return () => off(rematchRef);
  }, [room, blackUser, whiteUser, dispatch]);

  const [showDialog, setShowDialog] = useState(true);
  return (
    <>
      {room.roomID ? (
        <Game
          blackUser={blackUser}
          whiteUser={whiteUser}
          playerOne={playerOne}
          playerTwo={playerTwo}
          opponent={opponent}
          isOpponentOnline={isOpponentOnline}
          isRematchRequsted={isRematchRequsted}
          rematchRequstStatus={rematchRequstStatus}
        />
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}

export default PlayPage;
