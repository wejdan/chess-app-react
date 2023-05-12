import blackRock from "../assets/br.png";
import blackKnight from "../assets/bn.png";
import blackBishop from "../assets/bb.png";
import blackQueen from "../assets/bq.png";
import blackKing from "../assets/bk.png";

import whiteRock from "../assets/wr.png";
import whiteKnight from "../assets/wn.png";
import whiteBishop from "../assets/wb.png";
import whiteQueen from "../assets/wq.png";
import whiteKing from "../assets/wk.png";

export const SIZE = 60;

export const width = SIZE * 8;
export const WIDTH = width;
export const HEIGHT = SIZE * 8;
export const black = [
  {
    name: "br1",
    player: "black",
    img: blackRock,
    type: "rock",
  },
  {
    name: "bn1",
    player: "black",
    img: blackKnight,
    type: "knight",
  },
  {
    name: "bb1",
    player: "black",
    img: blackBishop,
    type: "bishop",
  },
  {
    name: "bq1",
    player: "black",
    img: blackQueen,
    type: "queen",
  },
  {
    name: "bk1",
    player: "black",
    img: blackKing,
    type: "king",
  },
  {
    name: "bb2",
    player: "black",
    img: blackBishop,
    type: "bishop",
  },
  {
    name: "bn2",
    player: "black",
    img: blackKnight,
    type: "knight",
  },
  {
    name: "br2",
    player: "black",
    img: blackRock,
    type: "rock",
  },
];

export const white = [
  {
    name: "wr1",
    player: "white",
    img: whiteRock,
    type: "rock",
  },
  {
    name: "wn1",
    player: "white",
    img: whiteKnight,
    type: "knight",
  },
  {
    name: "wb1",
    player: "white",
    img: whiteBishop,
    type: "bishop",
  },
  {
    name: "wq1",
    player: "white",
    img: whiteQueen,
    type: "queen",
  },
  {
    name: "wk1",
    player: "white",
    img: whiteKing,
    type: "king",
  },
  {
    name: "wb2",
    player: "white",
    img: whiteBishop,
    type: "bishop",
  },
  {
    name: "wn2",
    player: "white",
    img: whiteKnight,
    type: "knight",
  },
  {
    name: "wr2",
    player: "white",
    img: whiteRock,
    type: "rock",
  },
];
