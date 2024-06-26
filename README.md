1. **Task Manager Application**

This project is a simple Task Manager application built with a React frontend and a Spring Boot backend. The application uses PostgreSQL as the database.

2. **Table of Contents**
   - [Overview](#overview)
   - [Features](#features)
   - [Tech Stack](#tech-stack)
   - [Prerequisites](#prerequisites)
   - [Setup](#setup)
     - [Backend](#backend)
     - [Frontend](#frontend)
   - [Usage](#usage)
   - [License](#license)

3. **Overview**

The Task Manager application allows users to add, view, and manage tasks. The frontend is built with React, while the backend is implemented using Spring Boot. PostgreSQL is used as the database to store the task data.

4. **Features**

- Add a new task
- View the list of tasks
- Manage tasks

5. **Tech Stack**

   **Frontend:**
   - React
   - Material-UI

   **Backend:**
   - Spring Boot
   - PostgreSQL

6. **Prerequisites**

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (for running the React frontend)
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (for running the Spring Boot backend)
- [PostgreSQL](https://www.postgresql.org/download/) (for the database)

7. **Setup**

   **Backend**

   - Clone the repository:
     ```sh
     git clone https://github.com/yourusername/task-manager.git
     cd task-manager/backend
     ```

   - Create the PostgreSQL database:
     ```sh
     psql -U your_postgres_username
     CREATE DATABASE TaskManagerDb;
     ```

   - Update the application properties:
     Update the `application.properties` file in the `src/main/resources` directory with your PostgreSQL credentials:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/TaskManagerDb
     spring.datasource.username=your_postgres_username
     spring.datasource.password=your_postgres_password
     ```

   - Build and run the backend:
     ```sh
     ./mvnw spring-boot:run --username=your_postgres_username --password=your_postgres_password --databasename=TaskManagerDb
     ```

   **Frontend**

   - Navigate to the frontend directory:
     ```sh
     cd ../frontend
     ```

   - Install dependencies:
     ```sh
     npm install
     ```

   - Run the frontend:
     ```sh
     npm start
     ```

8. **Usage**

Once the setup is complete, you can access the application by opening your browser and navigating to `http://localhost:3000`. You can add, view, and manage tasks through the UI.

9. **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
