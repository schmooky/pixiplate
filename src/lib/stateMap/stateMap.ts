import { gameData } from '@src/app';
import {
  GameState,
  GameStateEffect,
  GameStateHandlers,
  GameStateTransitions,
} from './stateMap.types';

export const logWithState = (message: string): void =>
  console.log(
    `%c${[gameData.state.toUpperCase()]}:`,
    'font-size:14px;color:#66bb6a;font-weight:bold',
    `${message}`,
  );

export const stateTransitions: GameStateTransitions = {
  [GameState.Init]: (payload?) => GameState.Idle,
  [GameState.Idle]: (payload?) => GameState.End,
  [GameState.End]: (payload?) => GameState.Idle,
};

export const effectsMap: GameStateEffect[] = [];

export const stateHandlers: GameStateHandlers = {
  init: () => {
    logWithState('');
    setTimeout(() => gameData.changeState(), 5000);
  },
  idle: (payload) => {
    logWithState('');
    setTimeout(() => gameData.changeState(), 5000);
  },
  end: (payload) => {
    logWithState('');
    setTimeout(() => gameData.changeState(), 5000);
  },
};
