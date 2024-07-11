# Focus-List

## Overview

This Focus-List App is a web application designed to help users manage their tasks effectively. The app allows users to add, edit, and categorize tasks into different stages such as "To Do", "Doing", and "Done". Built with modern web technologies, it provides a seamless user experience.

## Features

- **Add Task**: Users can add new tasks with a title, description, and category.
- **Edit Task**: Users can edit the details of existing tasks.
- **Task Categories**: Tasks are categorized into "To Do", "Doing", and "Done".
- **Responsive Design**: The app is fully responsive and works on all device sizes.
- **Real-time Updates**: Tasks are updated in real-time without needing to refresh the page.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB**: A NoSQL database for storing task data.
- **Remixicon**: Icon library for providing icons.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/EricHerdian/focus-list.git
    cd focus-list
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MongoDB**:
    - Make sure you have MongoDB installed and running.
    - Open the `utils/database.ts` file and replace the MongoDB connection URL with your own:
      ```typescript
      const url = "your-mongodb-connection-string";
      ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Usage

- **Adding a Project**:
  - Click on the arrow on the sidebar.
  - Click on plus icon.
  - Fill in the project name and click arrow sign next to it.

- **Delete a Project**:
  - Click on the arrow on the sidebar.
  - Hover over a project and click on the bin icon.
  - Confirmation.

- **Adding a Task**:
  - Click on the "+ Add a task" button.
  - Fill in the task details and click "Add".
 
- **Delete a Task**:
  - Hover over a task and click on the bin icon.
  - Confirmation.

- **Editing a Task**:
  - Hover over a task and click on the settings icon.
  - Modify the task details and click "Update".

- **Categorizing Tasks**:
  - Hover over a task and click on the arrow left icon to move task from "To Do" > "Doing" > "Done".
  - Confirmation.
