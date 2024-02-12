import { Background } from "./ui/basic-utils.js";
import { Player } from "./player.js";

const background = new Background();
const player = new Player(245, 4060);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keys = {};
// KeyW: true | false;
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

let mouse = {
  x: 0,
  y: 0
}

document.addEventListener("click", (e) => {
  const canvasPos = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - canvasPos.left) / canvasPos.width) * canvas.width;
  mouse.y = ((e.clientY - canvasPos.top) / canvasPos.height) * canvas.height;
  console.log(mouse);
});

const gameLoop = () => {
  //resize
  resize();

  //clear - render background
  clear();

  //update
  update();

  //render
  render();

  //fps
  fps();

  window.requestAnimationFrame(gameLoop);
};

const clear = () => {
  background.draw(ctx, player);
  player.draw(ctx);
};
const resize = () => {
  canvas.width = 1280;
  canvas.height = 720;
};
const update = () => {
  handlePlayerMovement();
};

const handlePlayerMovement = () => {
// console.log(player.x);
// console.log(player.y);
  if (keys["KeyW"]) {
    player.y -= player.velocity;
  }
  if (keys["KeyA"]) {
    player.x -= player.velocity;
  }
  if (keys["KeyS"]) {
    player.y += player.velocity;
  }
  if (keys["KeyD"]) {
    player.x += player.velocity;
  }
}

const render = () => {};
const fps = () => {};

window.onload = () => {
  window.requestAnimationFrame(gameLoop);
};
