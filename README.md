
# Celebrity Face Detector App

A celebrity face detector app that uses cutting-edge machine learning API called Clarifai for seamless face detection, tracing a box around the face in the image, and recognizing and naming the celebrity. It also has user registration, authentication, and a request counter to track the number of API requests made by the user.

## Tech Stack

**Frontend:** React, Vite

**Backend:** Node, Express, PostgreSQL

**Dependencies:** react-loader-spinner, react-parallax-tilt, react-tsparticles, bcrypt, cors, knex, pg, dotenv, nodemon


## Features


- User Registration: Seamlessly onboard users into your platform.
- User Sign-In: Ensure secure access for registered users.
- Face Detection: Tracing a box around the face in the image, celebrity recognition and naming by analyzing images from the URLs.
- Fully mobile-responsive.



## Demo




https://github.com/Hrithik-C-A/celebrity-face-detector/assets/117261838/c84d7a8f-8a91-49bb-9650-854302b5be97



## Environment Variables

To run this project, 

You will need to add the following environment variables to your .env file in backend directory

**PORT**

```
PORT=5000
```

This environment variable specifies the port that the Express server will run on. In the provided code, the server is configured to listen on port 5000.

**FRONTEND_URI**

```
FRONTEND_URI=http://localhost:5173
```

This environment variable specifies the URL of the frontend application. The provided code uses this URL to set the `origin` option for the CORS middleware.

**PAT**

```
PAT=your_personal_access_token
```

This environment variable is the personal access token that you  will get from [Clarifai website](https://clarifai.com/explore). If you don't have one create an account in the website and get your personal access token.

**DATABASE_URL**

```
DATABASE_URL=postgres://username:password@host:port/database
```

This environment variable specifies the connection string for the PostgreSQL database. The `knex` library uses this connection string to connect to the database.

**DATABASE_DB**

```
DATABASE_DB=your_database_name
```

This environment variable specifies the name of the PostgreSQL database to connect to. The `knex` library uses this database name to connect to the database.

**DATABASE_PW**

```
DATABASE_PW=your_database_password
```

This environment variable specifies the password for the PostgreSQL database. The `knex` library uses this password to connect to the database.

**DATABASE_USER**

```
DATABASE_USER=your_database_username
```

This environment variable specifies the username for the PostgreSQL database. The `knex` library uses this username to connect to the database.

**DATABASE_HOST**

```
DATABASE_HOST=localhost
```

This environment variable specifies the host of the PostgreSQL database. The `knex` library uses this host to connect to the database.


You will also need to add the following environment variable to your .env file in frontend directory

**VITE_BASEURI**

```
VITE_BASEURI=http://localhost:5000
```

This environment variable specifies the base URL for the backend API. The Vite frontend build tool uses this base URL to make requests to the backend API.







## Run Locally

Clone the project

```bash
  git clone https://github.com/Hrithik-C-A/celebrity-face-detector.git
```

Go to the project directory

```bash
  cd celebrity-face-detector
```

Go to the project backend directory, install the dependencies and start the server

```bash
  cd backend

  npm install

  npm run dev
```


Go to the project frontend directory, install the dependencies and start the server

```bash
  cd frontend

  npm install

  npm run dev
```




## Author

- [@Hrithik-C-A](https://github.com/Hrithik-C-A)


## Live link

https://celebrity-face-detector-hrithik-c-a.vercel.app/
## License

Copyright © 2023 [@Hrithik-C-A](https://github.com/Hrithik-C-A).

This project is [MIT](./LICENCE.md) licensed.

