# Bring in deps
import os 
from apikey import apikey 

import streamlit as st 
from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain 
from langchain.memory import ConversationBufferMemory

os.environ['OPENAI_API_KEY'] = apikey

# App framework
st.title('Echo')
language_prompt = st.text_input('Language Prompt', key='language_prompt')
scenario_prompt = st.text_input('Scenario Prompt', key='scenario_prompt')

# Prompt templates
scenario_template = PromptTemplate(
    input_variables = ['language','scenario'], 
    template='User wants to have a conversation about this scenario in {language}: {scenario} 1. Give an example conversation for the user to practice using this scenario 2. Give vocabulary for the user to practice'
)

# script_template = PromptTemplate(
#     input_variables = ['title', 'wikipedia_research'], 
#     template='write me a youtube video script based on this title TITLE: {title} while leveraging this wikipedia reserch:{wikipedia_research} '
# )

# Memory 
scenario_memory = ConversationBufferMemory(input_key='scenario', memory_key='chat_history')
# script_memory = ConversationBufferMemory(input_key='title', memory_key='chat_history')


# Llms
llm = OpenAI(temperature=0) 
lesson_chain = LLMChain(llm=llm, prompt=scenario_template, verbose=True, output_key='lesson', memory=scenario_memory)
# script_chain = LLMChain(llm=llm, prompt=script_template, verbose=True, output_key='script', memory=script_memory)

# Show stuff to the screen if there's a prompt
if language_prompt and scenario_prompt: 
    lesson = lesson_chain.run(language=language_prompt, scenario=scenario_prompt)

    st.write(lesson) 

    with st.expander('Lesson History'): 
        st.info(scenario_memory.buffer)
