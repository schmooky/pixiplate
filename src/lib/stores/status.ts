import { action, makeObservable, observable } from 'mobx';

export class StatusStore {
  constructor() {
    makeObservable(this);
  }

  @observable connectionState = true;

  @action
  setConnectionState(newState: boolean): void {
    this.connectionState = newState;
  }
}
