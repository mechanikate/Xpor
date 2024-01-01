/*
 * SHGTW v0.9.99LB
 * Welcome to this strange mess of code (v2 this time, for level building!)
 * -kate
 */
m_package([media]);

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}
var lvlList = [];
var dialogueList = [];
class OpenVS extends Presentation {
    constructor(img) {
        super(img);
        this.img = img;
        this.speed = this.img.u;
        //this.map = {"w":false,"a":false,"s:":false,"d":false};
        this.map = {};
        this.mapList = [0,"GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG"
        ];
        this.reset = true;
        this.lvl = 1;
        this.keystrokes = 0;
        //this.coins = 0;
    }
    async doReset() {
        const that = this;
        that.playerPos = [0, 0];
        that.keystrokes = 0;
        that.yxGameMap = that.mapList[1].split("\n");
    }
    async movement(evt) {
        var that = p;
        try {
            that.map[evt.key] = evt.type == "keydown";
            if ((that.map["ArrowUp"]) && that.playerPos[1] >= 1) {                evt.preventDefault();
                that.playerPos[1] = that.playerPos[1] - that.speed / that.img.u;
                that.keystrokes++;
            }
            if (
                (that.map["ArrowDown"]) &&
                p.playerPos[1] + 2 <= p.yxGameMap.length
            ) {
                evt.preventDefault();
                that.playerPos[1] = that.playerPos[1] + that.speed / that.img.u;
                that.keystrokes++;
            }
            if (that.map["ArrowRight"]) {
                evt.preventDefault();
                if (that.playerPos[0] + 2 <= that.yxGameMap[0].length) {
                    that.playerPos[0] = that.playerPos[0] + that.speed / that.img.u;
                    that.keystrokes++;
                }
            }
            if ((that.map["ArrowLeft"]) && that.playerPos[0] >= 1) {
                evt.preventDefault();
                that.playerPos[0] = that.playerPos[0] - that.speed / that.img.u;
                that.keystrokes++;
            }
            if (that.map["0"]) {
                console.log("0");
                p.mapList[1]=p.mapList[1].replaceAt(p.playerPos[1]*33+p.playerPos[0],"G");
                p.yxGameMap = p.mapList[1].split("\n");
            }
            if (that.map["1"]) {
                p.mapList[1]=p.mapList[1].replaceAt(p.playerPos[1]*33+p.playerPos[0],"E");
                p.yxGameMap = p.mapList[1].split("\n");
            }
            if (that.map["2"]) {
                
                p.mapList[1]=p.mapList[1].replaceAt(p.playerPos[1]*33+p.playerPos[0],"F");
                p.yxGameMap = p.mapList[1].split("\n");
            }
            if (that.map["3"]) {
                
                p.mapList[1]=p.mapList[1].replaceAt(p.playerPos[1]*33+p.playerPos[0],"W");
                p.yxGameMap = p.mapList[1].split("\n");
            }
            if (that.map["4"]) {
                
                p.mapList[1]=p.mapList[1].replaceAt(p.playerPos[1]*33+p.playerPos[0],"L");
                p.yxGameMap = p.mapList[1].split("\n");
            }
            if (that.map["5"]) {
                
                p.mapList[1]=p.mapList[1].replaceAt(p.playerPos[1]*33+p.playerPos[0],"f");
                p.yxGameMap = p.mapList[1].split("\n");
            }
            if (that.map["6"]) {
                
                p.mapList[1]=p.mapList[1].replaceAt(p.playerPos[1]*33+p.playerPos[0],"B");
                p.yxGameMap = p.mapList[1].split("\n");
            }
        } catch (e) {
            console.log(e);
        }
        document.getElementById("curr").innerHTML = that.keystrokes;
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
                this.img.bg(new ColorDetails(p.lvl >= 26 ? "#000000" : "#ffffff", p.lvl >= 26 ? "#000000" : "#ffffff"));
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
    async sceneGame() {
        this.gameMapBg();
        this.renderPlayer();
    }
}
var p;
const run = async () => {
    p = new OpenVS(new Image("canv", 1920, 1080));
};
window.onload = () => {
    run();
    p.run();
};
function nextLvl() {
    p.mapList[1]="GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";
    p.yxGameMap = p.mapList[1].split("\n");
}

function addLvl() {
    lvlList.push(p.mapList[1]);
    dialogueList.push(dialogue.value);
    dialogue.value="";
}
function exportLvl() {    
    var result = lvlList;
    result = result.map((e,i) => {console.log(e,i,dialogueList[i]); return [e,dialogueList[i]]});
    console.log(result);
    exportedLevel.innerHTML=btoa(JSON.stringify(result));
}