// src/components/ExerciseContent.js

import React, { useEffect, useRef } from 'react';
import '../css/ExerciseContent.css';

const highlightCharDifferences = (content, input) => {
    const contentChars = content.split('');
    const inputChars = input.split('');

    return contentChars.map((char, index) => {
        let className = "character-key";

        if (index === input.length) {
            className += " active";
        }

        if (inputChars[index] === char) {
            className += " correct";
        } else if (inputChars[index]) {
            className += " incorrect";
        }

        return (
            <span key={index} className={className}>
                {char}
                {char === "⏎" ? <br /> : null}
            </span>
        );
    });
};

function ExerciseContent({ content: originalContent, userInput: originalUserInput, isCompleted, onInputChange }) {
    const content = originalContent
    const userInput = originalUserInput

    const textareaRef = useRef(null);


    useEffect(() => {
        // Only focus on the textarea after the component is mounted
        textareaRef.current.focus();
    }, []);

    return (
        <div className="exercise-content">
            <div className="text-display">
                {highlightCharDifferences(content, userInput)}
            </div>
            {!isCompleted && (
                <p className="next-character">
                    Next character: <span>{content[userInput.length] || 'End'}</span>
                </p>
            )}
            {!isCompleted && (
                <textarea
                    ref={textareaRef}
                    rows="5"
                    style={{ position: 'absolute', left: '-9999px' }}
                    autoFocus
                    value={userInput}
                    onChange={onInputChange}
                    onBlur={() => textareaRef.current.focus()}
                />
            )}
        </div>
    );
}

export default ExerciseContent;
