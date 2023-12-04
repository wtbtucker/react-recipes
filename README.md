# Recipe Vault

Welcome to Recipe Vault, a social media platform for creating, editing, viewing, and deleting recipes. Originally built with vanilla JavaScript, HTML, and CSS, it evolved into a more sophisticated application using React, Bootstrap, and a REST API.

## Overview

Initially, the project faced challenges with a monolithic architecture. Merging front end and back end on a single NodeJS server led to complex routes. The switch to React and Bootstrap brought clarity, enabling the creation of an interactive frontend with distinct components.

## Key Features

- **Recipe Index:** Browse a comprehensive list of recipes.
- **Detail Pages:** View detailed information for each recipe.
- **Dynamic Form:** Create and edit recipes using a dynamic form.

## Challenges and Solutions

### 1. High-Level System Design

- Challenge: Selecting the right technology stack and system design.
- Solution: Evolving expertise and experience clarified these decisions.

### 2. Recipe Form and State Management

- Challenge: Managing state for a form with variable ingredient fields and steps.
- Solution: Database restructuring provided clarity, and using the REST Client extension in VS Code expedited HTTP requests.

### 3. Performance and Security

- Challenge: Choosing between sessions and JWT.
- Solution: Selected JWT for its advantages in storage and server-side termination.

### 4. Version Control and Documentation

- Version Control: Utilized Git with a single branch.
- Documentation: Combined Google Docs, code comments, and meaningful commit messages.

## Technologies Used

- Frontend: React, Bootstrap
- Backend: NodeJS, MongoDB
- Other: JavaScript, bcrypt for password validation

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the frontend and backend separately.

Feel free to explore, contribute, and share your favorite recipes on Recipe Vault!
