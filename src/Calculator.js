import React, { useState, useEffect, useRef } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(null); // memory register
  const [showAdvanced, setShowAdvanced] = useState(false); // toggle for advanced features
  const [theme, setTheme] = useState("light");
  const inputRef = useRef(input);
  useEffect(() => { inputRef.current = input; }, [input]);

  
  // toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // --- Safe evaluate ---
  const safeEvaluate = (expr) => {
    if (!expr) return "";
    const cleaned = expr.replace(/[+\-*/.]+$/, "");
    if (cleaned === "") return "";
    try {
      // eslint-disable-next-line no-eval
      return eval(cleaned);
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

  // --- Memory functions ---
  const handleMemoryAdd = () => {
    const val = parseFloat(input);
    if (!isNaN(val)) setMemory((m) => (m !== null ? m + val : val));
  };
  const handleMemorySubtract = () => {
    const val = parseFloat(input);
    if (!isNaN(val)) setMemory((m) => (m !== null ? m - val : -val));
  };
  const handleMemoryRecall = () => {
    if (memory !== null) setInput((s) => s + memory.toString());
  };
  const handleMemoryClear = () => setMemory(null);

  // --- Utility handlers ---
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

  // --- Scientific handlers ---
  const handleFunction = (fn) => {
    try {
      const val = parseFloat(input);
      let res;
      switch (fn) {
        case "sin": res = Math.sin(val); break;
        case "cos": res = Math.cos(val); break;
        case "tan": res = Math.tan(val); break;
        case "log": res = Math.log10(val); break;
        case "ln":  res = Math.log(val); break;
        case "sqrt": res = Math.sqrt(val); break;
        case "square": res = Math.pow(val, 2); break;
        case "pi": res = Math.PI; break;
        default: res = "Error";
      }
      if (res !== "Error" && !isNaN(res)) {
        setHistory((h) => [...h, `${fn}(${val}) = ${res}`]);
        setInput(String(res));
      } else {
        setInput("Error");
      }
    } catch {
      setInput("Error");
    }
  };

  // --- Keyboard support ---
  useEffect(() => {
    const onKeyDown = (e) => {
      const k = e.key;
      if (/^[0-9]$/.test(k)) { setInput((s) => s + k); return; }
      if (k === ".") { setInput((s) => s + "."); return; }
      if (["+", "-", "*", "/"].includes(k)) {
        setInput((s) => {
          if (s === "" && k !== "-") return s;
          if (/[+\-*/]$/.test(s)) return s.slice(0, -1) + k;
          return s + k;
        });
        return;
      }
      if (k === "Enter" || k === "=" || k === "NumpadEnter") {
        e.preventDefault();
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
      if (k === "Backspace") { handleDelete(); return; }
      if (k.toLowerCase() === "c") { handleClear(); return; }
      if (k === "%") { handlePercent(); return; }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","%","+"
  ];

  return (
     <div className={`calculator-app ${theme}`}>
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
          <button key={b} onClick={() => setInput((s) => s + b)}>
            {b}
          </button>
        ))}
        <button className="equals" onClick={handleEqualClick}>=</button>
      </div>
 {/* Extra controls row */}
      {/* --- Advanced section toggle --- */}
      <div className="extra-controls">
      <button
        className="toggle-advanced"
        onClick={() => setShowAdvanced((s) => !s)}
      >
        {showAdvanced ? "Less ▲" : "More ▼"}
      </button>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
       </div>


      {showAdvanced && (
        <div className={`advanced-grid ${showAdvanced ? "show" : ""}`}> 
          {/* Parentheses */}
          <button onClick={() => setInput((s) => s + "(")}>(</button>
          <button onClick={() => setInput((s) => s + ")")}>)</button>

          {/* Scientific */}
          <button onClick={() => handleFunction("sqrt")}>√</button>
          <button onClick={() => handleFunction("square")}>x²</button>
          <button onClick={() => handleFunction("sin")}>sin</button>
          <button onClick={() => handleFunction("cos")}>cos</button>
          <button onClick={() => handleFunction("tan")}>tan</button>
          <button onClick={() => handleFunction("log")}>log</button>
          <button onClick={() => handleFunction("ln")}>ln</button>
          <button onClick={() => handleFunction("pi")}>π</button>

          {/* Memory */}
          <button onClick={handleMemoryClear}>MC</button>
          <button onClick={handleMemoryRecall}>MR</button>
          <button onClick={handleMemoryAdd}>M+</button>
          <button onClick={handleMemorySubtract}>M-</button>
        </div>
      )}

      <div className="history">
        <h3>History</h3>
        <button onClick={() => setHistory([])}>Clear History</button>
        <ul>{history.map((h, i) =>(
          <li key={i}>{h}</li>
      ))}
      </ul>
    </div>
    </div> 
      </div>

  );
}
  