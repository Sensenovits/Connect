# Connect

## Simple Social Media Platform

Connect is a basic social media platform built using the MERN stack (MongoDB, Express.js, React, Node.js). This project is designed to be a simplified version of social media platforms like Twitter or Facebook, focusing on core functionalities and serving as a learning resource for full-stack web development.

## Features

* **User Authentication:**  Users can register, log in, and log out securely.
* **Post Creation:** Users can create and share text-based posts with the community.
* **Like Functionality:** Users can like posts from other users to show appreciation.
* **Comment System:** Users can comment on posts to engage in discussions and share their thoughts.
* **User Profiles:** Each user has a profile page displaying their posts and basic information.
* **Following System:** Users can follow other users to curate their news feed and stay updated with their favorite content creators.
* **News Feed:** A central feed displaying posts from users that the logged-in user follows, ensuring a personalized content experience.

## Technologies Used

* **Frontend:**
    * **React:**  A JavaScript library for building user interfaces, providing a component-based architecture and efficient UI updates.
* **Backend:**
    * **Node.js:**  A JavaScript runtime environment that allows running JavaScript on the server-side.
    * **Express.js:**  A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* **Database:**
    * **MongoDB:**  A NoSQL database that stores data in flexible, JSON-like documents, making it suitable for applications with evolving data structures.
* **Authentication:**
    * **JSON Web Tokens (JWT):** For secure user authentication and authorization, ensuring only authenticated users can access protected resources.
* **Other:**
    * **HTML, CSS, JavaScript:**  The foundational technologies for web development, used for structuring, styling, and adding interactivity to the application.

## Getting Started

To run Connect locally and explore its features, follow these steps:

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js and npm:**  Node.js is required to run both the frontend and backend. npm (Node Package Manager) comes bundled with Node.js and is used to manage project dependencies. You can download them from [nodejs.org](https://nodejs.org/).
* **MongoDB:** MongoDB is the database for this application. You need to have MongoDB installed and running. You can download MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community) and follow the installation instructions for your operating system.

### Installation

1. **Clone the repository:**
   Start by cloning the Connect repository to your local machine using Git:

   ```bash
   git clone https://github.com/Sensenovits/Connect.git
Use code with caution.
Markdown
Navigate to the project directory:
Change your current directory to the cloned repository:

cd Connect
Use code with caution.
Bash
Install server dependencies:
Navigate to the server directory and install the required Node.js packages:

cd server
npm install
Use code with caution.
Bash
Install client dependencies:
Go back to the root directory and then navigate to the client directory to install frontend dependencies:

cd ../client
npm install
Use code with caution.
Bash
Configure Environment Variables:
You need to set up environment variables for both the server and client applications. Create .env files in both the server and client directories and add the following configurations:

Server .env (server/.env):

PORT=5000  # You can change the port if needed
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING  # Replace with your MongoDB connection string
JWT_SECRET=YOUR_JWT_SECRET_KEY #  Replace with a strong, random secret key for JWT
Use code with caution.
Important: Replace YOUR_MONGODB_CONNECTION_STRING with your actual MongoDB connection string. If you are running MongoDB locally with default settings, it might look like mongodb://localhost:27017/connect_db. Also, replace YOUR_JWT_SECRET_KEY with a strong, randomly generated secret key. This key is used to sign JWTs for authentication.

Client .env (client/.env):

REACT_APP_API_BASE_URL=http://localhost:5000  #  Base URL for API requests, should match your server URL
Use code with caution.
Ensure REACT_APP_API_BASE_URL points to the address where your backend server will be running. If you are using the default port 5000 for the server, this configuration should work as is.

Run the development servers:
From the root directory of the project, you can run the following command to start both the client and server development servers concurrently:

npm run dev
Use code with caution.
Bash
This command utilizes concurrently (defined in the root package.json) to start the server on one port and the React development server on another.

Access the application:
Once both servers are running, you can access the Connect application in your web browser at:

http://localhost:3000
Use code with caution.
Usage
After successfully running the application, you can explore the following functionalities:

Registration and Login: Create a new account or log in with existing credentials to access the platform.

Browse News Feed: View a personalized news feed populated with posts from users you follow.

Create Posts: Share your thoughts, ideas, or updates with the community by creating new text-based posts.

Engage with Posts: Like posts that you find interesting or valuable, and leave comments to participate in conversations.

User Profiles: Visit user profiles to see their posts and get to know other members of the community.

Follow Users: Build your personalized feed by following users whose content you enjoy.

Contributing
Contributions to Connect are highly encouraged! If you have ideas for improvements, new features, or bug fixes, please feel free to contribute. Here's how you can contribute:

Fork the repository: Fork the Connect repository to your own GitHub account.

Create a branch: Create a new branch with a descriptive name for your contribution (e.g., feature/add-dark-mode or fix/typo-in-readme).

Make your changes: Implement your changes, ensuring the code is well-documented and follows the project's coding style.

Commit your changes: Commit your changes with clear and concise commit messages.

Push to your fork: Push your branch to your forked repository.

Submit a pull request: Create a pull request from your branch to the main Connect repository.

Please ensure your contributions align with the project's goals and coding standards.

License
This project is licensed under the MIT License - see the LICENSE file for details.

MIT License

Copyright (c) [Year] [Sensenovits]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.