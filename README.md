## Implemented Features

I have implemented all the logic mentioned below, except for **Search**, **Sort**, and **Filter**.

### Validations:
- **Textbox Validation:** I used JavaScript and regex for client-side validation.
- **Login Validation:** On login, the credentials are checked. If valid, the user is redirected to the Dashboard; otherwise, an "invalid login details" alert is shown.
- **Manage User Name on Dashboard:** User data is stored and managed via local storage.
- **Field Validations:** 
  - **Email Validation:** Ensures a valid email format.
  - **Numeric Validation:** Ensures only numeric values are entered where required.
  - **Email Duplicate Check:** Checks for duplicate emails.
  - **File Upload Validation:** Only allows uploading of `.jpg` and `.png` files.

### Missing Features:
- **Search:** Not implemented.
- **Filter:** Not implemented.
- **Sorting:** Not implemented.

### Other Features:
- **Paging on Grid:** Pagination implemented for better navigation.
- **Active/Deactive Status:** User statuses can be toggled.
- **Edit and Delete:** Options to edit or delete user records.
- **Sorting:** Sorting on fields like Name, Email, ID, and Date are pending.

---

## Backend Setup

1. **Navigate to the Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the Backend directory and add the required JWT (JSON Web Token) variable:
   ```
   JWT_SECRET=your_secret_key_here
   ```

4. **Start the Backend server:**
   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:<port>`.

## Frontend Setup

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the Frontend server:**
   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:<port>`.

## Additional Notes
- Ensure you have the necessary tools installed (e.g., Node.js, npm).
- Replace `JWT_SECRET` in the `.env` file with your actual JWT secret key.
