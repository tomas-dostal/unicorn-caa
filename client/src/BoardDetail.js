import WillAttendBadge from "./WillAttendBadge";
import AttendeeDecision from "./AttendeeDecision";
import TaskList from "./TaskList";

function BoardDetail({ board }) {
  let willAttendCount = 0;
  // if (board.userMap) {
  //   Object.entries(board.userMap).forEach(([key, value]) => {
  //     if (value.attendance === "yes") willAttendCount++;
  //     if (value.guests) willAttendCount += value.guests;
  //   });
  // }

  return (
    <div style={{ display: "grid", rowGap: "4px" }}>
      <div className="row" style={{ margin: "0" }}>
      <div style={{ fontSize: "22px" }}>{board.name}</div>
      <div>{board.description}</div>
        <TaskList
        board={board}>
        </TaskList>
      </div>
    </div>
  );
}

function decisionColumnStyle() {
  return { display: "flex", justifyContent: "right", padding: "0" };
}

export default BoardDetail;
