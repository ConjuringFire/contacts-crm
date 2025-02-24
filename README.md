# Contact Management Application

This is a React-based contact management application with a Laravel API backend. It allows users to create, read, update, and delete contacts.

## Features

-   **Create Contacts:** Add new contacts with name, phone number (area code and phone), and email.
-   **Read Contacts:** View a list of all contacts with search functionality.
-   **Update Contacts:** Edit existing contact information.
-   **Delete Contacts:** Remove contacts with confirmation prompts.
-   **Call Contacts:** Initiate a call action (simulated).
-   **Search:** Search contacts by name, phone, or email.
-   **Responsive Design:** The application is designed to be responsive and work on various screen sizes.
-   **Redux State Management:** Uses Redux for centralized state management.
-   **Ant Design UI:** Utilizes Ant Design for a clean and consistent user interface.
-   **Axios for API Calls:** Uses Axios for efficient and reliable API requests.
-   **React Router:** Uses React Router for navigation.

## Technologies Used

-   **Frontend:**
    -   React
    -   TypeScript
    -   Redux Toolkit
    -   React Redux
    -   React Router DOM
    -   Ant Design
    -   Axios
    -   Jest and React Testing Library (for testing)
-   **Backend:**
    -   Laravel
    -   PHP

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js and npm (or yarn)
-   PHP and Composer
-   MySQL or another database (configured in Laravel)

## Setup

### Backend (Laravel API)

1.  **Clone the repository:**

    ```bash
    git clone <your-backend-repository-url>
    cd <your-backend-directory>
    ```

2.  **Install Composer dependencies:**

    ```bash
    composer install
    ```

3.  **Copy `.env.example` to `.env` and configure database settings:**

    ```bash
    cp .env.example .env
    ```

    Modify the `.env` file with your database credentials.

4.  **Generate application key:**

    ```bash
    php artisan key:generate
    ```

5.  **Run database migrations:**

    ```bash
    php artisan migrate
    ```

6.  **Start the Laravel development server:**

    ```bash
    php artisan serve
    ```

### Frontend (React Application)

1.  **Clone the repository:**

    ```bash
    git clone <your-frontend-repository-url>
    cd <your-frontend-directory>
    ```

2.  **Install npm dependencies:**

    ```bash
    npm install
    ```

3.  **Start the React development server:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Testing

### Frontend (React)

1.  **Run Jest tests:**

    ```bash
    npm test
    ```

### Backend (Laravel)

1.  **Run PHPUnit tests:**

    ```bash
    php artisan test
    ```

## API Endpoints

-   `GET /api/contacts`: Get all contacts.
-   `GET /api/contacts/{id}`: Get a specific contact.
-   `POST /api/contacts`: Create a new contact.
-   `PUT /api/contacts/{id}`: Update an existing contact.
-   `DELETE /api/contacts/{id}`: Delete a contact.
-   `GET /api/contacts/search?term={term}`: Search contacts.
-   `POST /api/contacts/{id}/call`: Simulate calling a contact.

## Contributing

Feel free to contribute to this project. Fork the repository, create a new branch, and submit a pull request.

## License

[MIT](LICENSE)