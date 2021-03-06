import React from "react";
import "./../styles/App.css";

function App() {
  const [taskContent, setTaskContent] = React.useState("");
  const [taskList, updateTaskList] = React.useState([]);
  const addTask = () => {
    if (taskContent === "") {
      return;
    }
    let taskObj = {
      taskName: taskContent,
      edit: false
    };

    let taskListCopy = [...taskList, taskObj];
    updateTaskList(taskListCopy);
    setTaskContent("");
  };
  const editTask = (index) => {
    let taskListCopy = taskList;
    taskListCopy = taskListCopy.map((task, index2) => {
      if (index2 === index) {
        task.edit = true;
      }
      return task;
    });
    updateTaskList(taskListCopy);
  };
  const deleteTask = (task) => {
    let taskListCopy = taskList;
    taskListCopy = taskListCopy.filter((t) => t.taskName !== task);
    updateTaskList(taskListCopy);
  };
  const saveTask = (index) => {
    let taskListCopy = taskList;
    taskListCopy = taskListCopy.map((task, index2) => {
      if (index2 === index) {
        task.edit = false;
      }
      return task;
    });
    updateTaskList(taskListCopy);
  };
  const editTaskData = (event, index) => {
    let taskListCopy = taskList;
    taskListCopy = taskListCopy.map((task, index2) => {
      if (index2 === index) {
        task.taskName = event.target.value;
      }
      return task;
    });
    updateTaskList(taskListCopy);
  };
  return (
    <div id="main">
      <textarea
        id="task"
        onChange={(event) => setTaskContent(event.target.value)}
        value={taskContent}
      ></textarea>
      <button id="btn" onClick={() => addTask()}>
        Add
      </button>
      <br />
      {taskList.map((task, index) => (
        <div key={"task" + index}>
          <li className="list">
            {!task.edit ? (
              task.taskName
            ) : (
              <div>
                <input
                  className="editTask"
                  value={task.taskName}
                  onChange={(event) => editTaskData(event, index)}
                />
                <button
                  className="saveTask"
                  onClick={() => saveTask(index)}
                  disabled={task.taskName === ""}
                >
                  Save
                </button>
              </div>
            )}
          </li>

          {!task.edit && (
            <div>
              <button className="edit" onClick={() => editTask(index)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => deleteTask(task.taskName)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
