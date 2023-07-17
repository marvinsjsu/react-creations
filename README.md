# React Creations

This is the back-end application that supports features for the MyMoments mobile app.


## Table of Contents

- [React Creations](#react-creations)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
    - [future features](#future-features)
      - [server-side](#server-side)


## Project Description

This project provides the endpoints to be used by the [MyMoments mobile app](https://github.com/marvinsjsu/my-moments), which is currently in active development.  This application supports the user registration flow, authentication, and eventually the CRUD operations for `Post`, `Quote`, and `User` entities.


## Installation

Clone this repo via `git clone git@github.com:marvinsjsu/react-creations.git`.
In the project directory, run `nvm use`.

To run our server, from our project directory, follow these steps:
- `npm install`
- `npm run dev`

This will start our server on `localhost:3001`.


## Usage

For dev changes made on the schema, run `npx prisma migrate dev`.

For staging/prod changes made on the schema, run `npx prisma migrate deploy`.

Via Postman or Thunder Client, we can test our CRUD operations for the following endpoints:
- `/register`
- `/user`
- `/post`

PostgreSQL database is hosted on Render and can be accessed via Postico and managed via `https://dashboard.render.com/d/dpg-che8gfu7avja5mbvemdg-a`.

For tests, run `npm test`


## Features

Currently supported features, include:

- user registration flow
  - the user creation flow is initiated by sending `firstName` and `email` in a `POST` request body to `/register`
  - an email with the verification code will be sent to the user via SendGrid
  - the user sends the verification code as `token` in a `POST` request body to `/verify`
  - once verified, user will be redirected to user intake form on mobile app; the data from this form will be sent via `POST` request to `/user` and will create a new user account and a JWT token is created and sent back in the response
  - the mobile app attaches the JWT as part of Bearer authentication

- CRUD operations on `/post` 

### future features
#### server-side
- tests via Jest and SuperTest
- move `Post` API behind authentication
- support of CRUD operations for `Quote`, and future entities (`Workout`, `Habit`)
- support for search and pagination on `Post`
  