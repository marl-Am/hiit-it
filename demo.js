var hiitTotalTime;

window.onload = function () {
    var timeIntervals = [];
    var timeInterval;
    var time;
    var clockIsRunning = false;
    var paused = false;
    var warmup = true;
    var showPage1 = false;

    var amountOfRounds = document.getElementById("sessions");
    var warmUpMins = document.getElementById("warmUpMin");
    var warmUpSecs = document.getElementById("warmUpSec");
    var runMins = document.getElementById("runMin");
    var runSecs = document.getElementById("runSec");
    var restMins = document.getElementById("restMin");
    var restSecs = document.getElementById("restSec");
    var coolDownMins = document.getElementById("coolMin");
    var coolDownSecs = document.getElementById("coolSec");

    var warmUpInSeconds = 0;
    var runInSeconds = 0;
    var restInSeconds = 0;
    var coolDownInSeconds = 0;

    hiitTotalTime = 0;
    var totalTime = 0;

    var page1 = document.getElementById("page1");
    var status = document.getElementById("status");
    var currentRoundNumber = document.getElementById("currentRoundNumber");
    var timer = document.getElementById("timer")
    var count = 1;
    /*currentRoundNumber.innerText += "<br>" + currentSessionCount + ": " + amountOfRounds;*/

    var startButton = document.getElementById("start");
    var pauseButton = document.getElementById("pause");
    var resetButton = document.getElementById("reset");

    // warmUpInSeconds = (parseInt(warmUpMins.value, 10) * 60) + parseInt(warmUpSecs.value, 10);
    // runInSeconds = ((parseInt(runMins.value, 10) * 60) + parseInt(runSecs.value, 10)) * parseInt(amountOfRounds.value,10);
    // restInSeconds = ((parseInt(restMins.value, 10) * 60) + parseInt(restSecs.value, 10)) * parseInt(amountOfRounds.value,10);
    // coolDownInSeconds = (parseInt(coolDownMins.value, 10) * 60) + parseInt(coolDownSecs.value, 10);
    // hiitTotalTime = warmUpInSeconds + runInSeconds + restInSeconds + coolDownInSeconds;
    // totalTime = hiitTotalTime;
    // alert("Hiit before:" + hiitTotalTime);

    startButton.onclick = function () {
        warmUpInSeconds = (parseInt(warmUpMins.value, 10) * 60) + parseInt(warmUpSecs.value, 10);
        runInSeconds = ((parseInt(runMins.value, 10) * 60) + parseInt(runSecs.value, 10)) * parseInt(amountOfRounds.value, 10);
        restInSeconds = ((parseInt(restMins.value, 10) * 60) + parseInt(restSecs.value, 10)) * parseInt(amountOfRounds.value, 10);
        coolDownInSeconds = (parseInt(coolDownMins.value, 10) * 60) + parseInt(coolDownSecs.value, 10);
        hiitTotalTime = warmUpInSeconds + runInSeconds + restInSeconds + coolDownInSeconds;
        totalTime = hiitTotalTime;

        clockIsRunning = true;
        hidePage1();
        scrollToClock();

        // After pausing the clock, then restarting the clock, we want page1 to stay hidden
        if (showPage1 == true) {
            page1.style.display = "none";
        }
        turnOnClock();
    }

    pauseButton.onclick = function () {
        time = hiitTotalTime;
        if (timeInterval) {
            paused = true;
            clearInterval(timeInterval);
        }
        showPage1 = true;
    }

    resetButton.onclick = function () {
        window.clearTimeout(timeInterval);
        document.getElementById("myForm").reset();
        status.innerText = "";
        currentRoundNumber.innerText = "";
        timer.innerText = "";
        turnOffClock();

        clockIsRunning = false;
        paused = false;
        warmup = true;
        // Stop hiding page1 which shows the controls for the clock
        page1.style.display = "block";
    }

    /*Fill timeIntervals array with the time in seconds*/
    function fillArrayWithSessionNames() {
        timeIntervals.add("WARM-UP");
        var len = parseInt(amountOfRounds.value);
        for (let i = 0; i < len; i++) {
            timeIntervals.add("RUN!");   // push time running
            timeIntervals.add("REST"); // push time resting

        }
        timeIntervals.add("COOL-DOWN");
    }

    /*Fill timeIntervals array with the time in seconds*/

    /* Start clock countdown */
    function turnOnClock() {
        if (paused && clockIsRunning) {
            timeInterval = setInterval(runCountDown(time), 1000);
        }
        if (clockIsRunning) {
            clockIsRunning = false;
            timeInterval = setInterval(runCountDown, 1000);
        }
    }

    /* Stop clock countdown */
    function turnOffClock() {
        clockIsRunning = true;
        if (timeInterval) {
            clearInterval(timeInterval);
        }
    }

    /* Process to count down the clock */
    function runCountDown(time) {
        if (time) {
            hiitTotalTime = time;
            hiitTotalTime -= 1;
            renderTime();
            if (hiitTotalTime == 10) {
                playCountDown();
            }
            else if (hiitTotalTime === 0) {
                turnOffClock();
                playBell();
                showTotalTime();
            }
            checkForStatusChange();
        }
        else if (!time) {
            hiitTotalTime -= 1;
            renderTime();
            if (hiitTotalTime == 10) {
                playCountDown();
            }
            else if (hiitTotalTime === 0) {
                turnOffClock();
                playBell();
                showTotalTime();
            }
            checkForStatusChange();
        }
    }

    /* Render time on html page */
    function renderTime() {
        var min = Math.floor(hiitTotalTime / 60);
        var sec = hiitTotalTime % 60;
        currentRoundNumber.innerText = count + "/" + amountOfRounds.value;
        if (min <= 0 && sec > 10) {
            timer.innerText = sec;
        }
        else if (min <= 0 && sec < 10) {
            timer.innerText = "0" + sec;
        }
        else if (min > 0 && sec < 10) {
            timer.innerText = min + ":0" + sec;
        }
        else {
            timer.innerText = min + ":" + sec;
        }
    }

    function getRounds() {
        return parseInt(amountOfRounds.value, 10);
    }

    /*Display the name of the hiit session*/
    function showWarmUpText() {
        // change background color
        //document.body.style.background = "pink";
        $("body").css("background", "pink");
        $(".header").css("background", "pink");
        $(".pages").css("background", "pink");
        //document.getElementsByClassName("head").style.background = "pink";
        status.innerText = "WARM-UP";
    }

    function showRunText() {
        // change background color
        $("body").css("background", "red");
        $(".header").css("background", "red");
        $(".pages").css("background", "red");
        status.innerText = "RUN!";
    }

    function showRestText() {
        // change background color
        $("body").css("background", "green");
        $(".header").css("background", "green");
        $(".pages").css("background", "green");
        status.innerText = "REST";
    }

    function showCoolDownText() {
        // change background color
        $("body").css("background", "cyan");
        $(".header").css("background", "cyan");
        $(".pages").css("background", "cyan");
        status.innerText = "COOL-DOWN";
    }
    /*Display the name of the hiit session*/

    function showTotalTime() {
        status.innerText = "TOTAL TIME";
        currentRoundNumber.innerText = "";
        var m = Math.floor(totalTime / 60);
        var s = totalTime % 60;
        if (s < 10) {
            timer.innerText = m + ":0" + s;
        }
        else {
            timer.innerText = m + ":" + s;
        }
    }

    function checkForStatusChange() {
        if (warmup == true) {
            warmup = false;
            showWarmUpText();
        }
        else if (hiitTotalTime == (totalTime - warmUpInSeconds)) {
            showRunText();
            playBell();
        }
        else if (hiitTotalTime == (totalTime - warmUpInSeconds - runInSeconds)) {
            showRestText();
            playBell();
        }
        else if (hiitTotalTime == (totalTime - warmUpInSeconds - runInSeconds - restInSeconds)) {
            showCoolDownText();
            playBell();
        }
    }

    function hidePage1() {
        if (page1.style.display === "none") {
            page1.style.display = "block";
        }
        else {
            page1.style.display = "none";
        }
    }

    function scrollToClock() {
        var elem = document.getElementById("page2");
        elem.scrollIntoView();
    }
    /*Audio files*/
    function playBell() {
        var bellAudio = new Audio('bells.wav');
        bellAudio.play();
    }

    function playCountDown() {
        var countDownAudio = new Audio('countdown.wav');
        countDownAudio.play();
    }
    /*Audio files*/
}
