# PdrCloudAssessment

# Architectur

## state management

- to have a single, extendable source for the data of the frontend

## ngrx signal store

- used to test signal store
- wouldn't do it again
  - union types are not correctly supported in state
  - store is only available on component level or on root
  - if store is root then every dependency of store also needs to be available in root e. g. `UserService`

## ngrx signal store events

- used to bring back the redux pattern which is completly missing from the basic implementation

## user details are fetcheed even they are in store

- to comply with the requirements of the assesment
- also it is possible with this solution to reduce the amount of the user model for the list and fetch the complete
  entity when the details are requested
