import { SmartContainer } from '@entities/smartContainer';
import { useResize } from '@lib/customHooks/useResize';
import { gameData } from '@src/app';
import { observer } from 'mobx-react';
import * as PIXI from 'pixi.js';
import { Application, IApplicationOptions } from 'pixi.js';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { Stage, Text } from '@inlet/react-pixi';

export const GameApp: FC = observer(() => {
  const div = useRef();

  const [app, setApp] = useState(null);

  const { width, height, isPortrait } = useResize();

  useLayoutEffect(() => {
    if (!div.current) return;

    const app = new Application(gameOptions);
    setApp(app);

    //  TODO: add proper debug wrapping
    //  Register PIXI tools hooks
    window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
      window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

    const promises = [];

    return function cleanup() {
      setApp(null);
      app.destroy(true, true);
    };
  }, []);

  useLayoutEffect(() => {
    if (!app) return;

    const c = app.view as HTMLCanvasElement;
    if (window.devicePixelRatio !== 1) {
      const w = c.width;
      const h = c.height;

      c.setAttribute('width', `${w}`);
      c.setAttribute('height', `${h}`);
      c.setAttribute('style', 'width="' + w + '"; height="' + h + '";');
      c.getContext('2d')?.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }, [width, height]);

  return (
    <div ref={div} style={{ overflow: 'hidden' }}>
      {app && (
        <>
          <Stage options={gameOptions} style={style}>
            <SmartContainer
              portraitData={{
                viewportHeight: 3000,
                viewportWidth: 1500,
                align: 'center',
                valign: 'top',
                correctionOffsetY: 1170,
              }}
              landscapeData={{
                viewportHeight: 1500,
                viewportWidth: 3000,
                align: 'center',
                valign: 'center',
              }}
            >
              <Text text={gameData.state} />
            </SmartContainer>
          </Stage>
        </>
      )}
    </div>
  );
});

const gameOptions: IApplicationOptions = {
  resizeTo: document.body,
  resolution: window.devicePixelRatio,
  backgroundAlpha: 0,
};

const style = {
  width: ' 100%',
  height: ' 100%',
  display: 'block',
};
