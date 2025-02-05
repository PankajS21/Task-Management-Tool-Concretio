# Task Management Tool (Frontend)

## Overview
The **Task Management Tool** is a React-based frontend application designed to help users efficiently manage their tasks. Users can create, update, filter, and delete tasks through an intuitive and user-friendly interface. The system integrates with a backend API to handle task data operations.

---

## Functionality

1. **Task Creation**: Add new tasks with details such as title, description, and priority.
2. **Task Updates**: Modify existing task details.
3. **Task Deletion**: Remove tasks from the system.
4. **Task Status Management**: Toggle task statuses between "Pending" and "Completed".
5. **Filtering**: Filter tasks by priority or status.
6. **Dynamic UI**: Responsive and interactive interface for seamless user experience.

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn package manager

### Steps to Setup and Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-management-tool-frontend.git
   cd task-management-tool-frontend/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Assumptions and Limitations

### Assumptions:
- The backend API is hosted locally at `http://localhost:5000`.
- Tasks are fetched, created, updated, and deleted through specific endpoints provided by the backend.
- All tasks must have a title, description, and priority (validation is enforced).

### Limitations:
- No authentication or user-specific task management is implemented.
- The system assumes stable backend availability for all operations.
- Filtering by priority and status works with the assumption that the backend supports these query parameters.

---

## Libraries/Tools Used and Why

1. **React**:
   - Used as the primary framework for building the user interface.
   - Component-based structure for modular and reusable code.

2. **CSS Modules**:
   - Provides scoped styling to avoid class name conflicts.
   - Used for maintaining styles in `task.module.css`.

3. **Bootstrap**:
   - Simplifies the styling of form elements and buttons.
   - Used for quick prototyping and a consistent UI design.

4. **Fetch API**:
   - Used for making HTTP requests to the backend API.

5. **FontAwesome**:
   - Used for icons (e.g., edit and delete icons) to enhance the UI.

---

## Folder Structure

```
-client
   -node_modules   // Dependencies installed via npm
   -public         // Public assets like index.html
   -src
      -components
         -Header.js          // Displays the application header
         -MainContainer.js   // Main task management functionalities
      -images
         -Concretio-white.png // Logo image
      -styles
         -task.module.css    // Scoped styles for the application
      -app.css               // Global styles
      -app.js                // Root component combining Header and MainContent
      -index.css             // Base styling for the app
      -index.js              // Entry point of the application
```

---

## API Endpoints

1. **Fetch Tasks**:
   - **Endpoint**: `GET /api/users`
   - **Description**: Fetches all tasks, optionally filtered by priority and status.

2. **Create Task**:
   - **Endpoint**: `POST /api/users`
   - **Description**: Creates a new task with title, description, and priority.

3. **Update Task**:
   - **Endpoint**: `PUT /api/users/:id`
   - **Description**: Updates an existing task's details.

4. **Delete Task**:
   - **Endpoint**: `DELETE /api/users/:id`
   - **Description**: Deletes a task by ID.

5. **Toggle Task Status**:
   - **Endpoint**: `PUT /api/users/:id/status`
   - **Description**: Toggles a task's status between "Pending" and "Completed".
