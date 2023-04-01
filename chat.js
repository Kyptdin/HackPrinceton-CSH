const openai = require('openai');

// Set up OpenAI API key and model ID
const OPENAI_API_KEY = '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';
const MODEL_ID = 'davinci'; // You can also use another GPT-3 model here

// Configure OpenAI
openai.api_key = OPENAI_API_KEY;

// Define function to generate text using OpenAI
async function generateText(prompt) {
  const response = await openai.completions.create({
    engine: MODEL_ID,
    prompt: prompt,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  // Extract the generated text from the response
  const text = response.choices[0].text.trim();

  return text;
}

// Define function to start the chatbot
async function startChatbot() {
  // Initialize the conversation with a greeting
  let conversation = await generateText('Hi, how can I help you today?');

  // Loop to continue the conversation
  while (true) {
    // Log the current conversation and wait for user input
    console.log(conversation);
    const input = await new Promise((resolve) => {
      const stdin = process.stdin;
      stdin.setEncoding('utf8');
      stdin.on('data', (data) => resolve(data.trim()));
    });

    // Exit the loop if the user says "bye"
    if (input.toLowerCase() === 'bye') {
      console.log('Goodbye!');
      break;
    }

    // Generate a response to the user's input
    const response = await generateText(input);

    // Add the user's input and the AI's response to the conversation
    conversation += '\n\n' + input + '\n' + response;
  }
}

// Start the chatbot
startChatbot().catch((error) => console.error(error));
