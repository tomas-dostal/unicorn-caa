import {useContext, useState} from "react";
import {BoardListContext} from "./context/BoardListContext.js";
import {UserContext} from './context/UserContext.js';

import Button from "react-bootstrap/esm/Button.js";

import BoardCard from "./BoardCard";
import BoardForm from "./BoardForm.js";
import Container from "react-bootstrap/esm/Container.js";
import Col from "react-bootstrap/esm/Col.js";


import Icon from "@mdi/react";
import {mdiPlusBoxOutline} from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function BoardList() {
  const {boardList} = useContext(BoardListContext);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const {loggedInUser} = useContext(UserContext); // Access UserContext

  const filteredBoardList = loggedInUser
    ? boardList.filter((board) => board.userId === loggedInUser.id)
    : []; // because loggedInUser is null in the beginning
  return (
    <Container>
      {!!loggedInUser ? (
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px"}}>
          <Button variant="success" onClick={() => setShowBoardForm({})}>
            <Icon path={mdiPlusBoxOutline} size={1} color={"white"}/> Nova nastenka
          </Button>
        </div>
      ) : null}
      {!!showBoardForm ? (
        <BoardForm board={showBoardForm} setShowBoardForm={setShowBoardForm}/>
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          board={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {filteredBoardList.length === 0 ? (
        <p>Nic k zobrazeni</p>
      ) : (
        filteredBoardList.map((board) => (
          <Col key={board.id} xs={12} sm={6} md={4} lg={3}>
            <BoardCard
              board={board}
              setShowBoardForm={setShowBoardForm}
              setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
            />
          </Col>
        ))
      )}
    </Container>
  );
}

export default BoardList;
