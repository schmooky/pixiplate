import {
  effectsMap,
  GameState,
  GameStatePayload,
  stateHandlers,
  stateTransitions,
} from '@lib/stateMap';
import { action, makeObservable, observable } from 'mobx';

export interface IGameStore {
  state: GameState;
}

export class GameData implements IGameStore {
  constructor() {
    makeObservable(this);
  }

  @observable state: GameState = GameState.Idle;

  @action
  changeState<T extends GameState>(payload?: GameStatePayload<T>): void {

    const newState = stateTransitions[this.state](payload);

    effectsMap
      .filter((effect) => effect.from.includes(this.state) && effect.to.includes(newState))
      .forEach((map) => map.effects.forEach((effect) => effect()));
    this.state = newState;

    stateHandlers[newState]();
  }
}
