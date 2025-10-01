import React, { useState, useEffect, useRef } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(input);
  useEffect(() => { inputRef.current = input; }, [input]);

  const safeEvaluate = (expr) => {
    if (!expr) return "";
    // remove trailing operators (e.g. "2+")
    const cleaned = expr.replace(/[+\-*/.]+$/, "");
    if (cleaned === "") return "";
    try {
      // eslint-disable-next-line no-eval
      const res = eval(cleaned);
      return res;
    } catch {
      return "Error";
    }
  };

  const handleEqualClick = () => {
    const result = safeEvaluate(input);
    if (result === "Error" || result === "") {
      setInput("Error");
      return;
    }
    setHistory((h) => [...h, `${input} = ${result}`]);
    setInput(String(result));
  };

  const handleClear = () => setInput("");
  const handleDelete = () => setInput((s) => s.slice(0, -1));
  const handleToggleSign = () => {
    setInput((s) => (s.startsWith("-") ? s.slice(1) : "-" + s));
  };
  const handlePercent = () => {
    const val = parseFloat(input);
    if (isNaN(val)) { setInput("Error"); return; }
    const res = val / 100;
    setHistory((h) => [...h, `${input}% = ${res}`]);
    setInput(String(res));
  };

  // Global keyboard listener (stable, uses inputRef to read latest input)
  useEffect(() => {
    const onKeyDown = (e) => {
      const k = e.key;

      // debug - uncomment if you want to see keys in console
      // console.log("keydown:", k);

      // numbers
      if (/^[0-9]$/.test(k)) {
        setInput((s) => s + k);
        return;
      }

      // decimal point
      if (k === ".") {
        setInput((s) => s + ".");
        return;
      }

      // operators
      if (["+", "-", "*", "/"].includes(k)) {
        setInput((s) => {
          // don't start with an operator except minus
          if (s === "" && k !== "-") return s;
          // replace trailing operator with new one
          if (/[+\-*/]$/.test(s)) return s.slice(0, -1) + k;
          return s + k;
        });
        return;
      }

      // Enter, '=', NumpadEnter => calculate
      if (k === "Enter" || k === "=" || k === "NumpadEnter") {
        e.preventDefault(); // avoid default (forms, etc.)
        const expr = inputRef.current;
        const result = safeEvaluate(expr);
        if (result === "Error" || result === "") {
          setInput("Error");
        } else {
          setHistory((h) => [...h, `${expr} = ${result}`]);
          setInput(String(result));
        }
        return;
      }

      // Backspace
      if (k === "Backspace") {
        handleDelete();
        return;
      }

      // quick clear with 'c' or 'C'
      if (k.toLowerCase() === "c") {
        handleClear();
        return;
      }

      // percent with '%'
      if (k === "%") {
        handlePercent();
        return;
      }

      // ignore other keys
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []); // empty deps: handler uses refs/state-setters

  // UI buttons (you can keep your existing layout)
  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","%","+"
  ];

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>

      <div className="controls">
        <button onClick={handleClear}>C</button>
        <button onClick={handleDelete}>⌫</button>
        <button onClick={handleToggleSign}>±</button>
        <button onClick={handlePercent}>%</button>
      </div>

      <div className="buttons-grid">
        {buttons.map((b) => (
          <button
            key={b}
            onClick={() => {
              if (b === "%") handlePercent();
              else setInput((s) => s + b);
            }}
          >
            {b}
          </button>
        ))}
        <button className="equals" onClick={handleEqualClick}>=</button>
      </div>

      <div className="history">
        <h3>History</h3>
        <button onClick={() => setHistory([])}>Clear History</button>
        <ul>{history.map((h, i) => <li key={i}>{h}</li>)}</ul>
      </div>
    </div>
  );
}
