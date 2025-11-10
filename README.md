# PdrCloudAssessment

# Install

    npm i

# Commands

## Backend

### lint

    npx nx run api:lint

### unit tests

    npx nx run api:test

### e2e tests

    npx nx run api-e2e:e2e

### dev server

    npx nx run api:serve

### build

    npx nx run api:build

## Frontend

### lint

    npx nx run frontend:lint

### unit tests

    npx nx run frontend:test

### integration tests

    npx nx run frontend-e2e:e2e

### dev server

    npx nx run frontend:serve

### build

    npx nx run frontend:build

## Shared

### lint

    npx nx run shared:lint

### unit tests

    npx nx run shared:vite:test

# Architecture

## Backend

### SWC

- better build times: "SWC is approximately x20 times faster than the default TypeScript compiler."

### fastify

- better runtime performance: "fastify is much faster than Express, achieving almost two times better benchmarks results"

### REST API

- common pattern with defined actions for HTTP verbs

### Backing up invalid `User` entities

- cleans inital data
- allows administrator to review invalid entities (`users-unparsable.json`)

### In-memory queue for saving

- easier handling of sequential file writes than fiddeling with locks

## Frontend

### Local fonts

- privacy concerns on google hosting

### Views and dumb components

- the frontend components are split into views (logic) and dumb (presentation) components

### Unit tests with host components

- to test "real" behavior of components

### State management

- to have a single, extendable source for the data of the frontend
- preferable with a pattern like redux to have a common, understandable design in place

### ngrx signal store

- to be honest: I wanted to test the new signal store. Otherwise I'd have used the RxJs variant for the reasons above
- on the other hand handling combinations of Observables and Signals can sometimes be tedious
- wouldn't use signal version **with events** again (for now)
  - union types are not correctly supported in state
  - no mocked store provided for unit tests
  - store needs to be injected even if not used just to make events available
  - injecting store multiple times leads to runnning effects multiple times
  - effects cannot be put into separate files because type safeness is nearly impossible
  - events are experimental but **the only way to get redux pattern back**

### Pagination and filtering done in frontend

- to reduce complexity of the task
- database pretty small

### User details are fetched even they are in store

- to comply with the requirements of the assesment
- also it would be possible with this solution to reduce the amount of data of the user model in the list and fetch the complete entity when full details are requested

### Filter by indexOf() instead of Regex

- string operations are faster

### Integration tests with mocked API instead of e2e

- to reduce complexity

## Shared

### Using Zod discriminatedUnion

- better type safeness for `User` type
- requirements of assessment not clear. Hint states discriminatedUnion is allowed

# Limitations

## Solution does not scale well

- writing the whole database on every modification
- not multi-instance ready - users.json tied to instance
- frontend loads complete database into memory

# Coverage

## Backend

```
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------|---------|----------|---------|---------|-------------------
All files               |   99.23 |    86.66 |   97.43 |   99.17 |
 data                   |   98.83 |    84.61 |   95.83 |   98.75 |
  data-users.service.ts |   97.77 |    77.77 |   93.33 |   97.67 | 96
  data-users.utils.ts   |     100 |      100 |     100 |     100 |
  data.exceptions.ts    |     100 |      100 |     100 |     100 |
 users                  |     100 |      100 |     100 |     100 |
  users.controller.ts   |     100 |      100 |     100 |     100 |
  users.pipes.ts        |     100 |      100 |     100 |     100 |
  users.service.ts      |     100 |      100 |     100 |     100 |
------------------------|---------|----------|---------|---------|-------------------
```

## Frontend

**Frontend needs more tests. Some tests were skipped due to time limit.**

```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |   72.98 |    96.15 |   73.68 |   72.98 |
 src               |       0 |        0 |       0 |       0 |
  main.ts          |       0 |        0 |       0 |       0 |
 src/app           |     100 |      100 |     100 |     100 |
  app.config.ts    |       0 |        0 |       0 |       0 |
  app.constants.ts |     100 |      100 |     100 |     100 |
  app.routes.ts    |       0 |        0 |       0 |       0 |
  app.ts           |     100 |      100 |     100 |     100 |
 ...-create-dialog |     100 |      100 |     100 |     100 |
  ...ate-dialog.ts |     100 |      100 |     100 |     100 |
 ...details-dialog |     100 |      100 |     100 |     100 |
  ...ils-dialog.ts |     100 |      100 |     100 |     100 |
 ...nts/user-table |     100 |      100 |     100 |     100 |
  user-table.ts    |     100 |      100 |     100 |     100 |
 ...r-table-filter |     100 |      100 |     100 |     100 |
  ...ble-filter.ts |     100 |      100 |     100 |     100 |
 src/app/enums     |     100 |      100 |     100 |     100 |
  ...state.enum.ts |     100 |      100 |     100 |     100 |
 src/app/schemas   |     100 |      100 |     100 |     100 |
  ...ist.schema.ts |     100 |      100 |     100 |     100 |
 src/app/services  |   48.27 |      100 |       0 |   48.27 |
  user.service.ts  |   48.27 |      100 |       0 |   48.27 | ...29,32-35,38-41
 src/app/state     |   44.82 |      100 |     100 |   44.82 |
  user.events.ts   |     100 |      100 |     100 |     100 |
  user.store.ts    |   35.35 |      100 |     100 |   35.35 | ...3,75-76,79-129
 ...app/validators |   21.73 |      100 |     100 |   21.73 |
  zod.validator.ts |   21.73 |      100 |     100 |   21.73 | 6-30
 ...iews/user-list |     100 |    93.33 |     100 |     100 |
  user-list.ts     |     100 |    93.33 |     100 |     100 | 57
-------------------|---------|----------|---------|---------|-------------------
```

## Shared

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   98.14 |       50 |   66.66 |   98.14 |
 src             |       0 |        0 |       0 |       0 |
  index.ts       |       0 |        0 |       0 |       0 | 1
 src/lib/schemas |     100 |       60 |     100 |     100 |
  user.schema.ts |     100 |       60 |     100 |     100 | 3-4
-----------------|---------|----------|---------|---------|-------------------
```
