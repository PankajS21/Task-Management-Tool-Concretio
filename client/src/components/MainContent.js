import React, { useEffect, useState } from "react";
import styles from "../styles/task.module.css";

export default function MainContent() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [filterPriority, filterStatus]);

  const fetchTasks = async () => {
    const url = `http://localhost:5000/api/users?priority=${filterPriority}&status=${filterStatus}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log("Error while fetching tasks", error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Failed to update task status");
      }
      fetchTasks();
    } catch (error) {
      console.log("Error while updating task status", error);
    }
  };

  const handleCreateTask = async () => {
    if (!title || !description) {
      alert("Kindly add both title and description");
      return; // Ensure no request is made if validation fails
    }
    const taskData = { title, description, priority };
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) {
        throw new Error("Failed to create task");
      }
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log("Error while creating task", error);
    }
  };

  const handleUpdateTask = async () => {
    if (!selectedTask || !title || !description) {
      alert("Kindly add both title and description");
      return; // Ensure no request is made if validation fails
    }
    const updatedTask = { title, description, priority };
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${selectedTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      setTitle("");
      setDescription("");
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      console.log("Error while updating task", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
      fetchTasks();
    } catch (error) {
      console.log("Error while deleting task", error);
    }
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Task Title
          </label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">
            Task Description
          </label>
          <textarea
            className="form-control"
            id="taskDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write Task Description!!!"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Task Priority
          </label>
          <select
            className="form-control"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          {selectedTask ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateTask}
            >
              Update Task
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateTask}
            >
              Create Task
            </button>
          )}
        </div>
      </div>

      <div className={styles.filterParent}>
        <div className={styles.filterContainer}>
          <label>Filter by Priority: </label>
          <select
            className={`${styles.priorityFilter} form-control`}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className={styles.filterContainer}>

            <label>Filter by Status: </label>
            <select
              className={`${styles.priorityFilter} form-control`}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
      </div>
      <div className={styles.tableParent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Task Priority</th>
              <th>Task Created On</th>
              <th>Task Updated On</th>
              <th>Task Status</th>
              <th className={styles.action_heading}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.title.length > 20
                      ? `${item.title.substring(0, 20)}...`
                      : item.title}
                  </td>
                  <td>
                    {item.description.length > 30
                      ? `${item.description.substring(0, 30)}...`
                      : item.description}
                  </td>
                  <td>{item.priority}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{new Date(item.updatedAt).toLocaleString()}</td>
                  <td>
  <button
    type="button"
    className={`${styles.toggleStatusButton} ${
      item.status === "Pending" ? styles.pendingButton : styles.completedButton
    }`}
    onClick={() => handleToggleStatus(item._id, item.status)}
  >
    {item.status === "Pending" ? "Mark as Completed" : "Mark as Pending"}
  </button>
</td>


                  <td className={styles.editAndDelete}>
                    <button
                      type="button"
                      className={styles.editButton}
                      onClick={() => {
                        setTitle(item.title);
                        setDescription(item.description);
                        setPriority(item.priority);
                        setSelectedTask(item);
                      }}
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => handleDeleteTask(item._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No tasks found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
