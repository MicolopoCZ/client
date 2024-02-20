
import { Background, Click } from "./ui/basic-utils.js";
import { Player } from "./player.js";

const playerId = Math.floor(Math.random() * 1000000);
const socket = io("http://localhost:3000");
const sendSpawnInfoToServer = () => {
  const payload = {
    id: playerId,
    position: {
      x: player.x,
      y: player.y,
    },
  };
  socket.emit("spawn", payload);
};

const users = new Map();

socket.on("new user connected", (data) => {
  data.map((element) => {
    users.set(element[0], element[1]);
  });
  console.log(users);
});

socket.on("user disconnected", (user) => {
  users.delete(user);
  console.log(users);
});

const sendPlayerUpdate = () => {
  const payload = {
    id: playerId,
    position: {
      x: player.x,
      y: player.y,
    },
  };
  socket.emit("playerpos", payload);
};

socket.on("playerpos", (data) => {
  if (data.id == playerId) return;
  users.set(data.id, data.position);
});

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
  sendPlayerUpdate();
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
};

const render = () => {
  users.forEach((p, id) => {
    if (playerId == id) return;
    ctx.strokeStyle = "red";
    ctx.strokeRect(
      p.x-player.x + 1280 / 2 - player.width / 2,
      p.y-player.y + 720 / 2 - player.height / 2,
      50,
      50
      );
    console.log(p);
  });
};

const fps = () => {};

window.onload = () => {
  sendSpawnInfoToServer();
  window.requestAnimationFrame(gameLoop);
};
