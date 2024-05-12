  function BoardDueTodayOverdueBadge({ board }) {
  const dateToShow = new Date(board.date);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // today's midnight

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let dueTodayCnt = 0;
    let overdueCnt = 0;

    if(board.taskList){
      board.taskList.forEach((task) => {
        const date = new Date(task.date);
        //
        if(task.dueDate >= today && task.dueDate < tomorrow && task.status !== "finished") {
          dueTodayCnt++;
        }
        if(task.dueDate < today && task.status !== "finished"){
          overdueCnt++;
        }
      })
    }


  return (
    <div className={"rounded"} style={componentStyle()}>
      <div className={"rounded"} style={dateStyle()}>
        <div>Overdue:&nbsp;{overdueCnt}</div>
      </div>
      <div className={"rounded-bottom"} style={timeStyle()}>
        Due today:&nbsp;{dueTodayCnt}
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    width: "100%", // want it to be filled by its children
    backgroundColor: "#ffa31a",
    display: "grid",
    height: "max-content",
  };
}

function dateStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    padding: "8px",
    fontSize: "22px",
    color: "white",
    lineHeight: 1,
    fontWeight: "bold",
  };
}

function timeStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    lineHeight: 1,
    padding: "8px",
    background: "#808080",
    color: "white",
  };
}

export default BoardDueTodayOverdueBadge;
