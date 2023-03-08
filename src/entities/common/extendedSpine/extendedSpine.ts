import {
  AtlasAttachmentLoader,
  AttachmentTimeline,
  SkeletonData,
  SkeletonJson,
  Spine,
  TextureAtlas,
} from '@pixi-spine/all-4.1';
import { Assets } from '@pixi/assets';
import type * as PIXI from 'pixi.js';

interface AutomationContainer extends PIXI.Container {
  automationID?: string;
}

interface ExtendedSpineAttachmentTimeline extends AttachmentTimeline {
  slotIndex: number;
}

export class ExtendedSpine extends Spine {
  constructor(spineData: SkeletonData) {
    super(spineData);
  }

  /**
   * Воспроизводит анимацию с указанной скоросьбю
   * @param  {number=1} speed
   */
  play(speed = 1): void {
    this.state.timeScale = speed;
  }

  /**
   * Останавливает анимацию
   * @param  {boolean=false} hardResetSpine
   */
  stop(hardResetSpine = false): void {
    if (hardResetSpine) {
      this.autoUpdateTransform();
    }
    this.state.timeScale = 0;
  }

  /**
   * Получает контейнер слота
   * @param  {string} slotName
   */
  getSlotPixiContainer(slotName: string): PIXI.Container {
    const index = this.skeleton.data.findSlotIndex(slotName);
    return this.slotContainers[index];
  }

  /**
   * Добавляет объект к слоту
   * @param  {string} slotName
   * @param  {Pixi.DisplayObject} displayObject
   * @returns Pixi
   */
  appendToSlot(
    slotName: string,
    displayObject: PIXI.DisplayObject,
  ): PIXI.DisplayObject | undefined {
    const slot = this.getSlotPixiContainer(slotName);
    // if (!slot.children.length) return;
    slot.addChildAt(displayObject, slot.children.length);
    return displayObject;
  }

  /**
   * Убирает первый аттачмент из слота
   * @param  {string} slotName
   */
  removeFromSlot(slotName: string): void {
    const slot = this.getSlotPixiContainer(slotName);
    if (slot.children.length === 0)
      throw new Error(`Tried to remove from slot ${slotName} while it is empty`);

    // eslint-disable-next-line no-unused-expressions
    slot.removeChildAt(slot.children.length - 1);
  }

  /**
   * Убирает первый аттачмент из слота
   * @param  {string} slotName
   */
  removeAllFromSlot(slotName: string): void {
    const slot = this.getSlotPixiContainer(slotName);
    if (slot.children.length === 0)
      throw new Error(`Tried to remove from slot ${slotName} while it is empty`);

    // eslint-disable-next-line no-unused-expressions
    slot.removeChildren();
  }

  /**
   * @param  {string[]} slots Массив имет слотов для которых надо вызвать removeFromSlot
   */
  removeFromSlots(slots: string[]): void {
    slots.forEach((slot) => this.removeFromSlot(slot));
  }

  /**
   * @param  {string} slotName Добавляет имя для автоматизации и интеграционных тестов
   */
  addAutomationID(slotName: string): void {
    const slot = this.getSlotPixiContainer(slotName);
    (slot as unknown as AutomationContainer).automationID = slotName;
  }

  public getAnimationSlotIndexes = (animationName: string): number[] =>
    this.spineData.animations
      .find((el) => el.name === animationName)
      ?.timelines.map((el: ExtendedSpineAttachmentTimeline) => el.slotIndex);

  public getAnimationDisplaySizeByTrack = (trackN: number): { w: number; h: number } => {
    let w = 0;
    let h = 0;

    this.getAnimationSlotIndexes(this.state.tracks[trackN]?.animation.name)?.forEach(
      (el, index) => {
        if (!index) {
          w = this.slotContainers[el]?.width;
          h = this.slotContainers[el]?.height;
        } else {
          if (this.slotContainers[el]?.width > w) {
            w = this.slotContainers[el]?.width;
          }

          if (this.slotContainers[el]?.height > h) {
            h = this.slotContainers[el]?.height;
          }
        }
      },
    );

    return { w: w, h: h };
  };
}
