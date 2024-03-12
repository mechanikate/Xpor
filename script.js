/* 
Welcome to Xpor's source.
*/
m_package([media]);
var mapW = 25;
var mapH = 25;
var n = new NL(mapW, mapH, {
    layers: 35
});
var viewDist = 5;
var lpd = n.lp();
var owMap = [];
for(var y=0; y<mapH; y++) {
    owMap.push([]);
    for(var x=0; x<mapW; x++) {
        owMap[y].push(lpd[y][x] >= 0.4375 ? "G":"W");
    }
    owMap[y].push("\n");
    owMap[y] = owMap[y].join("");
}
owMap = owMap.join("");
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
        this.img = img;
        this.speed = this.img.u;
        this.map = {};
        this.mapList = [owMap];
        this.gameMap = this.mapList[0];
        this.reset = true;
        this.lvl = 1;
        this.keystrokes = 0;
        //this.coins = 0;
    }
    async doReset() {
        const that = this;
        that.playerPos = [1,1];
        this.gameMapBg();
    }
    async movement(evt) {
        var that = p;
        try {
            that.map[evt.key] = evt.type == "keydown";
            if(
                (that.map["w"] || that.map["ArrowUp"]) &&
                that.playerPos[1] >= 2
            ) {
                evt.preventDefault();
                that.playerPos[1] = that.playerPos[1] - that.speed / that.img.u;
            }
            if(
                (that.map["s"] || that.map["ArrowDown"]) &&
                p.playerPos[1]+4 <= p.yxGameMap.length
            ) {
                evt.preventDefault();
                that.playerPos[1] = that.playerPos[1] + that.speed / that.img.u;
            }
            if(that.map["d"] || (that.map["ArrowRight"])) {
                evt.preventDefault();
                if(
                    !(that.playerPos[0] + 4 >= that.yxGameMap[0].length - 1 && p.lvl == 9)
                ) {
                    that.playerPos[0] = that.playerPos[0] + that.speed / that.img.u;
                }
            }
            if(
                (that.map["a"] || that.map["ArrowLeft"]) &&
                that.playerPos[0] >= 2
            ) {
                evt.preventDefault();
                that.playerPos[0] = that.playerPos[0] - that.speed / that.img.u;
            }
        } catch (e) {
            if(!errored) console.log(e.stack);
            errored = true;
        }
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
                ctx.clearRect(0, 0, p.img.w, p.img.h);
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
            new ColorDetails("#ff000055", "#ff000055"),
            new Properties(0)
        );
    }
    async gameMapBg() {
        var that = p;
        try{p.yxGameMap = p.gameMap.split("\n");}catch(e){}
        try {
            const img = mapPres;
            setGCTX(img);
            ctx.clearRect(0, 0, img.img.width, img.img.height);
            mapPres.bg(
                new ColorDetails(
                    "#000000","#000000"
                )
            );
            for(var y = (p.playerPos[1]>1?p.playerPos[1]:2)-1; y < p.playerPos[1]+2; y++) {
                for(var x = (p.playerPos[0]>1?p.playerPos[0]:2)-1; x < p.playerPos[0]+2; x++) {
                    if(that.yxGameMap[y][x] == "G") {
                        img.rect(
                            x,
                            y,
                            1,
                            1,
                            new ColorDetails("#001100", "#00aa00"),
                            new Properties(0.25)
                        );
                    } else if(that.yxGameMap[y][x] == "W") {
                        img.rect(
                            x,
                            y,
                            1,
                            1,
                            new ColorDetails("#000011", "#0000aa"),
                            new Properties(0.25)
                        );
                    }
                }
            }
        } catch (e) {
            if(!errored) console.log(e)
            errored=true;
        }
    }
    async sceneGame() {
        this.gameMapBg();
        
        this.renderPlayer();
        
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
    p = new SHGTW(new Image("canv", 2000, 700));
    mapPres = p.img;
};
window.onload = async() => {
    run();
    p.run();
    p.gameMapBg();
};