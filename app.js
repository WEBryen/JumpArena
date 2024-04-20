const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 576;
canvas.height = 432;

const scaledCanvas = {
  width: canvas.width,
  height: canvas.height,
};

const gravity = 0.5;

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          color: 'rgba(0,0,0,1)',
        })
      );
    }
  });
});

const platformCollisions2D = [];

for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
          color: 'rgba(0,0,0,1)',
        })
      );
    }

  });
});

const player = new Player({
  position: {
    x: 200,
    y: 225,
  },
  collisionBlocks,
  platformCollisionBlocks,
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });

  platformCollisionBlocks.forEach((block) => {
    block.update();
  });

  player.update();

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
  else if (keys.a.pressed) player.velocity.x = -5;

  c.restore();
}

animate();
let wCount = 0;
let SpaceCount = 0;
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -8;
      wCount += 1;
      document.getElementById("w").innerHTML = "<h1>Number of<br> Jumps<br>"+wCount+"</h1";
      break;
    case " ":
      player.velocity.y = -15;
      SpaceCount += 1;
      document.getElementById("space").innerHTML = "<h1>Number of Super Jumps<br>"+SpaceCount+"</h1>";
    }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case " ":
      break;
    case "w":
      break;
  }
});
