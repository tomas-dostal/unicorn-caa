import { useEffect, useState } from "react";
import { TaskListContext } from "../context/TaskListContext.js";

function TaskListProvider({ children }) {
  const [taskLoadObject, setTaskLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/task/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setTaskLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setTaskLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTaskLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/task/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskLoadObject((current) => {
        const taskIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[taskIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTaskLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/task/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskLoadObject((current) => {
        const taskIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(taskIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTaskLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: taskLoadObject.state,
    taskList: taskLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
}

export default TaskListProvider;
