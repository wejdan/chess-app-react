import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { Context } from "../contexts/Context";
import { OnlineContext } from "../contexts/OnlineGameContext";
import { promotePawnTo } from "../store/gameSlice";
import { black, SIZE, white } from "../utils/constants";
function Promotion() {
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  useEffect(() => {
    if (game.turn == "white") {
      setList(black);
    } else {
      setList(white);
    }
  }, []);
  return (
    <Modal
      basic
      //  onClose={() => updateGame("shouldPawnPromote", false)}
      open={game.shouldPawnPromote}
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
                  dispatch(promotePawnTo({ newType: p }));
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
