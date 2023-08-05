// src/components/ExerciseContent.js
import React from 'react';


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

function ExerciseContent({ content, userInput, isCompleted, onInputChange }) {
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
                    rows="5"
                    style={{ position: 'absolute', left: '-9999px' }}
                    autoFocus
                    value={userInput}
                    onChange={onInputChange}
                />
            )}
        </div>
    );
}

export default ExerciseContent;
