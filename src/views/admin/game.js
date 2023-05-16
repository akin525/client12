import React, { useState } from 'react';
import 'App.css';

const prizes = [
    { id: 1, text: "Prize 1", value: "Prize 1 Value" },
    { id: 2, text: "Prize 2", value: "Prize 2 Value" },
    { id: 3, text: "Prize 3", value: "Prize 3 Value" },
    { id: 4, text: "Prize 4", value: "Prize 4 Value" },
    { id: 5, text: "Prize 5", value: "Prize 5 Value" },
    { id: 6, text: "Prize 6", value: "Prize 6 Value" },
];

function Game() {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);

    const handleSpinClick = () => {
        // Set spinning to true to start the animation
        setSpinning(true);

        // Generate a random number to determine the result
        const randomIndex = Math.floor(Math.random() * prizes.length);

        // Wait for the animation to finish (in this case, 5 seconds)
        setTimeout(() => {
            // Set spinning back to false to stop the animation
            setSpinning(false);

            // Set the result to the selected prize
            setResult(prizes[randomIndex]);
        }, 5000);
    };

    return (
        <div className="App">
            <h1>Spin and Win!</h1>
            <button onClick={handleSpinClick} disabled={spinning}>
                {spinning ? "Spinning..." : "Spin"}
            </button>
            {result && (
                <div className="result">
                    <h2>Congratulations!</h2>
                    <p>You've won {result.text} ({result.value})!</p>
                </div>
            )}
        </div>
    );
}

export default Game;