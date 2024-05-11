import { useEffect, useState } from "react";
import { BoardListContext } from "../context/BoardListContext.js";

function BoardListProvider({ children }) {
  const [boardLoadObject, setBoardLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setBoardLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/board/list`, {
      method: "GET",
    });
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

  async function handleCreate(dtoIn) {
    setBoardLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/board/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBoardLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBoardLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setBoardLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/board/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBoardLoadObject((current) => {
        const boardIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[boardIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBoardLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setBoardLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/board/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBoardLoadObject((current) => {
        const boardIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(boardIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBoardLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleAttendance(dtoIn) {
    setBoardLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/attendance/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      await handleLoad();
    } else {
      setBoardLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: boardLoadObject.state,
    boardList: boardLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete, handleAttendance },
  };

  return (
    <BoardListContext.Provider value={value}>
      {children}
    </BoardListContext.Provider>
  );
}

export default BoardListProvider;
