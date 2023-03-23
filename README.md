![Typescript](https://img.shields.io/badge/-TypeScript-007acc?logo=typescript&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-339933.svg?style=for-the-badge&logo=Node%2Ejs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white)
![Socket.io](https://img.shields.io/badge/socket.io-010101.svg?style=for-the-badge&logo=Socket%2Eio&logoColor=white)

<h1>Chat App MERN</h1>
A Real Time Chat Application built using Typescript, React, Express, Mongoose, Socket.io.

## Index

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Structure](#structure)

## Demo

<h3 name="demo">Live <a href="https://chatapp-vo-huy-khoa.vercel.app/">Chat App</a></h3>
<!-- https://ezgif.com/ -->
<br>
<img src="https://user-images.githubusercontent.com/78124749/223079377-2d9426ef-b157-4b80-a6b7-facceff67f79.gif" width="100%" height="550" alt="chat app" />
<br>

## Features<a name="features"></a>

- Use Express to build the backend.
- Use React to build the frontend.
- Authenticates via username and password.
- Real-time communication between a client and a server using [Socket.io](https://github.com/socketio/socket.io).
- Uses [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) for storing and querying data.

## Installation<a name="installation"></a>

### Running Locally

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone repository:

   ```
   $ git clone https://github.com/Vo-Huy-Khoa/Chat_App_MERN.git
   $ cd Chat_App_MERN
   ```

   Run Backend:

   ```bash
   cd backend
   npm i
   npm run dev
   ```

   Run Frontend:

   ```bash
   cd frontend
   npm i
   npm run start
   ```

## How It Works<a name="how-it-works"></a>

#### MongoDB

You need to create a database on MongoDB, then create a database user, get the `MongoDB URI`, and assign it to `dbURI`.

### Database<a name="database"></a>

Mongoose is used to interact with a MongoDB.

#### Schemas

There are two schemas; users and rooms.

Each user has a username, password,and picture. If the user is logged via username and password, and the if logged in via a social account, then the password will be null.

### Models<a name="models"></a>

Each model wraps Mongoose Model object, overrides and provides some methods.

### Sockets<a name="sockets"></a>

Having an active connection opened between the client and the server so client can send and receive data. This allows real-time communication using sockets. This is made possible by [Socket.io](https://github.com/socketio/socket.io).

The client starts by connecting to the server through a socket (maybe also assigned to a specific namespace) . Once connections is successful, client and server can emit and listen to events.

## Structure of the project: <a name='structure'></a>

### BackEnd

```text
src
|
├── configs
|   └── db.ts
├── controllers
|   └── UserController.ts
│   └── MessageController.ts
├── middleware
|   └── auth.ts
│   └── token.ts
├── models
|   └── User.ts
|   └──Message.ts
├── routes
|   └── index.ts
└── server.ts
```

### FrontEnd

```text
src
├── assets
|   └── icons
│   └── scss
├── components
│   └── Account.tsx
│   └── Image.tsx
│   └── index.ts
├── hooks
│   └── useDebounce
│   └── index
├── layouts
│   └── auth.tsx
│   └── dashboard.tsx
│   └── index.ts
├── pages
│   └── auth
│       └── sign-in.tsx
│       └── sign-up.tsx
│       └── index.ts
│   └── dashboard
│       └── home.tsx
│       └── notification.tsx
│       └── sidebar.tsx
│       └── index.ts
├── redux
│   └── actions
│       └── sign-in.tsx
│       └── index.ts
│   └── reducers
│       └── visibility.ts
│       └── rootReducer.ts
│   └── initState.ts
│   └── store.ts
├── services
│   └── auth.ts
│   └── dashboard.ts
│   └── index.ts
├── socket.tsx
├── route.tsx
├── App.tsx
└── index.tsx

```

<!-- Folder structure is based on productivity and some personal preferences:

src
├── App.css                 * Main app styles.
├── App.tsx                 * Main app component.
├── api                     * Abstractions for making API requests
├── assets                  * Assets that are imported into your components(images, custom svg, etc).
│   └── ...
├── components              * Components of the projects that are not the main views.
│   └── ui                  * Generic and reusable across the whole app. Presentational components eg. Buttons, Inputs, Checkboxes.
│   └── layout              * Unique and one time use components that will help with app structure.
│   └── <domain component>  * Belong to a specific domain. Reusable in different pages.
│   └── ...
├── plugins                 * Init and config plugins(moment, material-ui, adal, etc).
│   └── ...
├── index.tsx               * Entry point of the application.
├── services                * All the common services. e.g. Authentication, hubs, etc.
├── store                   * The Redux action types in action-type.ts, reducers, selectors and main store in the sub-folders.
│   ├── index.ts
│   └── middlewares         * Store middlewares.
│   └── sagas               * Saga files in case of redux-saga.
│   └── modules             * Store modules/ducks structure.
│       └── smallModule.ts  * Small modules can contain actions, action types, reducers and selectors in the same file.
│       └── bigModule       * Big modules should be composed by separated files for actions, action types, reducer and selectors.
│           └── index.ts
│           └── actions.ts
│           └── ...
├── styles/theme            * All common styles (css) or theme (sass, styled-components).
├── utils                   * Functions (for tests, for regex value testing, constants or filters.)
│   └── ...
├── pages                   * Routed components that represents pages(Presentational Components Only).
│   └── ...
└── .vscode                 * VS Code workspace settings to work with ESLint rules and formatting
                              (you can also lint or fix on save 😉). -->
