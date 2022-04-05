
let times = [];
let interval = [];
let seconds = 60;
let minutes = seconds / 60;

let warmUpString = "WARM-UP";
let runString = "RUN!";
let restString = "REST";
let coolDownString = "COOL-DOWN!";

function hideMenu(){
    let hide = document.getElementById("page1"); // var or let???
    if (hide.style.display === "none"){
        hide.style.display = "block";
    }
    else {
        hide.style.display = "none";
    }
}
function hideClock(){
    let hide = document.getElementById("page2"); // var or let???
    if (hide.style.display === "none"){
        hide.style.display = "block";
    }
    else {
        hide.style.display = "none";
    }
}
function start(){
    let sessionsAmount = document.getElementById("bt-hiit-sessions").value;
    let warmupMins = document.getElementById("warmup-min").value;
    let warmupSecs = document.getElementById("warmup-sec").value;
    let runMins = document.getElementById("run-min").value;
    let runSecs = document.getElementById("run-sec").value;
    let restMins = document.getElementById("rest-min").value;
    let restSecs = document.getElementById("rest-sec").value;
    let coolMins = document.getElementById("cool-min").value;
    let coolSecs = document.getElementById("cool-sec").value;

    document.getElementById("total_rounds").innerHTML = sessionsAmount;
    let warmUp = calculateTime(parseInt(warmupMins), parseInt(warmupSecs));
    let run = calculateTime(parseInt(runMins), parseInt(runSecs));
    let rest = calculateTime(parseInt(restMins), parseInt(restSecs));
    let coolDown = calculateTime(parseInt(coolMins), parseInt(coolSecs));

    updateTime(warmUp, coolDown, run, rest, sessionsAmount);
}

function calculateTime(min, sec){
    let input;
    input = (min * seconds) + sec;
    return input;
}
function saveInputs(){}
function pauseClock(){}

function resetInputs(){
    document.getElementById("myForm").reset(); 
}

function updateTime(warmUp, coolDown, run, rest, sessionsAmount) {
    times.push(warmUp);
    for (let i = 0; i < sessionsAmount; i++) {
        times.push(run);    // push run time to clock
        times.push(rest);   // push rest time to clock
      }
    times.push(coolDown);
    for (let i = 0; i < times.length; i++) {
        countDown(times[i]);// 
    }
}
// convert to minutes
function countDown(timeInSeconds) {
    let min = Math.floor(timeInSeconds/60);
    let sec = timeInSeconds % 60;
    document.getElementById("current_minutes").innerHTML = min;
    document.getElementById("current_seconds").innerHTML = sec;
}

// Audio Functions Begin
// When current timer has reached zero, play the bells
function playBell() {
    let bellAudio = new Audio('sounds\\bells.wav');
    bellAudio.play();
}
// When current timer reaches 10seconds, count down from 10 to 1
function playCountDown() {
    let countDownAudio = new Audio('sounds\\countdown.wav');
    countDownAudio.play();
}
// Audio Functions End