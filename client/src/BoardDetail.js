import TaskList from "./TaskList";
import BoardPermissionsBadge from "./BoardPermissionsBadge";

function BoardDetail({board, displayTaskList}) {
  return (
    <div style={boardDetailStyle()}>
      <div className="board-header" style={{marginBottom: "20px"}}>
        <div style={{fontSize: "22px", marginRight: "20px"}}>{board.name}</div>
        <BoardPermissionsBadge board={board}/>
        <div>{board.description}</div>
      </div>
      {displayTaskList && (
        <div className="task-list">
          <TaskList board={board}/>
        </div>
      )}
    </div>
    );
}

function boardDetailStyle() {
  return {
    // padding: "16px",
    // margin: "20px",
  };
}

export default BoardDetail;