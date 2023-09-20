
# User Form Application

Create a single/multi-page application for a user form with the following fields:

- First Name (Not Null, Minimum 5 characters)
- Last Name (Not Null, Minimum 5 characters)
- Email Id (Email validation)
- Mobile No (Country code picker + Mobile number validation)
- Address 1 (Mandatory)
- Address 2 (Optional)
- State (Auto-complete search and multi-select based on the selected country)
- Country (Multi-select dropdown with search option)
- Zip Code (Number validation)

## Features

- **Create User:** Create a new user with the specified fields.

- **View List of Users:** Display a list of all users with basic details.

- **Edit and Update User:** Modify and update user information with validation.

- **Delete User:** Remove a user record.

## Technologies & Frameworks

- **Frontend:**
  - React
  - NextJS (for server-side rendering)
  - MaterialUI (or Tailwind for styling)

- **Backend:**
  - NodeJS (for server functionality)
  - ExpressJS (for api creation)

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone <repository-url>

2. Navigate to the project directory:

    ```shell
    cd Novelti

3. Install the dependencies for both the frontend and backend:

    ```shell
   # Install frontend dependencies
   cd novelti
   npm install

   # Install backend dependencies (if applicable)
   ```shell
   cd ../server
   npm install

## Usage   

1. Start the frontend development server:

       # Inside the frontend directory
        cd novelti
        npm run dev

2. Start the backend server:

       # Inside the backend directory
        cd server
        npm start

3. Access the application in your web browser:

   http://localhost:3000
        
4. Begin using the user form application to create, view, edit, and delete user records.

## Contributing

Contributions to this project are welcome. Please follow the contributing guidelines for more information.

## License

This project is licensed under the MIT License.

