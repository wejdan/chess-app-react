import { child, get, push, ref, remove, set, update } from "firebase/database";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { database } from "../../firebase";
export const userOn = async () => {
  const dbRef = ref(database);

  const userListRef = ref(dbRef, `USERS_ONLINE`);
  const myUserRef = await push(userListRef);
  return myUserRef;
};

export const userOff = async (name, roomID) => {
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
    throw new Error(
      "The Room Is Full You Can Create Your Own Room Or Join Another Room"
    );
  }
  const childRef = child(dbRef, `rooms/${roomID}/playerOne`);

  const playerOne = await get(childRef);
  playerColorOne = playerOne.val().color;

  const playerColorTwo = playerColorOne === "white" ? "black" : "white";

  const updates = {
    playerTwo: {
      name,
      color: playerColorTwo,
    },
    status: "started",
  };
  await update(child(dbRef, `rooms/${roomID}`), updates);
  return playerColorTwo;
};
