export const pawnAttack = (row, col, player) => {
  const limit = player == "black" ? row < 7 : row > 0;

  if (limit) {
    const newRow = player == "black" ? row + 1 : row - 1;

    const left = newRow + "*" + `${col - 1}`;
    const right = newRow + "*" + `${col + 1}`;
    return [left, right];
  }
  return [];
};

export const pawnMoves = (
  row,
  col,
  player,
  pieces,
  otherPieces,
  isMoved,
  passant
) => {
  "worklet";
  const tmpArry = [];
  const limit = player == "black" ? row < 7 : row > 0;

  if (limit) {
    const newRow = player == "black" ? row + 1 : row - 1;
    const secondStep = player == "black" ? row + 2 : row - 2;

    const forward = newRow + "*" + `${col}`;
    const left = newRow + "*" + `${col - 1}`;
    const right = newRow + "*" + `${col + 1}`;
    const doubleDorward = secondStep + "*" + `${col}`;

    if (!pieces.includes(forward) && !otherPieces.includes(forward)) {
      tmpArry.push(forward);
      if (!isMoved) {
        if (
          !pieces.includes(doubleDorward) &&
          !otherPieces.includes(doubleDorward)
        ) {
          tmpArry.push(doubleDorward);
        }
      }
    }
    if (otherPieces.includes(left) || passant.includes(left)) {
      tmpArry.push(left);
    }
    if (otherPieces.includes(right) || passant.includes(right)) {
      tmpArry.push(right);
    }
  }
  return tmpArry;
};

export const kingMoves = (row, col, pieces, current, board) => {
  //Castling is permitted only if neither the king nor the rook has previously moved;
  //the squares between the king and the rook are vacant
  //and the king does not leave, cross over, or finish on a square attacked by an enemy piece
  const tmpArry = [];
  if (col < 7) {
    const k = row + "*" + `${col + 1}`;
    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
  }
  if (col > 0) {
    const k = row + "*" + `${col - 1}`;
    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
  }
  if (row < 7) {
    const newRow = row + 1;
    const k = newRow + "*" + `${col}`;
    const k2 = newRow + "*" + `${col + 1}`;
    const k3 = newRow + "*" + `${col - 1}`;
    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
    if (!pieces.includes(k2)) {
      tmpArry.push(k2);
    }
    if (!pieces.includes(k3)) {
      tmpArry.push(k3);
    }
  }
  if (row > 0) {
    const newRow = row - 1;
    const k = newRow + "*" + `${col}`;
    const k2 = newRow + "*" + `${col + 1}`;
    const k3 = newRow + "*" + `${col - 1}`;

    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
    if (!pieces.includes(k2)) {
      tmpArry.push(k2);
    }
    if (!pieces.includes(k3)) {
      tmpArry.push(k3);
    }
  }

  return tmpArry;
};
export const kingCasling = (row, col, current, board, activeIndex) => {
  const tmpArry = [];
  if (!current.moved) {
    const otherTeam = current.player == "white" ? "black" : "white";

    const isRockMoved = board[activeIndex - 4].moved;
    if (!isRockMoved) {
      const left1 = isTileEmpty(row, col - 1, board);
      if (left1 && isSafeTile(row, col - 1, board, otherTeam)) {
        const left2 = isTileEmpty(row, col - 2, board);
        if (left2 && isSafeTile(row, col - 2, board, otherTeam)) {
          const left3 = isTileEmpty(row, col - 3, board);
          if (left3 && isSafeTile(row, col - 3, board, otherTeam)) {
            const castlingLeft = `${row}` + "*" + `${col - 4}`;

            tmpArry.push(castlingLeft);
          }
        }
      }
    }
    const isRightRockMoved = board[activeIndex + 3].moved;
    if (!isRightRockMoved) {
      const right1 = isTileEmpty(row, col + 1, board);
      if (right1 && isSafeTile(row, col + 1, board, otherTeam)) {
        const right2 = isTileEmpty(row, col + 2, board);
        if (right2 && isSafeTile(row, col + 2, board, otherTeam)) {
          const castlingRight = `${row}` + "*" + `${col + 3}`;

          tmpArry.push(castlingRight);
        }
      }
    }
    return tmpArry;
  }
};
const isPossibleMove = (pieces, otherPieces, postion) => {
  if (pieces.includes(postion)) {
    return 0;
  }
  if (otherPieces.includes(postion)) {
    return 1;
  }
  return 2;
};
const rockLine = (row, col, pieces, otherPieces, isCol, isBack) => {
  const tmpArry = [];
  for (
    let index = isCol ? col : row;
    isBack ? index > 0 : index < 7;
    isBack ? index-- : index++
  ) {
    const newPos = isBack ? index - 1 : index + 1;
    const postion = isCol ? row + "*" + `${newPos}` : newPos + "*" + `${col}`;
    const result = isPossibleMove(pieces, otherPieces, postion);
    if (result == 0) {
      break;
    }
    if (result == 1) {
      tmpArry.push(postion);

      break;
    }
    tmpArry.push(postion);
  }

  return tmpArry;
};
export const rockMoves = (row, col, pieces, otherPieces) => {
  "worklet";
  const a = rockLine(row, col, pieces, otherPieces, true, true);
  const b = rockLine(row, col, pieces, otherPieces, true, false);

  const c = rockLine(row, col, pieces, otherPieces, false, true);

  const d = rockLine(row, col, pieces, otherPieces, false, false);

  return [...a, ...b, ...c, ...d];
};

export const knightMoves = (row, col, pieces) => {
  "worklet";
  const tmpArry = [];

  // //   isBlocked();
  const p1 = row - 2 + "*" + `${col + 1}`;
  const p2 = row - 2 + "*" + `${col - 1}`;
  const p3 = row - 1 + "*" + `${col + 2}`;
  const p4 = row - 1 + "*" + `${col - 2}`;

  const p5 = row + 2 + "*" + `${col + 1}`;
  const p6 = row + 2 + "*" + `${col - 1}`;
  const p7 = row + 1 + "*" + `${col + 2}`;
  const p8 = row + 1 + "*" + `${col - 2}`;

  if (!pieces.includes(p1) && row - 2 > -1 && col + 1 < 8) {
    tmpArry.push(p1);
  }
  if (!pieces.includes(p2) && row - 2 > -1 && col > 0) {
    tmpArry.push(p2);
  }
  if (!pieces.includes(p3) && row - 1 > -1 && col + 2 < 8) {
    tmpArry.push(p3);
  }
  if (!pieces.includes(p4) && row - 1 > -1 && col - 2 > -1) {
    tmpArry.push(p4);
  }

  if (!pieces.includes(p5) && row + 2 < 8 && col + 1 < 8) {
    tmpArry.push(p5);
  }
  if (!pieces.includes(p6) && row + 2 < 8 && col - 1 > -1) {
    tmpArry.push(p6);
  }
  if (!pieces.includes(p7) && row + 1 < 8 && col + 2 < 8) {
    tmpArry.push(p7);
  }
  if (!pieces.includes(p8) && row + 1 < 8 && col - 2 > -1) {
    tmpArry.push(p8);
  }
  //   console.log('rock=', tmpArry);
  return tmpArry;
};

const bishopLine = (row, col, pieces, otherPieces, isBack, isLeft) => {
  const tmpArry = [];
  // console.log(pieces);
  let counter = 1;

  for (
    let index = isBack ? row : 1;
    isBack ? index < 7 : index <= row;
    index++
  ) {
    const newRow = isBack ? 1 + index : row - index;

    const postion =
      isBack == false
        ? isLeft
          ? newRow + "*" + `${col + index}`
          : newRow + "*" + `${col - index}`
        : isLeft
        ? newRow + "*" + `${col + counter}`
        : newRow + "*" + `${col - counter}`;
    const result = isPossibleMove(pieces, otherPieces, postion);

    if (result == 0) {
      break;
    }
    if (result == 1) {
      tmpArry.push(postion);

      break;
    }
    tmpArry.push(postion);
    counter = counter + 1;
  }
  return tmpArry;
};
export const bishopMoves = (row, col, pieces, otherPieces) => {
  "worklet";
  const a = bishopLine(row, col, pieces, otherPieces, false, true);
  const b = bishopLine(row, col, pieces, otherPieces, false, false);
  const c = bishopLine(row, col, pieces, otherPieces, true, true);
  const d = bishopLine(row, col, pieces, otherPieces, true, false);
  //row 4,col 5
  return [...a, ...b, ...c, ...d];
};
export const getPlayerPieces = (current, board) => {
  const myPieces = [];
  const otherPieces = [];
  const passant = [];
  let otherKing = "";
  board.map((p, i) => {
    if (
      p.player == current.player &&
      p.name != current.name &&
      p.isDeleted == false
    ) {
      myPieces.push(p.pos);
    } else if (p.player != current.player && p.isDeleted == false) {
      otherPieces.push(p.pos);
      if (p.type == "king") {
        otherKing = p.pos;
      }
      if (p.pos2) {
        passant.push(p.pos2);
      }
    }
  });

  return [myPieces, otherPieces, otherKing, passant];
};
export const calculateNewBoard = (row, col, board, index) => {
  const key = `${row}` + "*" + `${col}`;
  const newPositions = board.map((p, i) => {
    if (p.player == board[index].player) {
      if (p.pos2) {
        delete p.pos2;
        return p;
      } else {
        return p;
      }
    } else {
      return p;
    }
  });
  const current = newPositions[index];

  const oldPiece = newPositions.find(
    (p) =>
      (p.pos == key || (p.pos2 == key && current.type == "pawn")) &&
      p.isDeleted == false
  );
  if (current.pos2) {
    delete current.pos2;
  }

  if (oldPiece == undefined) {
    newPositions[index] = {
      ...current,
      pos: key,

      moved: true,
    };
    if (current.type == "pawn" && !current.moved) {
      const oldRow = Number(current.pos.split("*")[0]);
      if (Math.abs(row - oldRow) == 2) {
        //  alert("moving 2 steps");
        const otherRow = current.player == "white" ? oldRow - 1 : oldRow + 1;
        newPositions[index] = {
          ...current,
          pos: key,

          moved: true,
          pos2: `${otherRow}` + "*" + `${col}`,
        };
      }
    }
  } else if (
    oldPiece.name != current.name &&
    oldPiece.player != current.player
  ) {
    const newIndex = newPositions.findIndex(
      (p) =>
        (p.pos == key || (p.pos2 == key && current.type == "pawn")) &&
        p.isDeleted == false
    );

    newPositions[newIndex] = {
      ...oldPiece,
      isDeleted: true,
    };
    newPositions[index] = {
      ...current,
      pos: key,

      moved: true,
    };

    // console.log(oldPiece.name, name);
  } else if (oldPiece.player == current.player && oldPiece.type == "rock") {
    const newIndex = newPositions.findIndex(
      (p) => p.pos == key && p.isDeleted == false
    );
    const newRockCol = col == 7 ? col - 2 : col + 3;
    const newKingCol = col == 7 ? col - 1 : col + 2;

    const rockNewPos = `${row}` + "*" + `${newRockCol}`;
    newPositions[newIndex] = {
      ...oldPiece,
      pos: rockNewPos,
      moved: true,
    };
    const kingNewPos = `${row}` + "*" + `${newKingCol}`;

    newPositions[index] = {
      ...current,
      pos: kingNewPos,

      moved: true,
    };
  }

  return newPositions;
};
export const isTileEmpty = (row, col, board) => {
  const key = `${row}` + "*" + `${col}`;

  const oldPiece = board.find((p) => p.pos == key && p.isDeleted == false);

  return oldPiece ? false : true;
};
export const isSafeTile = (row, col, board, otherTeam) => {
  const key = `${row}` + "*" + `${col}`;
  const team = otherTeam == "white" ? "black" : "white";
  const myKingPos = board.find((p, i) => p.player == team && p.type == "king");

  for (let index = 0; index < board.length; index++) {
    const p = board[index];
    if (p.player == otherTeam && p.isDeleted == false) {
      const row = Number(p.pos.split("*")[0]);
      const col = Number(p.pos.split("*")[1]);
      const [validMovs, validAttacks] = filterValidMovs(
        row,
        col,
        board,
        index,
        otherTeam,
        myKingPos.pos,
        p
      );
      if (validMovs.includes(key)) {
        return false;
      }
    }
  }

  return true;
};

export const filterValidMovs = (
  row,
  col,
  board,
  index,
  team,
  teamKingPos,
  p
) => {
  const [tmpMovs, tmpAttacks] = calculateMovs(
    row,
    col,
    board[index],
    board,
    false
  );
  const validMovs = [];
  const validAttacks = [];
  tmpMovs.map((mov, i) => {
    const r = mov.split("*")[0];
    const c = mov.split("*")[1];
    const newBoard = calculateNewBoard(r, c, board, index);

    if (!canAttackTile(team, newBoard, p.type == "king" ? mov : teamKingPos)) {
      validMovs.push(mov);
    }
  });
  tmpAttacks.map((mov, i) => {
    const r = mov.split("*")[0];
    const c = mov.split("*")[1];
    const newBoard = calculateNewBoard(r, c, board, index);
    if (!canAttackTile(team, newBoard, p.type == "king" ? mov : teamKingPos)) {
      validAttacks.push(mov);
    }
  });

  return [validMovs, validAttacks];
};
export const isTeamHaveValidMoves = (team, board) => {
  const myKingPos = board.find((p, i) => p.player == team && p.type == "king");

  for (let index = 0; index < board.length; index++) {
    const p = board[index];
    if (p.player == team && p.isDeleted == false) {
      const row = Number(p.pos.split("*")[0]);
      const col = Number(p.pos.split("*")[1]);
      const [validMovs, validAttacks] = filterValidMovs(
        row,
        col,
        board,
        index,
        team,
        myKingPos.pos,
        p
      );
      if (validMovs.length > 0 || validAttacks.length > 0) {
        return true;
      }
    }
  }

  return false;
};
export const canAttackTile = (player, board, Tile) => {
  const otherPlayer = player == "white" ? "black" : "white";

  for (let index = 0; index < board.length; index++) {
    const p = board[index];
    if (p.player == otherPlayer && p.isDeleted == false) {
      const row = Number(p.pos.split("*")[0]);
      const col = Number(p.pos.split("*")[1]);

      if (p.type != "pawn") {
        const [tmpMovs, tmpAttacks] = calculateMovs(row, col, p, board, false);

        if (tmpAttacks.includes(Tile) || tmpMovs.includes(Tile)) {
          return true;
        }
      } else {
        const tmpAttacks = pawnAttack(row, col, p.player);
        if (tmpAttacks.includes(Tile)) {
          return true;
        }
      }
    }
  }

  return false;
};
export const calculateMovs = (r, c, current, board, isCheckingCheckMate) => {
  "worklet";
  const row = Number(r);
  const col = Number(c);
  const [pieces, otherPieces, otherKing, passant] = getPlayerPieces(
    current,
    board
  );
  let tmpMovs = [];
  let attacks = [];

  if (current.type == "pawn") {
    tmpMovs = pawnMoves(
      row,
      col,
      current.player,
      pieces,
      otherPieces,
      current.moved,
      passant
    );
  } else if (current.type == "rock") {
    tmpMovs = rockMoves(row, col, pieces, otherPieces);
  } else if (current.type == "bishop") {
    tmpMovs = bishopMoves(row, col, pieces, otherPieces);
  } else if (current.type == "queen") {
    const ms = rockMoves(row, col, pieces, otherPieces);
    const ms2 = bishopMoves(row, col, pieces, otherPieces);

    tmpMovs = [...ms, ...ms2];
  } else if (current.type == "king") {
    tmpMovs = kingMoves(row, col, pieces, current, board);
  } else if (current.type == "knight") {
    tmpMovs = knightMoves(row, col, pieces);
  }
  if (isCheckingCheckMate) {
    const isCheck = false;

    if (tmpMovs.includes(otherKing)) {
      return true;
    } else {
      return false;
    }
  }

  tmpMovs.map((mov, i) => {
    if (otherPieces.includes(mov) || pieces.includes(mov)) {
      attacks.push(mov);
    }
  });

  return [tmpMovs, attacks];
};
