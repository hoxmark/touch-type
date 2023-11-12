// src/components/ExerciseContent.js

import React, { useEffect, useRef } from 'react';
import '../css/ExerciseContent.css';

const highlightCharDifferences = (content, input) => {
    const contentChars = content.split('');
    const inputChars = input.split('');
    const maxLength = Math.max(contentChars.length, inputChars.length); // Extend to the longest array

    return Array.from({ length: maxLength }).map((_, index) => {
        let className = "character-key";
        let charToDisplay = contentChars[index] || ' '; // Default to space if content is shorter than input

        // If the current index exceeds the input length, we treat it as an untyped space
        const isUntyped = index >= input.length;
        const isSpace = charToDisplay === ' ';
        const inputChar = isUntyped ? null : inputChars[index]; // Input character or null if untyped

        // Add 'active' class if this is the next character to be typed
        if (index === input.length) className += " active";

        // Add 'correct' or 'incorrect' class based on comparison
        if (!isUntyped) {
            if (inputChar === charToDisplay) {
                className += " correct";
            } else if (inputChar !== charToDisplay) {
                className += " incorrect";
                if (isSpace) {
                    charToDisplay = '·'; // Use '·' to indicate space
                }
            }
        }

        // Handle multiple spaces by showing the middle dot for extra spaces typed by the user
        if (index >= content.length && inputChar === ' ') {
            className += " incorrect";
            charToDisplay = '·'; // Use '·' to indicate space
        }

        return (
            <span key={index} className={className}>
                {charToDisplay === ' ' ? <span className="space-placeholder">&nbsp;</span> : charToDisplay}
                {charToDisplay === "⏎" ? <br /> : null}
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
