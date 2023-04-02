let quoteText = document.querySelector("#quoteText");

let timerInfo = [
    ["Time to focus", 25],
    ["Take a quick break", 5],
    ["Get back in the zone", 25],
    ["You need break to focus.", 5],
    ["Come on, final push.", 25],
    ["Step back. Stop working. Relax.", 30]
]

let currentState = 0;

function startTimer() {
    // Unix timestamp (in seconds) to count down to
    var time = timerInfo[currentState][1] * 60;
    var timeFromNow = (new Date().getTime() / 1000) + time;

    quoteText.innerHTML = timerInfo[currentState][0];
  
    // Set up FlipDown
    var flipdown = new FlipDown(timeFromNow)
  
      // Start the countdown
      .start()
  
      // Do something when the countdown ends
      .ifEnded(() => {
        currentState += 1;
        
        if (currentState > timerInfo.length - 1) {
            currentState = 0;
        }

        startTimer();
      });
}

document.addEventListener('DOMContentLoaded', startTimer);