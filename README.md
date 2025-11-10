# PdrCloudAssessment

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

### local fonts

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
  - store needs to be injected even if not used to make events available
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
