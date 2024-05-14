import Button from "react-bootstrap/esm/Button.js";
import {useNavigate} from "react-router-dom";

import BoardDueTodayOverdueBadge from "./BoardDueTodayOverdueBadge";
import BoardDetail from "./BoardDetail";

import Icon from "@mdi/react";
import {mdiEyeOutline, mdiPencil, mdiTrashCanOutline} from "@mdi/js";
import {useContext} from "react";
import {UserContext} from "./context/UserContext";

function BoardCard({board, setShowBoardForm, setShowConfirmDeleteDialog}) {
  const navigate = useNavigate();
  const {loggedInUser} = useContext(UserContext); // Access UserContext

  const canView = loggedInUser ? (loggedInUser.id === board.userId || ( board.sharedWith && board.sharedWith.includes(loggedInUser.id))) : false;
  console.log("loggedInUser", loggedInUser);
  console.log("board", board);
  console.log("canView", canView);
  return (
    canView ? (
        <div className="card border-0 shadow rounded" style={componentStyle()}>
          <BoardDueTodayOverdueBadge board={board}/>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto"
          }}>
            <BoardDetail board={board} displayTaskList={false} setShowBoardForm={setShowBoardForm}
                         setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}/>
          </div>
          <div>
          </div>
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button onClick={() => navigate("/boardDetail?id=" + board.id)} variant="dark" size={"sm"}
                    style={{margin: "5px", backgroundColor: "#808080"}}>
              <Icon path={mdiEyeOutline} size={0.7}/>
            </Button>
            <Button onClick={() => setShowBoardForm(board)} size={"sm"} variant="dark"
                    style={{margin: "5px", backgroundColor: "#808080"}}>
              <Icon path={mdiPencil} size={0.7}/>
            </Button>
            <Button onClick={() => setShowConfirmDeleteDialog(board)} size={"sm"} variant="dark"
                    style={{margin: "5px", backgroundColor: "#ffa31a"}}>
              <Icon path={mdiTrashCanOutline} size={0.7}/>
            </Button>
          </div>
        </div>)
      :
      (<p>Nic k zobrazeni</p>)
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
