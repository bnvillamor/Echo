from flask import Flask, request, jsonify
from flask_cors import CORS

import os 
from apikey import apikey 

from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

app = Flask(__name__)
CORS(app)

os.environ['OPENAI_API_KEY'] = apikey

scenario_template = PromptTemplate(
    input_variables=['language', 'scenario'],
    template='User wants to have a conversation about this scenario in {language}: {scenario} 1. Give an example conversation for the user to practice using this scenario 2. Give vocabulary for the user to practice'
)

scenario_memory = ConversationBufferMemory(input_key='scenario', memory_key='chat_history')
llm = OpenAI(temperature=0)
lesson_chain = LLMChain(llm=llm, prompt=scenario_template, verbose=True, output_key='lesson', memory=scenario_memory)

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.json
    
    language_prompt = data.get('language', '')
    scenario_prompt = data.get('scenario', '')

    if language_prompt and scenario_prompt:
        lesson = lesson_chain.run(language=language_prompt, scenario=scenario_prompt)
        response = {'lesson': lesson}
    else:
        response = {'error': 'Language and scenario prompts are required.'}

    response['lesson_history'] = scenario_memory.buffer

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=8000)