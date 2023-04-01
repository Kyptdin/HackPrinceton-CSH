import React, { useState } from "react";
import { Configuration, OpenAIApi } from "@openai/api";
import "./Chatbot.css";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (input === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
    });
    const message = completion.data.choices[0].text;
    setMessages([...messages, { text: message, sender: "bot" }]);
    setInput("");
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "user"
                ? "chatbot-message user-message"
                : "chatbot-message bot-message"
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
