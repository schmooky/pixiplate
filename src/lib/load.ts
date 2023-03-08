import { eventEmitter } from '@entities/eventEmitter';
import { assetsStore } from '@lib/stores/assets';
import { isAndroid } from '@lib/utils';
import { SkeletonData } from '@pixi-spine/all-4.1';
import { Assets } from '@pixi/assets';
import FontFaceObserver from 'fontfaceobserver';
import type { SoundSpriteDefinitions } from 'howler';
import { store } from './stores';

export const loadAtlas = (atlasName: string) => {
  Assets.add(
    atlasName,
    `/assets/img/${store.game.platform}/${atlasName}/atlas-${store.game.resolution}.json`,
  );
  return Assets.load(atlasName);
};

interface SpriteMapDescription {
  start: number;
  end: number;
  loop: boolean;
}

interface SpriteSoundJsonDescription {
  resources: string[];
  spritemap: Record<string, SpriteMapDescription>;
}

const loadSpineAsset = (
  spineName: string,
  skeletonName: string,
  imageNames?: string[],
): Promise<void> => {
  const promises = [Assets.load(`/assets/spine/${skeletonName}.json`)];

  if (imageNames) {
    imageNames.forEach((el) => {
      promises.push(Assets.load(`/assets/spine/${el}.png`));
    });
  } else {
    promises.push(Assets.load(`/assets/spine/${skeletonName}.png`));
  }

  return Promise.all(promises).then(() => {
    const skeletonJsonData = Assets.cache.get(`/assets/spine/${skeletonName}.json`);
    const skeletonData = skeletonJsonData.spineData as SkeletonData;
    Assets.cache.set(spineName, skeletonData);
  });
};

export const loadAssets = () => {
  const promises = [
    // loadSpineAsset('button', 'button/button'),
    loadSpineAsset('animation-test', 'test/test'),
  ];

  assetsStore.setAllAssetsCount(promises.length);

  promises.forEach((el) => {
    wrapAssetPromise(el);
  });

  return Promise.all(promises);
};

export const wrapAssetPromise = (promise: Promise<void>): Promise<void> =>
  new Promise((resolve, reject) => {
    promise.then(() => {
      assetsStore.setLoadedAssetsCount(assetsStore.loadedAssetsCount + 1);
      resolve();
    });
    promise.catch((error) => {
      console.log(error.message); // ошибка при загрузке ассетов по любой причине (в том числе таймаут или отсутствие интернета)
      store.status.setConnectionState(false);
      // TODO Нужен ли отельный попап текст для ошибки при загрузке ассетов либо всегда писать - нет интернета

      reject(error);
    });
  });
