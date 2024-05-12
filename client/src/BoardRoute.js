import {useContext} from "react";
import {BoardContext} from "./context/BoardContext";
import Button from "react-bootstrap/esm/Button.js";
import {useNavigate} from "react-router-dom";

import BoardDueTodayOverdueBadge from "./BoardDueTodayOverdueBadge";
import BoardDetail from "./BoardDetail";

import Icon from "@mdi/react";
import {mdiEyeOutline, mdiPencil} from "@mdi/js";

function BoardRoute({setShowBoardForm}) {
  const navigate = useNavigate();
  const {board} = useContext(BoardContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {board ? (
        <>
          <BoardDueTodayOverdueBadge board={board}/>
          <BoardDetail board={board} displayTaskList={true} setShowBoardForm={setShowBoardForm}/>
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button onClick={() => navigate("/boardDetail?id=" + board.id)} variant="dark" size={"sm"}
                    style={{margin: "5px", backgroundColor: "#808080"}}>
              <Icon path={mdiEyeOutline} size={0.7}/>
            </Button>
            <Button onClick={() => setShowBoardForm(board)} size={"sm"} variant="dark"
                    style={{margin: "5px", backgroundColor: "#808080"}}>
              <Icon path={mdiPencil} size={0.7}/>
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
    maxWidth: "100%",
  };
}

export default BoardRoute;
