import TaskList from "./TaskList";

function BoardDetail({board, displayTaskList}) {
  return (
    <div style={boardDetailStyle()}>
      <div className="board-header" style={{marginBottom: "20px"}}>
        <div style={{fontSize: "22px", marginRight: "20px"}}>{board.name}</div>
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