import { useResize } from '@lib/customHooks/useResize';
import { observer } from 'mobx-react';
import * as PIXI from 'pixi.js';
import { Application, Assets, IApplicationOptions } from 'pixi.js';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { Container, Stage } from '@pixi/react';
import { SimpleSpine } from '@entities/simpleSpine';
import { loadAssets } from '@lib/load';

export const GameApp: FC = observer(() => {
  const div = useRef();

  const [app, setApp] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const { width, height, isPortrait } = useResize();

  useLayoutEffect(() => {
    if (!div.current) return;

    const app = new Application(gameOptions);
    setApp(app);

    loadAssets().then(() => {
      setLoaded(true);
      console.log(Assets.cache);
    });

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
      {app && loaded && (
        <>
          <Stage options={gameOptions} style={style}>
            {/* @ts-ignore */}
            <Container x={100} y={100}>
              <SimpleSpine spineData={Assets.cache.get('animation-test')} />
            </Container>
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
  width: '100%',
  height: '100%',
  display: 'block',
};
