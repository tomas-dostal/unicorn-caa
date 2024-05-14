import {useContext} from "react";
import {BoardContext} from "./context/BoardContext";
import Button from "react-bootstrap/esm/Button.js";
import {useNavigate} from "react-router-dom";

import BoardDueTodayOverdueBadge from "./BoardDueTodayOverdueBadge";
import BoardDetail from "./BoardDetail";

import Icon from "@mdi/react";
import {mdiEyeOutline, mdiPencil} from "@mdi/js";
import {UserContext} from "./context/UserContext";
import Alert from "react-bootstrap/Alert";

function BoardRoute({setShowBoardForm}) {
  const navigate = useNavigate();
  const {board} = useContext(BoardContext);
  const {loggedInUser} = useContext(UserContext); // Access UserContext
  console.log("loggedInUser", loggedInUser);
  console.log("board", board);
  const canView = (loggedInUser && board) ? (loggedInUser.id === board.userId || ( board.sharedWith && board.sharedWith.includes(loggedInUser.id))) : false;
  console.log("canView", canView);
  return (
    <>
      {board ? (
        canView ? (
          <div className="card border-0 shadow rounded" style={componentStyle()}>
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
          </div>

          ) :
          (        <Alert
            variant="danger"
            dismissible
          >
            <Alert.Heading>Nic k zobrazeni</Alert.Heading>
            uzivatel neni prihlasen / uzivatel nema pristup k nastence
          </Alert>)

      ) : (<p>Loading...</p>)}
    </>);
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
