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
      edit: false,
      canSave: true
    };

    let taskListCopy = taskList;
    taskListCopy = taskListCopy.concat(taskObj);
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
        if (event.target.value === "") {
          task.canSave = false;
        } else {
          task.canSave = true;
        }
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
      <button id="btn" onClick={addTask}>
        Add
      </button>
      {taskList.map((task, index) => (
        <div className="list" key={task.taskName}>
          <textarea
            disabled={!task.edit}
            value={task.taskName}
            onChange={(event) => editTaskData(event, index)}
          ></textarea>
          {!task.edit && (
            <button className="editTask" onClick={() => editTask(index)}>
              Edit
            </button>
          )}
          {!task.edit && (
            <button
              className="deleteTask"
              onClick={() => deleteTask(task.taskName)}
            >
              Delete
            </button>
          )}
          {task.edit && (
            <button
              className="saveTask"
              onClick={() => saveTask(index)}
              disabled={!task.canSave}
            >
              Save
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
