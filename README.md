# Photography Contest Project API Documentation

This API allows users to register, log in, manage contests, and submit blog posts. Admins have special privileges to manage user roles, approve blog posts, and control contest activities. Contest holders can manage contest details and process prize payments. Below is the list of available API endpoints.

---
### Frontend
## https://photography-frontend-eta.vercel.app/
### Backend
## https://photography-backend-psi.vercel.app/

### How to run locally this project locally

- Go MongoDb Atlas
- Create database
- Go to `network > accessList > click ADD IP ADDRESS > 0.0.0.0/0 (includes your current IP address)`
- Go to `database > connect > drivers > copy mongodb > ( mongodb+srv://<username_Your_database>:<password_Your_database>@cluster0.j1ployz.mongodb.net/?retryWrites=true&w=majority )`

### Clone Project

`git clone https://github.com/aonikpaulalock/Photography_Contest_Server.git`

### Go to the project directory

`cd Photography_Contest_Server`

### Install dependencies

`npm install or i`

### Setup .env File root folder

- PORT=`Your_Port`
- DATABASE_URL= `( mongodb+srv://<Your_Databse_Username>:<Your_Database_Password>@cluster0.j1ployz.mongodb.net/Your_Collection_Name?retryWrites=true&w=majority )`

### Start the server on the terminal

`npm run dev`

### Open your postman

## **Authentication**

### **User Registration**
- **Method:** POST
- **Endpoint:** `/auth/register`
- **Description:** Registers a new user with valid details and enforces password validation.

### **User Login**
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Description:** Authenticates a user based on the provided credentials.

### **Change Password**
- **Method:** PUT
- **Endpoint:** `/auth/change-password`
- **Authentication:** Required
- **Description:** Allows the authenticated user to change their password.

### **Reset Password**
- **Method:** POST
- **Endpoint:** `/auth/reset-password`
- **Description:** Sends a password reset link to the registered email.

---

## **Admin Operations**

### **Fetch Users**
- **Method:** GET
- **Endpoint:** `/admin/users?name=<string>&email=<string>`
- **Authentication:** Required
- **Description:** Fetches a list of users with optional filters for name and email.

### **Promote User Role**
- **Method:** PUT
- **Endpoint:** `/admin/users/:id/role`
- **Authentication:** Required
- **Description:** Promotes a user to the "Admin" or "Contest Holder" role.

### **Approve Blog Post**
- **Method:** PUT
- **Endpoint:** `/admin/blogs/:id/approve`
- **Authentication:** Required
- **Description:** Approves a user-written blog post.

### **Block User**
- **Method:** PUT
- **Endpoint:** `/admin/users/:id/block`
- **Authentication:** Required
- **Description:** Blocks a user from logging in or interacting with the platform.

### **Create Contest**
- **Method:** POST
- **Endpoint:** `/admin/contests`
- **Authentication:** Required
- **Description:** Creates a new contest with provided details.

### **Fetch Contests**
- **Method:** GET
- **Endpoint:** `/admin/contests`
- **Authentication:** Required
- **Description:** Fetches all contests.

---

## **Contest Holder Operations**

### **Create Contest**
- **Method:** POST
- **Endpoint:** `/contest-holder/contests`
- **Authentication:** Required
- **Description:** Creates a contest with necessary details.

### **View Contest Participants**
- **Method:** GET
- **Endpoint:** `/contest-holder/contests/:id/participants`
- **Authentication:** Required
- **Description:** Views all participants in a specific contest.

### **Manage Contest Status**
- **Method:** PUT
- **Endpoint:** `/contest-holder/contests/:id/manage`
- **Authentication:** Required
- **Description:** Updates the contest status, such as closing the contest after selecting a winner.

### **Make Payment to Winner**
- **Method:** POST
- **Endpoint:** `/contest-holder/payments`
- **Authentication:** Required
- **Description:** Processes the prize payment to a contest winner.

---

## **Blog Operations**

### **View All Blogs**
- **Method:** GET
- **Endpoint:** `/blogs`
- **Description:** Fetches all user-submitted blog posts.

### **Write Blog Post**
- **Method:** POST
- **Endpoint:** `/blogs`
- **Authentication:** Required
- **Description:** Allows a user to submit a blog post for approval.

### **Like a Blog Post**
- **Method:** POST
- **Endpoint:** `/blogs/:id/like`
- **Authentication:** Required
- **Description:** Likes a blog post.

### **Comment on a Blog Post**
- **Method:** POST
- **Endpoint:** `/blogs/:id/comment`
- **Authentication:** Required
- **Description:** Adds a comment to a blog post.

### **View Blog Likes**
- **Method:** GET
- **Endpoint:** `/blogs/:id/likes`
- **Description:** Views users who liked a specific blog post.

### **View Blog Comments**
- **Method:** GET
- **Endpoint:** `/blogs/:id/comments`
- **Description:** Views all comments on a specific blog post.

---

## **Contest Operations (User)**

### **View Available Contests**
- **Method:** GET
- **Endpoint:** `/contests`
- **Description:** Fetches the list of available contests.

### **Participate in a Contest**
- **Method:** POST
- **Endpoint:** `/contests/:id/participate`
- **Authentication:** Required
- **Description:** Allows a user to join a contest.

---

## **Miscellaneous**

### **View Contest Holder Details**
- **Method:** GET
- **Endpoint:** `/contest-holder/:id`
- **Description:** Fetches the profile and details of a contest holder.

---

## **Authentication and Authorization**

- **JWT Token:** All authenticated endpoints require a valid JWT token. 
- **Admin Access:** Certain endpoints require admin privileges.
- **User Roles:** Admins, contest holders, and regular users have different levels of access.



❤️ Happy Coding
❤️ Happy Life
