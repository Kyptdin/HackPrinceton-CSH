function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    
    if(userInput != "") {
      var chatContent = document.querySelector(".chat-content");
      var messageSent = document.createElement("div");
      messageSent.classList.add("message", "sent");
      
      var messageContent = document.createElement("p");
      messageContent.classList.add("message-content");
      messageContent.textContent = userInput;
      
      messageSent.appendChild(messageContent);
      chatContent.appendChild(messageSent);
      
      document.getElementById("user-input").value = "";
    }
  }
  