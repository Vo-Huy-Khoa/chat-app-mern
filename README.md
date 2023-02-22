<h1>Chat App MERN</h1>
<h2><a href="https://mern-vo-huy-khoa.vercel.app/">Live Demo</a></h2>

## Run local:

You’ll need to have Node >= 14.

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

## Structure of the project:

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
