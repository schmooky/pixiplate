import { action, makeObservable, observable } from 'mobx';

export class ErrorStore {
  constructor() {
    makeObservable(this);
  }

  @observable errorId? = undefined;

  @observable errorMessage? = undefined;

  @action setError(errorId?: number): void {
    this.errorId = errorId;
  }

  @action setErrorMessage(errorMessage?: string): void {
    this.errorMessage = errorMessage;
  }
}
