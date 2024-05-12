import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import BoardDateTimeBadge from "./BoardDateTimeBadge";
import BoardDetail from "./BoardDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function BoardCard({ board, setShowBoardForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto"
      }}>
        <BoardDetail board={board} />
      </div>
      <div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => navigate("/boardDetail?id=" + board.id)} variant="dark" size={"sm"} style={{margin:"5px",  backgroundColor: "#808080"}}>
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>
        <Button onClick={() => setShowBoardForm(board)} size={"sm"} variant="dark"  style={{margin:"5px",  backgroundColor: "#808080"}}>
          <Icon path={mdiPencil} size={0.7} />
        </Button>
        <Button onClick={() => setShowConfirmDeleteDialog(board)} size={"sm"} variant="dark" style={{margin:"5px", backgroundColor: "#ffa31a"}}>
          <Icon path={mdiTrashCanOutline} size={0.7} />
        </Button>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "16px",
    maxWidth: "100%",
  };
}

export default BoardCard;
