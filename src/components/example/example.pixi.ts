import { ExtendedSpine } from '@entities/common';
import { gsap } from 'gsap';
import { Assets, Container, Graphics, Point, Sprite } from 'pixi.js';

export class ExamplePIXI extends Container {
  constructor() {
    super();
    const spineObject = new ExtendedSpine(Assets.cache.get('animation-test'));
    this.addChild(spineObject);
  }

  moveTo(x: number, y: number) {
    gsap.killTweensOf(this);
    gsap.to(this, {
      x,
      y,
      ease: 'elastic',
      duration: 0.5,
    });
  }
}
