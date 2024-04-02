import React, { useState } from 'react';
import axios from 'axios';

function Lesson() {
    const [languagePrompt, setLanguagePrompt] = useState('');
    const [scenarioPrompt, setScenarioPrompt] = useState('');
    const [lesson, setLesson] = useState('');
    const [lessonHistory, setLessonHistory] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/process_text', {
                language: languagePrompt,
                scenario: scenarioPrompt
            });
            setLesson(response.data.lesson);
            setLessonHistory(response.data.lesson_history);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Language Prompt:</label>
                <input 
                    className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    value={languagePrompt} 
                    onChange={(e) => setLanguagePrompt(e.target.value)} 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Scenario Prompt:</label>
                <input 
                    className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    value={scenarioPrompt} 
                    onChange={(e) => setScenarioPrompt(e.target.value)} 
                />
            </div>
            <button 
                className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
            >
                Generate Lesson
            </button>
            <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Generated Lesson:</h2>
                {lesson && (
                    <div>
                        {lesson.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-800 mb-2">{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Lesson History:</h2>
                {lessonHistory && (
                    <div>
                        {lessonHistory.split('\n').map((item, index) => (
                            <div key={index} className="mb-2">
                                <p className="text-gray-800">{item}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Lesson;