import User from "../models/user.js";

// Get tasks with status filtering
const getTask = async (req, res) => {
  const { priority, status } = req.query;
  const filter = {};

  if (priority) filter.priority = priority;
  if (status) filter.status = status;

  try {
    const tasks = await User.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create task
const createTask = async (req, res) => {
  const { title, description, priority, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and Description are required!" });
  }

  const taskPriority = priority || "Medium"; 
  const taskStatus = status || "Pending"; // Default to "Pending" if not provided

  try {
    const newUser = new User({ title, description, priority: taskPriority, status: taskStatus });
    await newUser.save();
    res.status(201).json({ message: "Task Created Successfully!!!", task: newUser });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: error.message });
  }
};


// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and Description are required!" });
  }

  try {
    const existingTask = await User.findById(id);

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    const updatedTask = await User.findByIdAndUpdate(
      id,
      { 
        title, 
        description, 
        priority, 
        status, // Update the status
        updatedAt: Date.now() 
      },
      { new: true }
    );

    res.status(200).json({ message: "Task Updated Successfully!!!", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: error.message });
  }
};



// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required!" });
  }

  try {
    const existingTask = await User.findById(id);

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Task Deleted Successfully!!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update task status

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await User.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found!' });
    }

    task.status = status;
    task.updatedAt = Date.now();

    await task.save();
    res.status(200).json({ message: 'Task status updated', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { createTask, getTask, updateTask, deleteTask,updateTaskStatus };
