import { useContext } from "react";
import { TaskContext } from "./context/TaskContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import TaskDetail from "./TaskDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function TaskRoute({ setShowTaskForm }) {
  const navigate = useNavigate();
  const { task } = useContext(TaskContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {task ? (
        <>
          <TaskDetail task={task} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/taskDetail?id=" + task.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowTaskForm(task)} size={"sm"}>
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

export default TaskRoute;
