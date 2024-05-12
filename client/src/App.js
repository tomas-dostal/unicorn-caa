import {BrowserRouter, Route, Routes} from "react-router-dom";

import Layout from "./Layout";
import BoardList from "./BoardList";
import UserProvider from "./provider/UserProvider";
import BoardListProvider from "./provider/BoardListProvider";
import BoardProvider from "./provider/BoardProvider";
import BoardRoute from "./BoardRoute";
import TaskList from "./TaskList";
import TaskProvider from "./provider/TaskProvider";
import TaskRoute from "./TaskRoute";
import TaskListProvider from "./provider/TaskListProvider";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <BoardListProvider>
          <TaskListProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout/>}>
                  <Route index element={<BoardList/>}/>
                  <Route
                    path="boardDetail"
                    element={
                      <BoardProvider>
                        <BoardRoute/>
                      </BoardProvider>
                    }
                  />
                  <Route path="taskList" element={<TaskList/>}/>
                  <Route
                    path="taskDetail/:taskId"
                    element={
                      <TaskProvider>
                        <TaskRoute/>
                      </TaskProvider>
                    }
                  />
                  <Route path="*" element={"not found"}/>
                </Route>
              </Routes>
            </BrowserRouter>
          </TaskListProvider>
        </BoardListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#1b1b1b",
  };
}

export default App;
