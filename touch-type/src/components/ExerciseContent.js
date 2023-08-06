// src/components/ExerciseContent.js
import React, { useEffect, useRef } from 'react';


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
    const textareaRef = useRef();


    useEffect(() => {
        const handleBlur = (e) => {
            // Check if the related target (element gaining focus) is not one of the buttons or header elements
            if (e.relatedTarget && (e.relatedTarget.id === 'backButton'
                || e.relatedTarget.id === 'restartButton'
                || e.relatedTarget.id === 'loginButton'
                || e.relatedTarget.id === 'headerLogo')) {
                return;
            }

            if (textareaRef.current) {
                textareaRef.current.focus();
            }
        };

        const textarea = textareaRef.current;
        textarea.addEventListener('blur', handleBlur);

        return () => {
            textarea.removeEventListener('blur', handleBlur);
        };
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
                />
            )}
        </div>
    );
}

export default ExerciseContent;