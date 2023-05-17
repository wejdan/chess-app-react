import { child, get, ref, remove, set, update } from "firebase/database";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { auth, database } from "../firebase";
export const createRoom = async (name, team, gameState, roomId) => {
  const playerColorOne = team;

  const roomData = {
    game: gameState,
    playerOne: {
      name,
      color: playerColorOne,
      uid: auth.currentUser.uid,
    },
    status: "loading",
  };

  const dbRef = ref(database);
  //const newChat = await push(childRef, newChatData);
  await set(child(dbRef, `rooms/${roomId}/`), roomData);
  // await database.ref("rooms/" + roomID).set(room);

  return roomId;
};

export const joinRoom = async (name, roomID, uid) => {
  let playerColorOne;
  const dbRef = ref(database);

  const roomRef = child(dbRef, `rooms/${roomID}`);
  const roomShot = await get(roomRef);
  if (!roomShot.exists()) {
    throw new Error(
      'The Room Dose Not Exist You Can Create Your Own Room Or Join Another Room"'
    );
  }
  const playerTwoRef = child(dbRef, `rooms/${roomID}/playerTwo`);
  const snapShot = await get(playerTwoRef);
  if (snapShot.exists()) {
    const roomData = roomShot.val();
    const USERS_ONLINE = Object.keys(roomData.USERS_ONLINE);
    const players = [roomData.playerOne, roomData.playerTwo];
    const currentPlayer = players.find((p) => p.uid == uid);
    console.log(currentPlayer);
    const isPlayerInTheGame = currentPlayer;
    if (!isPlayerInTheGame) {
      throw new Error(
        "The Room Is Full You Can Create Your Own Room Or Join Another Room"
      );
    } else {
      return currentPlayer.color;
    }
  }
  const childRef = child(dbRef, `rooms/${roomID}/playerOne`);

  const playerOne = await get(childRef);
  playerColorOne = playerOne.val().color;

  const playerColorTwo = playerColorOne === "white" ? "black" : "white";

  const updates = {
    playerTwo: {
      name,
      color: playerColorTwo,
      uid: auth.currentUser.uid,
    },
    status: "started",
  };
  await update(child(dbRef, `rooms/${roomID}`), updates);
  return playerColorTwo;
};

export const updateGame = async (gameState, roomId) => {
  const dbRef = ref(database);
  const childRef = child(dbRef, `rooms/${roomId}/game`);

  update(childRef, gameState);
};
export const deleteRoom = async (roomId) => {
  const dbRef = ref(database);
  const childRef = child(dbRef, `rooms/${roomId}`);

  remove(childRef);
};
export const requestRematch = async (userColor, roomId) => {
  const dbRef = ref(database);
  const childRef = child(dbRef, `rooms/${roomId}/rematchRequest`);
  const rematchRequest = {
    from: userColor,
    status: "waiting", //'accepted''
  };
  update(childRef, rematchRequest);
};
export const acceptRematch = async (roomId) => {
  const dbRef = ref(database);
  const childRef = child(dbRef, `rooms/${roomId}/rematchRequest`);
  await remove(childRef);
};
export const rejectRematch = async (roomId) => {
  const dbRef = ref(database);
  const childRef = child(dbRef, `rooms/${roomId}/rematchRequest`);
  const rematchRequest = {
    status: "rejected", //'accepted''
  };
  update(childRef, rematchRequest);
};
export const leaveGame = async (gameState, roomId) => {
  const dbRef = ref(database);
  const childRef = child(dbRef, `rooms/${roomId}/game`);

  update(childRef, gameState);
};