import { useContext, useState } from "react";
import { BoardListContext } from "./context/BoardListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import BoardCard from "./BoardCard";
import BoardForm from "./BoardForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function BoardList() {
  const { boardList } = useContext(BoardListContext);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const filteredBoardList = boardList.filter(
    (board) => new Date(board.date) > new Date()
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowBoardForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
          událost
        </Button>
      </div>
      {!!showBoardForm ? (
        <BoardForm board={showBoardForm} setShowBoardForm={setShowBoardForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          board={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {filteredBoardList.map((board) => {
        return (
          <BoardCard
            key={board.id}
            board={board}
            setShowBoardForm={setShowBoardForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default BoardList;
