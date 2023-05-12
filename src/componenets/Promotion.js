import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { Context } from "../contexts/Context";
import { black, SIZE, white } from "../utils/constants";
function Promotion() {
  const { isPromoation, setBoard, setIsPromoation, turn, board, active } =
    useContext(Context);

  const [list, setList] = useState([]);
  useEffect(() => {
    console.log("turn", turn);
    if (turn == "white") {
      setList(black);
    } else {
      setList(white);
    }
  }, []);
  return (
    <Modal
      basic
      onClose={() => setIsPromoation(false)}
      open={isPromoation}
      size="small"
    >
      <Header icon>Promoto Your Pawn</Header>
      <Modal.Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            flexDirection: "row",
          }}
        >
          {list.slice(0, 4).map((p, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  //   alert(p.type);
                  const newPositions = [...board];
                  const current = newPositions[active];
                  newPositions[active] = {
                    ...current,
                    type: p.type,
                    img: p.img,

                    moved: true,
                  };
                  setBoard(newPositions);
                  //   setImg(p.img);
                  setIsPromoation(false);
                }}
              >
                <img
                  src={p.img}
                  style={{ width: SIZE, height: SIZE, cursor: "pointer" }}
                />
              </div>
            );
          })}
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default Promotion;
