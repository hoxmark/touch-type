// src/components/TypingExercise.js
import React, { useEffect, useState } from "react";
import '../css/TypingExcercise.css';
import useWPM from '../hooks/useWPM'; // Import the custom hook
import NorwegianMacKeyboard from "./keyboards/NorwegianMacKeyboard";


function TypingExercise() {
    const [exercises, setExercises] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Check if the task is completed and stop the timer if it is.
        if (isCompleted) {
            stopTimer();
        }
    }, [isCompleted]);

    const {
        startTime,
        elapsedTime,
        WPM,
        startTimer,
        stopTimer,
        calculateWPM
    } = useWPM();  // Use the custom hook


    useEffect(() => {
        fetch('/api/exercises/')
            .then(response => response.json())
            .then(data => setExercises(data));
    }, []);



    const highlightCharDifferences = (content, input) => {
        const contentChars = content.split('');
        const inputChars = input.split('');

        return contentChars.map((char, index) => {
            let className = "character-key"; // Default class

            if (index === input.length) {
                className += " active";  // Add the active class
            }

            if (inputChars[index] === char) {
                className += " correct";
            } else if (inputChars[index]) {
                className += " incorrect";
                // char = inputChars[index];  // Overwrite with the input character for incorrect chars
            }
            char = char === " " ? "␣" : char;
            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        });
    };


    return (
        <div>
            <section className="exercise-section">

                {exercises.map(exercise => (
                    <div className="exercise-container" key={exercise.id}>
                        <header className="exercise-header">
                            <h2>{exercise.title}</h2>
                            <p>Time elapsed: {elapsedTime} seconds</p>
                            <p>WPM: {WPM}</p>
                        </header>

                        <div className="exercise-content">
                            <div className="text-display">
                                {highlightCharDifferences(exercise.content, userInput)}
                            </div>

                            {!isCompleted && <p className="next-character">Next character: <span>{exercise.content[userInput.length] || 'End'}</span></p>}
                            {!isCompleted && <textarea
                                rows="5"
                                style={{ position: 'absolute', left: '-9999px' }} // Hide visually                                
                                autoFocus // Automatically focus on load
                                value={userInput}
                                onChange={e => {
                                    if (!userInput && !startTime) {
                                        startTimer();
                                    }
                                    if (e.target.value === exercise.content) {
                                        setIsCompleted(true);
                                    } else {
                                        setIsCompleted(false);
                                    }
                                    setUserInput(e.target.value);
                                    calculateWPM(e.target.value);
                                }}
                            />}

                            {isCompleted && <footer className="exercise-footer">Congratulations on completing the exercise!</footer>}
                        </div>

                        <h3>Look at this keyboard, not your own</h3>
                        <NorwegianMacKeyboard
                            targetKey={(exercise.content[userInput.length] || '').toUpperCase()}
                        />
                    </div>


                ))}
            </section>

        </div>
    );



}

export default TypingExercise;
