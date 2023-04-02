let quoteText = document.querySelector("#quoteText");

let timerInfo = [
  ["Time to focus", 25],
  ["Take a quick break", 5],
  ["Get back in the zone", 25],
  ["You need break to focus.", 5],
  ["Come on, final push.", 25],
  ["Step back. Stop working. Relax.", 30],
];

let currentState = 0;

function startTimer() {
  // Unix timestamp (in seconds) to count down to
  var time = timerInfo[currentState][1] * 60;
  var timeFromNow = new Date().getTime() / 1000 + time;

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
  // Get references to the chat elements
  const chatPopup = document.getElementById("chatPopup");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");

  // Function to add a new message to the chat
  function addMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
  }

  // Event listener for when the user clicks the "Open Chat" button
  document.getElementById("openChat").addEventListener("click", function () {
    // Display the pop-up chat
    chatPopup.style.display = "block";
  });

  // Event listener for when the user submits a new message
  chatInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13 && chatInput.value.trim() !== "") {
      // Add the new message to the chat
      addMessage(chatInput.value);
      // Clear the input field
      chatInput.value = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", startTimer);
