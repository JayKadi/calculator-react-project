import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleEquals = () => {
    try {
      const result = eval(input); // ⚠️ not safe for production, but fine for learning
      setHistory([...history, `${input} = ${result}`]);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator-container">
      <div className="display">
        <p>{input || "0"}</p>
      </div>

      <div className="buttons">
        {/* Left side: numbers + extra */}
        <div className="left-panel">
          <button onClick={handleClear}>C</button>
          <button onClick={handleBackspace}>⌫</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("0")}>0</button>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleClick(num.toString())}>
              {num}
            </button>
          ))}
        </div>

        {/* Right side: operations */}
        <div className="right-panel">
          <button onClick={handleEquals}>=</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("-")}>−</button>
          <button onClick={() => handleClick("*")}>×</button>
          <button onClick={() => handleClick("/")}>÷</button>
        </div>
      </div>

      {/* History section */}
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calculator;
