import WillAttendBadge from "./WillAttendBadge";
import AttendeeDecision from "./AttendeeDecision";

function TaskDetail({ task }) {
  let willAttendCount = 0;
  // if (task.userMap) {
  //   Object.entries(task.userMap).forEach(([key, value]) => {
  //     if (value.attendance === "yes") willAttendCount++;
  //     if (value.guests) willAttendCount += value.guests;
  //   });
  // }

  return (
    <div style={{ display: "grid", rowGap: "4px" }}>
      <div className="row" style={{ margin: "0" }}>
      <div style={{ fontSize: "22px" }}>{task.name}</div>
      <div>{task.description}</div>
      </div>
    </div>
  );
}

function decisionColumnStyle() {
  return { display: "flex", justifyContent: "right", padding: "0" };
}

export default TaskDetail;
