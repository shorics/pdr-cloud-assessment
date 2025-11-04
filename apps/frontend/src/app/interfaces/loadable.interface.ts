export enum LoadingState {
  Initial,
  Loading,
  Done,
  Error,
};

export interface Loadable<T> {
  state: LoadingState,
  data: T | undefined,
  error?: string,
}
