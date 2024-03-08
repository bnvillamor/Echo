import { config } from "dotenv";
config();

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

const chat = new ChatOpenAI({ temperature: 0 });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "The following is a friendly conversation between a human and an AI. The human will give a scenario and the AI must create an example conversation of the scenario in Spanish. Then, the AI will give vocab that the human should study for the scenario. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

const response = await chain.call({
  input: "Getting a cab at the airport",
});

// const response2 = await chain.call({
//   input: "What is a great place to see there?",
// });

console.log(response);



// import { config } from "dotenv";
// config();

// import { SequentialChain, LLMChain } from "langchain/chains";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { OpenAI } from "langchain/llms/openai";
// import { PromptTemplate } from "langchain/prompts";

// const promptTemplate = new PromptTemplate({
//     template: `You are a playwright. Given the title of play and the era it is set in, it is your job to write a synopsis for that title.
//   Title: {title}
//   Era: {era}
//   Playwright: This is a synopsis for the above play:`,
//     inputVariables: ["title", "era"],
//   });
  
//   const reviewPromptTemplate = new PromptTemplate({
//     template: `You are a play critic from the New York Times. Given the synopsis of play, it is your job to write a review for that play.
    
//       Play Synopsis:
//       {synopsis}
//       Review from a New York Times play critic of the above play:`,
//     inputVariables: ["synopsis"],
//   });
  
//   const overallChain = new SequentialChain({
//     chains: [
//       new LLMChain({
//         llm: new ChatOpenAI({ temperature: 0 }),
//         prompt: promptTemplate,
//         outputKey: "synopsis",
//       }),
//       new LLMChain({
//         llm: new OpenAI({ temperature: 0 }),
//         prompt: reviewPromptTemplate,
//         outputKey: "review",
//       }),
//     ],
//     inputVariables: ["era", "title"],
//     outputVariables: ["synopsis", "review"],
//     verbose: true,
//   });
  
//   const chainExecutionResult = await overallChain.call({
//     title: "Tragedy at sunset on the beach",
//     era: "Victorian England",
//   });
//   console.log(chainExecutionResult);
