# Bring in deps
import os 
from apikey import apikey 

import streamlit as st 
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain 
from langchain.memory import ConversationBufferMemory

os.environ['OPENAI_API_KEY'] = apikey

# App framework
st.title('Echo')
prompt = st.text_input('') 

# Prompt templates
scenario_template = PromptTemplate(
    input_variables = ['scenario'], 
    template='You are making a language lesson plan using these criteria: User is learning: Spanish - User wants to have a conversation about this scenario: {scenario} User wants to learn doing these 3 stages of learning: 1. Learn vocab through repetition(typing/speaking) 2. Learning sentence structure using the vocab(typing/speaking) 3. Give an example conversation for the user to practice using this scenario'
)

# script_template = PromptTemplate(
#     input_variables = ['title', 'wikipedia_research'], 
#     template='write me a youtube video script based on this title TITLE: {title} while leveraging this wikipedia reserch:{wikipedia_research} '
# )

# Memory 
scenario_memory = ConversationBufferMemory(input_key='scenario', memory_key='chat_history')
# script_memory = ConversationBufferMemory(input_key='title', memory_key='chat_history')


# Llms
llm = OpenAI(temperature=0.9) 
lesson_chain = LLMChain(llm=llm, prompt=scenario_template, verbose=True, output_key='lesson', memory=scenario_memory)
# script_chain = LLMChain(llm=llm, prompt=script_template, verbose=True, output_key='script', memory=script_memory)

# Show stuff to the screen if there's a prompt
if prompt: 
    lesson = lesson_chain.run(prompt)

    st.write(lesson, caching=False) 

    with st.expander('Lesson History'): 
        st.info(scenario_memory.buffer)
