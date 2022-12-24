export enum GameState {
  Init = 'init',
  Idle = 'idle',
  End = 'end',
}

export type GameStateTransition<T extends GameState> = (payload?: GameStatePayload<T>) => GameState;

export type GameStateTransitions = {
  [T in GameState]: GameStateTransition<T>;
};

export type GameStateEffect = {
  from: GameState[];
  to: GameState[];
  effects: (() => void)[];
};

export type GameStateHandler<T extends GameState> = (payload?: GameStatePayload<T>) => void;

export interface GameStatePossiblePayload extends Record<GameState, Record<string, any>> {
  [GameState.Init]: any;
  [GameState.Idle]: {
    playerAction: string;
  };
}

export type GameStatePayload<T extends GameState> = GameStatePossiblePayload[T];

export type GameStateHandlers = {
  [T in GameState]: GameStateHandler<T>;
};
