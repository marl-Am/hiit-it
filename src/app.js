
window.onload = function () {
    var timeIntervalQueue = [];
    var timeIntervalStatusQueue = [];

    var bellAudio;
    var countDownAudio;

    var warmupString = "WARMUP";
    var runString = "RUN";
    var restString = "REST";
    var cooldownString = "COOLDOWN";

    var sessions = document.getElementById("sessions");
    var warmupSecs = document.getElementById("warmup-secs");
    var runSecs = document.getElementById("run-secs");
    var restSecs = document.getElementById("rest-secs");
    var cooldownSecs = document.getElementById("cooldown-secs");

    var warmup;
    var run;
    var rest;
    var cooldown;

    var roundName = document.getElementById("round-name");
    var timer = document.getElementById("timer");

    var timeInterval;
    var time;
    var time;
    var totalTime;
    var rounds;

    var isTimerRunning = true;

    var startBtn = document.getElementById("start");
    var pauseBtn = document.getElementById("pause");
    var resetBtn = document.getElementById("reset");

    startBtn.onclick = function () {

        if (isTimerRunning) {

            warmup = parseInt(warmupSecs.value, 10);
            run = parseInt(runSecs.value, 10);
            rest = parseInt(restSecs.value, 10);
            cooldown = parseInt(cooldownSecs.value, 10);
            rounds = parseInt(sessions.value, 10);

            // Default input
            if(warmupSecs.value.length == 0) warmup = 60;
            if(runSecs.value.length == 0) run = 30;
            if(restSecs.value.length == 0) rest = 15;
            if(cooldownSecs.value.length == 0) cooldown = 60;

            totalTime = warmup + cooldown + (run + rest) * rounds;

            populateQueues();
            playBell();
            hidePage1();
            focusOnClock();
            turnOnClock();
        }

    }

    pauseBtn.onclick = function () {
        temp = time;
        stopTimer();
        bellAudio.pause();
        countDownAudio.pause();
        isTimerRunning = false;
    }

    resetBtn.onclick = function () {
        bellAudio.pause();
        bellAudio.currentTime = 0;

        countDownAudio.pause();
        countDownAudio.currentTime = 0;
        stopTimer();

        document.getElementById("control-form").reset();
        roundName.innerHTML = "";
        timer.innerHTML = "";

        // Stop hiding page1 which shows the controls for the clock
        if (page1.style.display === "none") {
            page1.style.display = "block";
        }
    }

    function populateQueues() {
        timeIntervalQueue.push(warmup);
        timeIntervalStatusQueue.push(warmupString);
        for (let i = 0; i < rounds; i++) {
            timeIntervalQueue.push(run);
            timeIntervalStatusQueue.push(runString);
            timeIntervalQueue.push(rest);
            timeIntervalStatusQueue.push(restString);
        }
        timeIntervalQueue.push(cooldown);
        timeIntervalStatusQueue.push(cooldownString);

    }

    function turnOnClock() {
        time = timeIntervalQueue.shift();
        roundName.innerHTML = timeIntervalStatusQueue.shift();

        // if ( isTimerRunning === false) {
        //     timeInterval = setInterval(runCountDown(temp), 1000);
        // }
        if (isTimerRunning) {
            isTimerRunning = false;
            timeInterval = setInterval(countDownClock, 1000);
        }
    }

    function stopTimer() {
        isTimerRunning = true;
        if (timeInterval) {
            clearInterval(timeInterval);
        }
    }

    function countDownClock() {
        // if (temp){
        //     time = temp;
        //     time -= 1;
        //     renderTime();
        //     if (time === 11) {
        //         playCountDown();
        //     }
        //     else if (time === 0 && timeIntervalQueue.length > 0 && timeIntervalStatusQueue.length > 0){
        //         time = timeIntervalQueue.shift();
        //         roundName.innerHTML = timeIntervalStatusQueue.shift();
        //         playBell();
        //     }
        //     else if (time === 0 && timeIntervalQueue.length === 0 && timeIntervalStatusQueue.length === 0) {
        //         stopTimer();
        //         playBell();
        //         showTotalTime();
        //     }
        // }

        time -= 1;
        renderTime();
        if (time === 11) {
            playCountDown();
        }
        else if (time === 0 && timeIntervalQueue.length > 0 && timeIntervalStatusQueue.length > 0) {
            time = timeIntervalQueue.shift();
            roundName.innerHTML = timeIntervalStatusQueue.shift();
            playBell();
        }
        else if (time === 0 && timeIntervalQueue.length === 0 && timeIntervalStatusQueue.length === 0) {
            stopTimer();
            playBell();
            showTotalTime();
        }

    }

    function showTotalTime() {
        roundName.innerHTML = "Total Time";
        var m = Math.floor(totalTime / 60);
        var s = totalTime % 60;

        if (m > 0 && s < 10) {
            timer.innerHTML = m + ":0" + s;
        }
        else if (m > 0 && s > 9) {
            timer.innerHTML = m + ":" + s;
        }
        else {
            timer.innerHTML = s;
        }
    }

    function renderTime() {
        timer.innerHTML = parseInt(time, 10);
    }

    function hidePage1() {
        if (page1.style.display === "none") {
            page1.style.display = "block";
        }
        else {
            page1.style.display = "none";
        }
    }

    function focusOnClock() {
        var elem = document.getElementById("page2");
        elem.scrollIntoView();
    }

    /*Audio files*/
    function playBell() {
        bellAudio = new Audio('bells.wav');
        try {
            bellAudio.play();
        } catch (err) {
            console.log('Failed to play bells...' + err);
        }
    }

    function playCountDown() {
        countDownAudio = new Audio('countdown.wav');
        try {
            countDownAudio.play();
        } catch (err) {
            console.log('Failed to play countdown...' + err);
        }
    }
}