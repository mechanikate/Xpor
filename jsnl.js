var Scurve = (a,b,c) => Math.atan((a+b+c)/3);
// var lerp = (t, a1, a2) => a1+t*(a2-a1);
var rangedRandom = (min, max) => Math.random() * (max - min) + min;

/*
 * olrandom(w) INTERNAL
 * List with each element being a random float between 0 and 1.
 * w being list length
 */
var olrandom = (w) => {
    var result = [];
    for (var ib = 0; ib < w; ib++) {
        result.push(Math.random());
    }
    return result;
}
/*
 * random(w,h) EXTERNAL
 * List of lists with each element value being a random float between 0 and 1.
 * w being list contained in list length
 * h being list of lists length
 */
var random = (w, h) => {
    var result = [];
    for (var i = 0; i < h; i++) {
        result.push([]);
        result[i] = olrandom(w);
    }
    return result;
}
/*
 * perlinh(rand) INTERNAL
 * Perlin noise across one list
 * rand being a olrandom result
 */
var perlinh = (rand) => {
    var result = Array(rand.length);
    result = result.fill(0);
    for (var y = 0; y < rand.length; y++) {
        result[y] = Scurve(
            ((rand[y - 1] == null) ? rand[rand.length-1] : rand[y - 1]),
            rand[y],
            ((rand[y + 1] == null) ? rand[0] : rand[y + 1])
        );
    }
    return result;
}
class NL {
    constructor(width, height, settings) {
        this.w = width;
        this.h = height;
        this.se = settings;
    }
    random() {
        var result = [];
        for (var i = 0; i < this.h; i++) {
            result.push([]);
            result[i] = olrandom(this.w);
        }
        return result;
    }
    realRandom(w, h) {
        var list = [];
        for(var y=0; y<h; y++) {
            var innerList = [];
            for(var x=0; x<w; x++) {
                innerList.push(rangedRandom(0, 2*Math.PI));
            }
            list.push(innerList);
        }
        return list;
    }
    p() {
        var rand = random(this.w, this.h);
        return this.fp(rand);
    }
    fp(rand) {
        var result = Array(this.h).fill(new Array(this.w));
        for (var y = 0; y < this.h; y++) {
            result[y] = perlinh(rand[y]);
        }
        for (var x = 0; x < this.w; x++) {
            var temp = [];
            for (var y = 0; y < this.h; y++) {
                temp.push(result[y][x]);
            }
            temp = perlinh(temp);
            for (var y = 0; y < this.h; y++) {
                result[y][x] = temp[y];
            }
        }
        return result;
    }
    lp() {
        return this.flp(this.p(this.w, this.h));
    }
    flp(pa) {
        var perlins = Array(this.se.layers).fill(0);
        for (var i = 0; i < this.se.layers; i++) {
            perlins[i] = this.p(this.w, this.h);
        }
        for (var i = 0; i < this.se.intensity; i++) {
            perlins[i] = pa;
        }
        var result = [];
        for (var y = 0; y < this.h; y++) {
            result.push([]);
            for (var x = 0; x < this.w; x++) {
                var num = 0;
                for (var pv = 0; pv < this.se.layers; pv++) {
                    num += perlins[pv][y][x];
                }
                num /= this.se.layers;
                result[y].push(num);
            }

        }
        return result;
    }
    realPerlin(randlist) {
        for(var y=0; y<randList.length; y++) {
            for(var x=0; x<randList[y].length; x++) {

            }
        }
    }
}