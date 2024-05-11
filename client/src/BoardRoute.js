import { useContext } from "react";
import { BoardContext } from "./context/BoardContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import BoardDateTimeBadge from "./BoardDateTimeBadge";
import BoardDetail from "./BoardDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function BoardRoute({ setShowBoardForm }) {
  const navigate = useNavigate();
  const { board } = useContext(BoardContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {board ? (
        <>
          <BoardDateTimeBadge board={board} />
          <BoardDetail board={board} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/boardDetail?id=" + board.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowBoardForm(board)} size={"sm"}>
              <Icon path={mdiPencil} size={0.7} />
            </Button>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default BoardRoute;
