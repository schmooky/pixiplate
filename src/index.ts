import { Application, Assets, Graphics } from "pixi.js";

async function main() {
  // Create PixiJS application
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x104488,
    antialias: true,
    view: document.getElementById("pixiCanvas")! as HTMLCanvasElement,
  });

  // Create grid background
  const grid = new Graphics();
  const gridSize = 50;
  grid.lineStyle(1, 0xcccccc, 0.5);

  for (let x = 0; x <= app.screen.width; x += gridSize) {
    grid.moveTo(x, 0);
    grid.lineTo(x, app.screen.height);
  }

  for (let y = 0; y <= app.screen.height; y += gridSize) {
    grid.moveTo(0, y);
    grid.lineTo(app.screen.width, y);
  }

  app.stage.addChild(grid);
}

main();
