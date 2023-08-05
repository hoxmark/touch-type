// src/components/NorwegianKeyboard.js
import React from 'react';
import '../../css/keyboards/NorwegianKeyboard.css';

function NorwegianKeyboard() {
    const rows = [
        ['|', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '\\', 'Backspace'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å', 'Ø', 'Enter'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Æ', '\'', '*'],
        ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-', 'Shift'],
        ['Ctrl', 'Alt', ' ', 'AltGr', 'Ctrl']
    ];

    return (
        <div className="keyboard-container">
            {rows.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map(key => (
                        <button className="keyboard-key" key={key}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default NorwegianKeyboard;
