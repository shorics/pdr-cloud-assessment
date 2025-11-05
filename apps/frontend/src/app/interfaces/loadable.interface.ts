import { LoadingState } from '../enums/loading-state.enum';

export interface Loadable<T> {
  state: LoadingState,
  data: T | undefined,
  error?: string,
}
