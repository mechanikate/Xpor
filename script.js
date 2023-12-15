/*
 * SHGTW v0.9.9
 * Welcome to this strange mess of code. Spoilers ahead!
 * -kate
 */
m_package([media]);

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
); // This should fix arrow-scrolling on Chrome/Firefox.
var canMove = true;
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}
const outputToPlayer = (text) =>
  (document.getElementById("og").innerHTML = text);
const outputToPlayerEvil = (text) =>
  (document.getElementById(
    "og"
  ).innerHTML = `<div style="color: red;">${text}</div>`);

function mazegen(xm, ym) {
  var rand = Array(ym).fill("");
  for (var y = 0; y < ym; y++) {
    for (var x = 0; x < Math.ceil(xm / 5); x++) {
      if (y == 0 && x == 0) {
        rand[y] += "G";
      } else {
        rand[y] += Math.round(Math.random()) == 0 ? "G" : "E";
      }
      rand[y] += Math.random() < 0.05 ? "E" : "G";
      rand[y] += Math.random() < 0.05 ? "E" : "G";
      rand[y] += Math.random() < 0.05 ? "E" : "G";
      rand[y] += Math.random() < 0.025 ? "C" : "G";
    }
  }
  return rand.join("\n");
}
function addMap(bstr) {
    p.mapList.push(...JSON.parse(atob(bstr)));
}
class SHGTW extends Presentation {
  constructor(img) {
    super(img);
    this.img = img;
    this.speed = this.img.u;
    this.map = {};
    this.mapList = [0, "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG"];
    this.reset = true;
    this.lvl = 1;
    this.keystrokes = 0;
    //this.coins = 0;
  }
  async levelUp() {
    this.lvl++;
    this.keystrokes = 0;
    document.getElementById("lvlval").innerHTML = this.lvl;
    if (p.lvl == 3) {
      window.setTimeout(() => {
        outputToPlayer("oh. did something break? give me 5 seconds.");
      }, 5000);
      window.setTimeout(() => {
        p.levelUp();
        outputToPlayer(
          "sorry that took 1 millisecond too long. should be fixed now"
        );
      }, 10001);
    }
    if (p.lvl == 4) {
      window.setTimeout(() => {
        outputToPlayer("IT BROKE AGAIN?!");
      }, 5000);
      window.setTimeout(() => {
        outputToPlayer(
          "well since my game is such a buggy mess, to hell with it. just go out of bounds at the bottom? i dunno."
        );
        p.levelUp();
      }, 10000);
    }
    if (p.lvl == 6) {
      outputToPlayer(
        "it appears my previous laziness has come to bite me in the ass. like always, just try to get to the right."
      );
    }
    if (p.lvl == 7) {
      outputToPlayer(
        "OK, it appears that as long as you get like 30 units to the right, you get to the next level."
      );
    }
    if (p.lvl == 8) {
      outputToPlayer(
        "nevermind. also it appears the level is now laughing at us."
      );
    }
    if (p.lvl == 9) {
      outputToPlayer("know what? i'm sick of this. try going into the red");
    }
    if (p.lvl == 10) {
      outputToPlayer("wow that's evil, how are we supposed to beat this?");
      window.setTimeout(() => {
        outputToPlayer(
          "it appears that the creator of the level put a space you can walk to the end at the 4th row. try just walking to the end at the 4th row."
        );
      }, 5000);
    }
    if (p.lvl == 12) {
      document.getElementById("lvlval").innerHTML = "&infin;";
      outputToPlayer("wait what's this?");
    }
    if (p.lvl == 13) {
      document.getElementById("lvlval").innerHTML = "&infin;";
      outputToPlayer("level infinity?");
    }
    if (p.lvl == 14) {
      document.getElementById("lvlval").innerHTML = "&infin;";
      outputToPlayer("uhhhhhhhhh");
    }
    if (p.lvl == 20) {
      document.getElementById("lvlval").innerHTML = "&infin;...?";
      outputToPlayer("...");
    }
    if (p.lvl == 21) {
      document.getElementById("lvlval").innerHTML = "&infin;...?";
      outputToPlayer("..........");
    }
    if (p.lvl == 22) {
      document.getElementById("lvlval").innerHTML = "&infin;...?";
      outputToPlayer(".............");
    }
    if (p.lvl == 23) {
      document.getElementById("lvlval").innerHTML = "&infin;...?";
      outputToPlayer("................");
    }
    if (p.lvl == 24) {
      document.getElementById("lvlval").innerHTML = "&infin;...?";
      outputToPlayer("who's that");
    }
    if (p.lvl == 25) {
      document.getElementById("lvlval").innerHTML = "&infin;...?";
      outputToPlayer("oh god dammit");
    }
    if (p.lvl == 26) {
      canMove = false;
      setGCTX(p.img);
      canv.style.transformOrigin = "0% 0% 0px";
      canv.style.animation = "zoom 5s ease forwards";
      window.setTimeout(() => {
        document.documentElement.style.backgroundColor = "black";
        p.lvl = 26;
        p.levelUp();
      }, 5000);
      window.setTimeout(() => {
        [...document.querySelectorAll(".center, a")].forEach(
          (e) => (e.style.color = "white")
        );
        canv.style.animation = "zoomundo 5s ease forwards";
        [...document.querySelectorAll("input,button")].forEach((e)=>e.style.backgroundColor = "black");
          [...document.querySelectorAll("input,button")].forEach((e)=>e.style.color = "white");
      }, 6000);
      window.setTimeout(
        () =>
          outputToPlayerEvil(
            "Hello. I made these dumb levels. Try to escape this one. You can't."
          ),
        11000
      );
      window.setTimeout(() => {
        outputToPlayer(
          "this guy again? can you let the player go onto the next level"
        );
      }, 20000);
      window.setTimeout(() => {
        outputToPlayerEvil("No.");
      }, 25000);
      window.setTimeout(() => {
        outputToPlayer("why not?");
      }, 28000);
      window.setTimeout(() => {
        outputToPlayerEvil(
          "I don't really know. It's funny to see you fail lol"
        );
      }, 32000);
      window.setTimeout(() => {
        outputToPlayer("that's kind of just strange");
        p.lvl=29;
        p.levelUp();
        canMove=true;
      }, 40000);
    }
    if (p.lvl == 30) {
      outputToPlayerEvil(
        "Oh wait I deleted the code which traps the player. What a convenient plot device!"
      );
    }
    if (p.lvl == 31) {
      outputToPlayerEvil("Should be fixe-it appears I broke it more.");
    }
    if (p.lvl == 32) {
      outputToPlayer("you forgot a closing parantheses lol");
    }
    if (p.lvl == 33) {
      outputToPlayer("oops I broke it");
    }
    if (p.lvl == 36) {
      outputToPlayer("the fuck is this, a qr code?");
    }
    if (p.lvl == 37) outputToPlayer("ok that's actually just a qr code");

    this.doReset();
  }
  async doReset() {
    const that = this;
    that.playerPos = [0, 0];
    that.keystrokes = 0;
    that.gameMap = that.mapList[that.lvl];
    try {
      that.yxGameMap = that.gameMap.split("\n");
    } catch (e) {
      console.log("game is done, probably looping now?");
    }
  }
  async movement(evt) {
    var that = p;
    try {
      that.map[evt.key] = evt.type == "keydown";
      if (
        (that.map["w"] || that.map["ArrowUp"]) &&
        that.playerPos[1] >= 1 &&
        canMove
      ) {
        evt.preventDefault();
        that.playerPos[1] = that.playerPos[1] - that.speed / that.img.u;
        that.keystrokes++;
      }
      if (
        (that.map["s"] || that.map["ArrowDown"]) &&
        p.playerPos[1] + 2 <= p.yxGameMap.length &&
        canMove
      ) {
        evt.preventDefault();
        that.playerPos[1] = that.playerPos[1] + that.speed / that.img.u;
        that.keystrokes++;
      }
      if (that.map["d"] || (that.map["ArrowRight"] && canMove)) {
        evt.preventDefault();
        if (that.playerPos[0] + 2 >= that.yxGameMap[0].length && p.lvl != 9) {
          that.levelUp();
        }
        if (
          !(that.playerPos[0] + 2 >= that.yxGameMap[0].length - 1 && p.lvl == 9)
        ) {
          that.playerPos[0] = that.playerPos[0] + that.speed / that.img.u;
          that.keystrokes++;
        }
      }
      if (
        (that.map["a"] || that.map["ArrowLeft"]) &&
        that.playerPos[0] >= 1 &&
        canMove
      ) {
        evt.preventDefault();
        that.playerPos[0] = that.playerPos[0] - that.speed / that.img.u;
        that.keystrokes++;
      }
    } catch (e) {
      console.log(e);
    }
    document.getElementById("curr").innerHTML = that.keystrokes;
      p.checkSafety();
  }
  async run() {
    try {
      const that = this;
      try {
        document.addEventListener("keyup", this.movement);
      } catch (e) {
        console.log(e);
      }
      try {
        document.addEventListener("keydown", this.movement);
      } catch (e) {
        console.log(e);
      }
      this.playerPos = [0, 0];
      while (1) {
        setGCTX(p.img);
        this.img.bg(
          new ColorDetails(
            p.lvl >= 26 ? "#000000" : "#ffffff",
            p.lvl >= 26 ? "#000000" : "#ffffff"
          )
        );
        this.sceneGame();
        await sleep(1 / 60);
        this.img.clear();
        if (that.reset) {
          that.reset = false;
          that.doReset();
        }
      }
      this.run();
    } catch (e) {
      console.log(e);
    }
  }
  async renderPlayer() {
    const img = this.img;
    setGCTX(img);
    img.rect(
      this.playerPos[0],
      this.playerPos[1],
      4 / 5,
      4 / 5,
      new ColorDetails("#ff0000", "#ff0000"),
      new Properties(0)
    );
  }
  async gameMapBg() {
    const that = this;
    try {
      const img = that.img;
      setGCTX(img);
      for (var y = 0; y < that.yxGameMap.length; y++) {
        for (var x = 0; x < that.yxGameMap[y].length; x++) {
          if (that.yxGameMap[y][x] == "G") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#001100", "#00aa00"),
              new Properties(0.25)
            );
          } else if (that.yxGameMap[y][x] == "E") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#110000", "#aa0000"),
              new Properties(0.25)
            );
          } else if (that.yxGameMap[y][x] == "C") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#111100", "#aaaa00"),
              new Properties(0.25)
            );
          } else if (that.yxGameMap[y][x] == "W") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#ffffff", "#ffffff"),
              new Properties(0)
            );
          } else if (that.yxGameMap[y][x] == "L") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#ffffff", "#ffffff"),
              new Properties(0)
            );
          } else if (that.yxGameMap[y][x] == "F") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#110000", "#aa0000"),
              new Properties(0.25)
            );
          } else if (that.yxGameMap[y][x] == "f") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#110000", "#aa0000"),
              new Properties(0.25)
            );
          } else if (that.yxGameMap[y][x] == "B") {
            img.rect(
              x,
              y,
              1,
              1,
              new ColorDetails("#000000", "#000000"),
              new Properties(0)
            );
          }
        }
      }
    } catch (e) {}
  }
  async checkSafety() {
    try {
      if (
        this.yxGameMap[this.playerPos[1]][this.playerPos[0]] == "E" ||
        this.yxGameMap[this.playerPos[1]][this.playerPos[0]] == "L"
      ) {
        this.reset = true;
      } else if (this.yxGameMap[this.playerPos[1]][this.playerPos[0]] == "C") {
        this.yxGameMap[this.playerPos[1]] = setCharAt(
          this.yxGameMap[this.playerPos[1]],
          this.playerPos[0],
          "G"
        );
        this.gameMap = this.yxGameMap.join("\n");
      } else if (this.yxGameMap[this.playerPos[1]][this.playerPos[0]] == "F") {
        p.levelUp();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async sceneGame() {
    this.gameMapBg();
    this.renderPlayer();
    this.checkSafety();
  }
}
var p;
const run = async () => {
  p = new SHGTW(new Image("canv", 1920, 1080));
};
function expandModMenu() {
    [...document.getElementsByClassName("modmenu")].forEach((e)=>e.style.display=(e.style.display=="inline-block" ? "none" : "inline-block"));
    expandtext.innerHTML=(expandtext.innerHTML=="⮞ Mod menu" ? "&#11167; Mod menu" : "⮞ Mod menu");
}
window.onload = () => {
  run();
  p.run();
};

