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
  const chatMessages = document.getElementById("messages");
  const chatInput = document.getElementById("textbox");

  // Function to add a new message to the chat
  function addMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
  }

  function generateRandomUsername() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const username = "user_" + randomNumber;
    return username;
  }

  let newName = generateRandomUsername();

  function addMessage(username, message, override = false) {
    // Truncate the message if it exceeds 30 characters.
    if (message.length > 25 && override) {
      message = message.substr(0, 25) + "...";
    }
  
    const messageElement = document.createElement("div");
    messageElement.classList.add("messageBox");
  
    const usernameElement = document.createElement("span");
    const messageText = document.createElement("span");
    const timestampElement = document.createElement("span");
  
    usernameElement.innerText = username + ": ";
    usernameElement.classList.add("username");

    messageText.innerText = message;
    messageText.classList.add("message");

    const timestamp = new Date().toLocaleString([], { hour: "numeric", minute: "numeric" }); // Only display the hour and minute.
    timestampElement.innerText = `(${timestamp}) `;
    timestampElement.classList.add("timeStamp");
  
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(messageText);
    messageElement.appendChild(timestampElement);
  
    chatMessages.appendChild(messageElement);
  }

  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

  function handleUserInput(event) {
    const message = event.target.value.trim();
    if (message !== "" && event.key === "Enter") {
      addMessage(newName, message, false);

      // ai bot
      if (message.startsWith("@gpt")) {
        const requestBody = {
          prompt: message.replace("@gpt", "").trim(),
          max_tokens: 10,
          n: 1,
          stop: "\n",
        };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        };
        

        fetch(apiUrl, requestOptions)
          .then(response => response.json())
          .then(data => addMessage("GPT", data, true));

      };
      event.target.value = "";
    }
  }

  chatInput.addEventListener("keyup", handleUserInput);
  
  

  // // Event listener for when the user submits a new message
  // chatInput.addEventListener("input", function(event) {
  //   const message = event.target.value;
  //   if (message.trim() !== "") {
  //     addMessage("User", message);
  //   }
  // });
  // Event listener for when the user submits a new message
chatInput.addEventListener("keyup", function(event) {
  const message = event.target.value.trim();
  if (message !== "" && event.key === "Enter") {
    addMessage(newName, message);
    event.target.value = "";
  }
});

  
  
}

document.addEventListener("DOMContentLoaded", startTimer);
