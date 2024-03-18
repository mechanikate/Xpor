/* 
Welcome to Xpor's source.
*/
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
m_package([media]);
var mapW = 128;
var mapH = 48;
var energy = 512;
var n = new NL(mapW, mapH, {
    layers: 35
});
var difficulty = 3; // range from 0 to 10, 0 means you will die fast, 10 means you will live a while... then die
var lpd = n.lp();
var owMap = [];
for(var y=0; y<mapH; y++) {
    owMap.push([]);
    for(var x=0; x<mapW; x++) {
        owMap[y].push(lpd[y][x] >= 0.4375 ? "G":"W"); // choose between grass ("G") and water ("W"). I'm not sure why all values are from 0.4-0.5 or so, but whatever
    }
    owMap[y].push("\n"); // each row is separated by a newline, add one to the array to mark the new row
    owMap[y] = owMap[y].join(""); // join the array of arrays of chars into just an array of strings
}
owMap = owMap.join(""); // join the array of strings into a string
var appleSpots = [];
for(var i=0; i<(10-difficulty)*10; i++) { // lower difficulty (e.g. 3) means more apples (e.g. 21 apples)
    var x = Math.floor(Math.random()*mapW); // get random spots for apples
    var y = Math.floor(Math.random()*mapH); // get random spots for apples
    appleSpots.push([x,y]);
    console.log(y*mapW+y+x)
    owMap = owMap.replaceAt(y*mapW+y+x,"A"); // replace any tile with apple, TODO: make only land be replaced with apples
    console.log(owMap[y*mapW+y+x]);
    
} 
console.log(appleSpots);
console.log(owMap);
window.addEventListener(
    "keydown",
    function(e) {
        if(
            ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
                e.code
            ) > -1
        ) {
            e.preventDefault();
        }
    },
    false
); // This should fix arrow-scrolling on Chrome/Firefox.
var errored=false;
var p;
function setCharAt(str, index, chr) {
    if(index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}
class SHGTW extends Presentation {
    constructor(img) {
        super(img);
        p = this;
        p.img.u = 10;
        this.img = img;
        this.speed = this.img.u;
        this.map = {};
        this.mapList = [owMap];
        this.gameMap = this.mapList[0];
        this.reset = true;
        this.lvl = 1;
        this.keystrokes = 0;
        this.isGameOver=false;
        this.shouldRender = true;
        //this.coins = 0;
    }
    async doReset() {
        const that = this;
        that.playerPos = [1,1];
        this.gameMapBg();
    }
    async movement(evt) {
        if(p.isGameOver) return;
        var that = p;
        try {
            that.map[evt.key] = evt.type == "keydown";
            if(
                (that.map["w"] || that.map["ArrowUp"]) &&
                that.playerPos[1] >= 2
            ) {
                evt.preventDefault();
                that.playerPos[1] = that.playerPos[1] - that.speed / that.img.u;
                if(p.yxGameMap[p.playerPos[1]][p.playerPos[0]]=="W") energy--;
            }
            if(
                (that.map["s"] || that.map["ArrowDown"]) &&
                p.playerPos[1]+3 <= p.yxGameMap.length
            ) {
                evt.preventDefault();
                that.playerPos[1] = that.playerPos[1] + that.speed / that.img.u;
                if(p.yxGameMap[p.playerPos[1]][p.playerPos[0]]=="W") energy--;
            }
            if(that.map["d"] || (that.map["ArrowRight"])) {
                evt.preventDefault();
                if(
                    !(that.playerPos[0] >= that.yxGameMap[0].length - 1)
                ) {
                    that.playerPos[0] = that.playerPos[0] + that.speed / that.img.u;
                    if(p.yxGameMap[p.playerPos[1]][p.playerPos[0]]=="W") energy--;
                }
            }
            if(
                (that.map["a"] || that.map["ArrowLeft"]) &&
                that.playerPos[0] >= 2
            ) {
                evt.preventDefault();
                that.playerPos[0] = that.playerPos[0] - that.speed / that.img.u;
                if(p.yxGameMap[p.playerPos[1]][p.playerPos[0]]=="W") energy--;
            }
            if(that.yxGameMap[that.playerPos[1]][that.playerPos[0]] == "A") {energy+=15; p.gameMap=p.gameMap.replaceAt(p.playerPos[1]*mapW+p.playerPos[1]+p.playerPos[0],"U");p.mapList=[p.gameMap];p.yxGameMap = p.gameMap.split("\n");p.gameMapBg();}
            energylevel.innerHTML=energy;
            if(energy<=0) p.gameOver();
        } catch (e) {
            if(!errored) console.log(e.stack);
            errored = true;
        }
    }
    async gameOver() {
        energy="RIP";
        p.isGameOver=true;
        energylevel.innerHTML=energy;
        p.gameMapBg();
    }
    async run() {
        p = this;
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
            while(1) {
                setGCTX(p.img);
                this.sceneGame();
                await sleep(1 / 60);
                if(p.shouldRender) ctx.clearRect(0, 0, p.img.w, p.img.h);
                if(that.reset) {
                    that.reset = false;
                    that.doReset();
                }
            }
            this.run();
        } catch (e) {
            if(!errored) console.log(e.stack);
            errored = true;
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
            p.isGameOver ? new ColorDetails("#55555555", "#55555555") : new ColorDetails("#ff000055", "#ff000055"),
            new Properties(0)
        );
    }
    async gameMapBg() {
        if(!p.shouldRender) return;
        try{p.yxGameMap = p.gameMap.split("\n");}catch(e){}
        if((p.gameMap.match(/U/g) || []).length >=Math.floor((10-difficulty)*10/4)) { // Math.floor((10-difficulty)*10/2)
            p.gameMap=p.gameMap.replace(/U/g,"G");
            for(var i=0; i<(10-difficulty)*10; i++) { // lower difficulty (e.g. 3) means more apples (e.g. 21 apples)
                var x = Math.floor(Math.random()*mapW); // get random spots for apples
                var y = Math.floor(Math.random()*mapH); // get random spots for apples
                appleSpots.push([x,y]);
                owMap = owMap.replaceAt(y*mapW+y+x,"A"); // replace any tile with apple, TODO: make only land be replaced with apples

            } 
        }
        var that = p;
        try {
            const img = mapPres;
            setGCTX(img);
            ctx.clearRect(0, 0, img.img.width, img.img.height);
            p.img.bg(
                new ColorDetails(
                    "#000000","#000000"
                )
            );
            if(difficulty===0 || p.isGameOver) {
                if(p.isGameOver) p.shouldRender = false;
                for(var y=0; y<mapH; y++) 
                    for(var x=0; x<mapW; x++) 
                        drawOnePX(x,y); 
            } 
            if(difficulty!==0) {
                for(var y = (p.playerPos[1]>1?p.playerPos[1]:2)-1; y < p.playerPos[1]+2; y++)
                    for(var x = (p.playerPos[0]>1?p.playerPos[0]:2)-1; x < p.playerPos[0]+2; x++)
                        drawOnePX(x,y);
            }
        } catch (e) {
            console.log(e);
        }
    }
    async sceneGame() {
        this.gameMapBg();
        
        this.renderPlayer();
        
    }
}
function drawOnePX(x,y) {
    let img = mapPres;
    if(p.yxGameMap[y][x] == "G") {
        img.rect(
            x,
            y,
            1,
            1,
            new ColorDetails("#001100", "#00aa00"),
            new Properties(0.25)
        );
    } else if(p.yxGameMap[y][x] == "W") {
        img.rect(
            x,
            y,
            1,
            1,
            new ColorDetails("#000011", "#0000aa"),
            new Properties(0.25)
        );
    } else if(p.yxGameMap[y][x] == "A") {
        img.rect(
            x,
            y,
            1,
            1,
            new ColorDetails("#110000", "#aa0000"),
            new Properties(0.25)
        );
    } else if(p.yxGameMap[y][x] == "U") {
        img.rect(
            x,
            y,
            1,
            1,
            new ColorDetails("#111111", "#aaaaaa"),
            new Properties(0.25)
        );
    }
} 
function until(conditionFunction) {

  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }

  return new Promise(poll);
}
const run = async () => {
    p = new SHGTW(new Image("canv", 1300,500));
    mapPres = p.img;
};
window.onload = async() => {
    run();
    p.run();
    p.gameMapBg();
};
