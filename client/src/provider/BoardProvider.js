import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { BoardContext } from "../context/BoardContext.js";

function BoardProvider({ children }) {
  const [boardLoadObject, setBoardLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();
  console.log(location);

  const [searchParams] = useSearchParams();

  console.log(searchParams.get("id"));

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setBoardLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/board/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setBoardLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setBoardLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  const value = {
    board: boardLoadObject.data,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export default BoardProvider;
