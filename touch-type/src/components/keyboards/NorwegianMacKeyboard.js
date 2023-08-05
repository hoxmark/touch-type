// src/components/NorwegianMacKeyboard.js
import React from 'react';
import '../../css/keyboards/NorwegianMacKeyboard.css';

function NorwegianMacKeyboard({ targetKey }) {
    const rows = [
        ['\'', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' + ', ' ´ ', '⌫'],
        ['⇥', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å', '¨', '⏎'],
        ['⇪', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ø', 'Æ', '@', '⏎'],
        ['⇧', '<', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-', '⇧'],
        ['fn', '⌃', '⌥', '⌘', ' ', '⌘', '⌥', '⇠', '⇡⇣', '⇢']
    ];
    return (
        <section className="keyboard-mac-section">
            <div className="keyboard-mac-div">
                <div className="keyboard-mac-container">
                    {rows.map((row, rowIndex) => (
                        <div className="keyboard-mac-row" key={rowIndex}>
                            {row.map(key => (
                                <button
                                    className={`keyboard-mac-key 
                                        ${key === targetKey ? 'highlighted' : ''}
                                        ${key === '⌫' ? 'backspace' : ''} 
                                        ${key === '⇪' ? 'caps-lock' : ''}
                                        ${key.includes('⇧') ? 'shift' : ''}
                                        ${key === '⇥' ? 'tab' : ''}
                                        ${key === '⏎' ? 'enter' : ''}
                                        ${key === ' ' ? 'space' : ''}
                                        ${['fn', '⌃', '⌥', '⌘'].includes(key) ? 'function-key' : ''}
                                       `}
                                    key={key}>
                                    {key}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NorwegianMacKeyboard;
