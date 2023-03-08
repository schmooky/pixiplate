import { action, makeObservable, observable } from 'mobx';

export class AssetsStore {
  constructor() {
    makeObservable(this);
  }

  @observable allAssetsCount = 0;

  @observable loadedAssetsCount = 0;

  @action
  setAllAssetsCount(newValue: number): void {
    this.allAssetsCount = newValue;
  }

  @action
  setLoadedAssetsCount(newValue: number): void {
    this.loadedAssetsCount = newValue;
  }
}

export const assetsStore = new AssetsStore();
