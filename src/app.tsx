import { GameData } from '@lib/stores/gameData';
import { useEffect } from 'react';
import GameApp from './entities/gameApp';

export const gameData = new GameData();

const App: React.FC = () => {
  useEffect(() => {
    document.onkeydown = (event) => event.key === 'F5' || event.key === 'F11';
  }, []);

  return <GameApp />;
};
export default App;
