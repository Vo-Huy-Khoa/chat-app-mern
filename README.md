<h1>Chat App MERN</h1>
[![Dependency Status](https://www.versioneye.com/user/projects/57d746d1df40d0004a4a9e21/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57d746d1df40d0004a4a9e21)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/OmarElGabry/chat.io/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/OmarElGabry/chat.io/?branch=master)
[![Code Climate](https://codeclimate.com/github/OmarElGabry/chat.io/badges/gpa.svg)](https://codeclimate.com/github/OmarElGabry/chat.io)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FOmarElGabry%2Fchat.io.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FOmarElGabry%2Fchat.io?ref=badge_shield)

A Real Time Chat Application built using Node.js, React,js Express, Typescript, Mongoose, Socket.io.

## Index
+ [Demo](#demo)
+ [Features](#features)
+ [Installation](#installation)
+ [How It Works](#how-it-works)
+ [Structure](#structure)

## Demo
<h2 name="demo"><a href="https://mern-vo-huy-khoa.vercel.app/">Live Demo</a></h2>

## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Manages Sessions using [express-session](https://github.com/expressjs/session) package.
+ Authenticates via username and password using [Passport](https://github.com/jaredhanson/passport).
+ Real-time communication between a client and a server using [Socket.io](https://github.com/socketio/socket.io).
+ Uses [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) for storing and querying data.
+ Stores session in a [MongoDB](https://github.com/mongodb/mongo) using [connect-mongo](https://github.com/kcbanner/connect-mongo); a MongoDB-based session store.


## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
1. Clone or Download the repository

	```
	$ git clone https://github.com/Vo-Huy-Khoa/Chat_App_MERN.git
	$ cd Chat_App_MERN
	```
    Run Backend:

    ```bash
    cd backend
    npm install
    npm run dev
    ```

    Run Frontend:

    ```bash
    cd frontend
    npm install
    npm run start
    ```
## How It Works<a name="how-it-works"></a>

#### MongoDB
You need to create a database on MongoLab, then create a database user, get the `MongoDB URI`, and assign it to `dbURI`.

### Database<a name="database"></a>
Mongoose is used to interact with a MongoDB that's hosted by MongoLab. 

#### Schemas
There are two schemas; users and rooms. 

Each user has a username, passowrd, social Id, and picture. If the user is logged via username and password, then social Id has to be null, and the if logged in via a social account, then the password will be null.

Each room has a title, and array of connections. Each item in the connections array represents a user connected through a unique socket; object composed of _{userId + socketId}_. Both of them together are unique.

### Models<a name="models"></a>
Each model wraps Mongoose Model object, overrides and provides some methods. There are two models; User and Room.

### Sockets<a name="sockets"></a>
Having an active connection opened between the client and the server so client can send and receive data. This allows real-time communication using TCP sockets. This is made possible by [Socket.io](https://github.com/socketio/socket.io).

The client starts by connecting to the server through a socket(maybe also assigned to a specific namespace). Once connections is successful, client and server can emit and listen to events. 


## Structure of the project: <a name='structure'></a>

### BackEnd

```text
src
|
├── configs
|   ├── index.ts
│   └── ...
├── controllers
|   ├── UserController.ts
│   └── ...
├── models
|   ├── User.ts
│   └── ...
├── routes
|   ├── index.ts
│   └── ...
├── services
|   ├── index.ts
│   └── ...
├── utils
|   ├── index.ts
│   └── ...
└── server.ts
```

### FrontEnd

```text
src
├── assets
│   └── ...
├── configs
│   └── ...
├── components
│   └── ui
│       └── Button
│           └── button.tsx
│           └── actions.module.scss
|       └── ...
│   └── layout
│       └── header
│           └── header.tsx
│           └── header.module.scss
|       └── ...
├── hooks
│   └── ...
├── pages
│   └── ...
├── routes
│   └── ...
├── services
│   └── ...
├── utils
│   └── ...
├── pages
│   └── ...
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
