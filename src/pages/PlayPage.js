import {
  child,
  get,
  off,
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { removeUser, addUser } from "../store/usersSlice";
import Game from "./Game";

function PlayPage() {
  const dispatch = useDispatch();

  const room = useSelector((state) => state.room);
  const onlineUsers = useSelector((state) => state.users.onlineUsers);

  const [isOppenentWantRematch, setOppenentWantRematch] = useState(false);
  const [isWatingOppenentResponse, setWatingOppenentResponse] = useState(false);

  const [me, setMe] = useState({
    color: "",
    name: "",
    uid: null,
  });
  const [opponent, setOpponent] = useState({
    color: "",
    name: "",
    uid: null,
  });

  const [isOpponentOnline, setIsOppenetOnline] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const connectRef = ref(database, ".info/connected");

    const myUserRef = child(
      ref(database),
      `rooms/${room.roomID}/USERS_ONLINE/${auth.currentUser.uid}`
    );
    onValue(connectRef, (snapshot) => {
      if (snapshot.val() === true) {
        onDisconnect(myUserRef).remove();
        set(myUserRef, true);
        setIsOnline(true);
      } else {
        remove(myUserRef);
        setIsOnline(false);
      }
    });

    return () => {
      off(connectRef);
      remove(myUserRef);
    };
  }, [room.roomID]);
  useEffect(() => {
    const dbRef = ref(database);
    const childRef = child(dbRef, `rooms/${room.roomID}/playerOne`);

    get(childRef).then((snapshot) => {
      const playerData = snapshot.val();
      if (playerData.uid == auth.currentUser.uid) {
        setMe(playerData);
      } else {
        setOpponent(playerData);
      }
    });

    get(child(dbRef, `rooms/${room.roomID}/playerTwo`)).then((snapshot) => {
      const playerData = snapshot.val();

      if (playerData.uid == auth.currentUser.uid) {
        setMe(playerData);
      } else {
        setOpponent(playerData);
      }
    });
  }, [room.roomID]);
  useEffect(() => {
    if (!opponent.uid) return;
    const connectRef = ref(database, `rooms/${room.roomID}/USERS_ONLINE`);

    onChildAdded(connectRef, (data) => {
      //   console.log(data.key, data.val());
      console.log("onChildAdded", data.key);
      if (data.key == opponent.uid) {
        setIsOppenetOnline(true);
      }
      dispatch(addUser({ user: data.key }));
    });

    onChildRemoved(connectRef, (dataSnapshot) => {
      console.log("onChildRemoved", dataSnapshot.key);

      if (onlineUsers.includes(dataSnapshot.key)) {
        if (dataSnapshot.key == opponent.uid) {
          setIsOppenetOnline(false);
        }
        dispatch(removeUser({ users: dataSnapshot.key }));
      }
    });

    // onValue(connectRef, (snapshot) => {
    //   const data = snapshot.val();

    //   if (data) {
    //     setIsOppenetOnline(Object.keys(data).includes(opponent.uid));

    //     dispatch(setUsers({ users: Object.keys(data) }));
    //   }
    // });

    return () => off(connectRef);
  }, [opponent.uid, room.roomID, dispatch, onlineUsers]);
  useEffect(() => {
    if (!room.roomID) return;

    const rematchRef = ref(database, `rooms/${room.roomID}/game/end/isRematch`);

    onValue(rematchRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data != room.color) {
          setOppenentWantRematch(true);
          setWatingOppenentResponse(false);
        } else {
          setOppenentWantRematch(false);
          setWatingOppenentResponse(true);
        }
      } else {
        setOppenentWantRematch(false);
        setWatingOppenentResponse(false);
      }
    });

    return () => off(rematchRef);
  }, [room, dispatch]);

  return (
    <>
      {room.roomID ? (
        <Game
          me={me}
          opponent={opponent}
          isOpponentOnline={isOpponentOnline}
          isOppenentWantRematch={isOppenentWantRematch}
          isWatingOppenentResponse={isWatingOppenentResponse}
          isOnline={isOnline}
        />
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}

export default PlayPage;
