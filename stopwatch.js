var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var startms = performance.now();
function update() {
    gameNotDone = p.lvl < p.mapList.length-1;
    var endms = performance.now();
    milliseconds += endms-startms;
    seconds += Math.floor(milliseconds/1000);
    milliseconds = milliseconds % 1000;
    minutes += Math.floor(seconds/60);
    seconds = seconds % 60;
    hours += Math.floor(minutes/60);
    minutes = minutes % 60;
    stopwatchele.innerHTML=`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${Math.round(milliseconds).toString().padStart(3, "0")}`;
    startms=endms;
}
var stopwatchNotStarted = true;
var gameNotDone = true;
document.addEventListener("keydown", (evt)=>{if(stopwatchNotStarted) {
    startms=performance.now();
    window.setInterval(()=>{if(gameNotDone) update()}, 1);
    stopwatchNotStarted = false;
}});