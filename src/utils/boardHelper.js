export const getRowAndCol = (piece) => {
  const row = Number(piece.pos.split("*")[0]);
  const col = Number(piece.pos.split("*")[1]);
  return [row, col];
};
