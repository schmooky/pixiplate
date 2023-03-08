import { AssetsStore } from './assets';
import { ErrorStore } from './error';
import { GameStore } from './game';
import { StatusStore } from './status';

export const store = {
  status: new StatusStore(),
  store: new GameStore(),
  assets: new AssetsStore(),
  error: new ErrorStore(),
  game: new GameStore(),
};
