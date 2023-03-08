import { action, makeObservable, observable } from 'mobx';

export enum GameResolution {
    HDPI = 'hdpi',
    MDPI = 'mdpi',
    LDPI = 'ldpi',
  }
  
  export enum PlatformType {
    MOBILE = 'mobile',
    DESKTOP = 'desktop',
  }
  

export class GameStore {
  constructor() {
    makeObservable(this);
  }

  @observable platform: PlatformType = PlatformType.DESKTOP;

  @observable resolution: GameResolution = GameResolution.HDPI;
}
