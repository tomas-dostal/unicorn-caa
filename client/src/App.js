import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import BoardList from "./BoardList";
import UserProvider from "./provider/UserProvider";
import BoardListProvider from "./provider/BoardListProvider";
import BoardProvider from "./provider/BoardProvider";
import BoardRoute from "./BoardRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <BoardListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<BoardList />} />
                <Route
                  path="boardDetail"
                  element={
                    <BoardProvider>
                      <BoardRoute />
                    </BoardProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
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
    backgroundColor: "#187bcd",
  };
}

export default App;
