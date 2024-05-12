import { useContext, useState } from "react";
import { TaskListContext } from "./context/TaskListContext.js";
import { UserContext } from './context/UserContext.js';
//import { BoardContext } from './context/BoardContext.js';

import Button from "react-bootstrap/esm/Button.js";

import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm.js";
import Container from "react-bootstrap/esm/Container.js";
import Col from "react-bootstrap/esm/Col.js";


import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function TaskList() {
  const { taskList } = useContext(TaskListContext);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const { loggedInUser } = useContext(UserContext); // Access UserContext
  //const { currentBoard } = useContext(BoardContext); // Access BoardContext

  const filteredTaskList = loggedInUser
      ? taskList.filter((task) => task.userId === loggedInUser.id )// && task.boardId === currentBoard.id)
      : []; // because loggedInUser is null in the beginning
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="dark" style={{ backgroundColor: "#ffa31a", color: "#1b1b1b"}} onClick={() => setShowTaskForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} /> Nový úkol
        </Button>
      </div>
      {!!showTaskForm ? (
        <TaskForm task={showTaskForm} setShowTaskForm={setShowTaskForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          task={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {filteredTaskList.length === 0 ? (
          <p>Nic k zobrazeni</p>
      ) : (
          filteredTaskList.map((task) => (
              <Col key={task.id} xs={12} sm={6} md={4} lg={3}>
                <TaskCard
                    task={task}
                    setShowTaskForm={setShowTaskForm}
                    setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                />
              </Col>
          ))
      )}
    </Container>
  );
}

export default TaskList;
