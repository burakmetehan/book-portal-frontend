Book Portal project was done during the internship at OBSS. This repo is the front-end of the Book Portal App.

### Book Portal App:

- It has admin and user type log-in system.
- New users and books can be added to database.
- Adding, deleting and updating can be done on both users and books.
- Users can add books to their read and favorite lists.

### Usage

- ```npm install```
- Add .env files that includes the following:
    - **Main API URL**
        - REACT_APP_API_URL
    - **Auth Service**
        - REACT_APP_AUTH_URL
        - REACT_APP_LOGIN_URL
    - **Book List Service**
        - REACT_APP_FAV_URL
        - REACT_APP_READ_URL
    - **Book Service**
        - REACT_APP_BOOKS_URL
        - REACT_APP_BOOKS_URL_NO_PAGE
    - **User Service**
        - REACT_APP_USERS_URL
        - REACT_APP_USERS_URL_NO_PAGE
