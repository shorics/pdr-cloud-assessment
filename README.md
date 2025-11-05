# PdrCloudAssessment

# Architectur

## Frontend

### views and dumb components

- the frontend components are split into views (logic) and dumb (presentation) components

### state management

- to have a single, extendable source for the data of the frontend
- preferable with a pattern like redux to have a common, understandable design in place

### ngrx signal store

- to be honest: I wanted to test the new signal store. Otherwise I'd have used the RxJs variant for the reasons above
- on the other hand handling combinations of Observables and Signals can sometimes be tedious
- wouldn't use signal version again (for now)
  - union types are not correctly supported in state
  - store is only available on component level or on root
  - if store is root then every dependency of store also needs to be available in root e. g. `UserService`
  - effects cannot put into separate file because type safeness is nearly impossible
  - events are experimental but the only way to get redux pattern to work

### pagination done in frontend

- to reduce complexity of the task
- database pretty small

### user details are fetcheed even they are in store

- to comply with the requirements of the assesment
- also it is possible with this solution to reduce the amount of data of the user model in the list and fetch the
  complete entity when full details are requested

### filter by indexOf() instead of Regex

- string operations are faster
