# Task Management Tool

The **Task Management Tool** is a full-stack application designed to simplify task organization and management. It allows users to create, update, filter, and delete tasks through a user-friendly frontend interface and a robust backend API. This tool is perfect for individuals or small teams looking to stay organized and manage their tasks efficiently.

---

## Features

### Backend Features
- **Task Creation**: Add new tasks with the following attributes:
  - **Title**: Task Management Tool.
  - **Description**: A Tool to manage tasks.
  - **Priority**: Task priority (Low, Medium, High).
  - **Status**: Task status (Pending, Completed). Defaults to "Pending".
- **Task Retrieval**:
  - Fetch all tasks from the database.
  - Filter tasks based on **priority** or **status**.
- **Task Update**:
  - Modify existing tasks, including their title, description, priority, and status.
  - Change the status of a task independently.
- **Task Deletion**: Remove tasks by their unique ID.

### Frontend Features
- **User-Friendly Interface**: Provides an intuitive and visually appealing UI to manage tasks.
- **Real-Time Feedback**: Dynamically updates the UI after task creation, updates, or deletion.
- **Filtering Options**:
  - Filter tasks by **priority** (Low, Medium, High).
  - Filter tasks by **status** (Pending, Completed).
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Getting Started

### Prerequisites
Ensure the following are installed on your system:
- **Node.js**: Version 14 or higher.
- **npm**: Installed with Node.js.
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas).

---

### Setting Up the Project

#### Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
