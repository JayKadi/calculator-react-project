import React, { useState, useEffect, useRef } from "react";
import "./Calculator.css";
//recognition should be scoped once outside, not inside Calculator.
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true; // keeps listening while active
recognition.interimResults = true;
recognition.lang = 'en-US';


export default function Calculator() {
  const [input, setInput] = useState("");
  const [ripples, setRipples] = useState([]);
  const [pressedButton, setPressedButton] = useState(null); //tracks button currently pressed
 recognition.onresult = (event) => {
  let interimTranscript = "";
  let finalTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const result = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += result + " ";
      processVoiceCommand(result); // final processing
    } else {
      interimTranscript += result + " ";
      processVoiceCommand(result); // realtime processing
    }
  }

  console.log("Interim:", interimTranscript);
  console.log("Final:", finalTranscript);
};

// Start listening when mic button is pressed
const handleMicDown = () => {
  processedWords.current = [];
  recognition.start();
  setListening(true);
};
// Stop listening when mic button is released
const handleMicUp = () => {
  recognition.stop();
  setListening(false);
};
const [listening, setListening] = useState(false);//visual indicator
const processedWords = useRef([]); // keep track of words already handled
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

// Add calculation to history after every "="
const addToHistory = (expression, result) => {
  setHistory(prev => [`${expression} = ${result}`, ...prev]);
};

// Toggle the history dropdown
const toggleHistory = () => {
  setShowHistory(prev => !prev);
};
  const [memory, setMemory] = useState(null); // memory register
  const [showAdvanced, setShowAdvanced] = useState(false); // toggle for advanced features
  const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem("theme");
  return saved ? saved : "light";
});



useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
  const inputRef = useRef(input);
  useEffect(() => { inputRef.current = input; }, [input]);

  
  // toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  //creates a ripple effect
  const createRipple = (event, button) => {
  const rect = event.currentTarget.getBoundingClientRect();
const size = Math.max(rect.width, rect.height); // dynamic
let x, y;
  if (event.touches) {
    // Touch event
    x = event.touches[0].clientX - rect.left;
    y = event.touches[0].clientY - rect.top;
  } else {
    // Mouse event
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  }
const newRipple = { x, y, size, button }; // include size
  setRipples((prev) => [...prev, newRipple]);

  setTimeout(() => {
    setRipples((prev) => prev.filter((r) => r !== newRipple));
  }, 600); // duration of animation
};
//end of ripple effect
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
   addToHistory(input, result);
    setInput(String(result));
  };


 // --- Memory functions ---
const handleMemoryAdd = () => {
  const val = parseFloat(input);
  if (!isNaN(val)) {
    setMemory((m) => (m !== null ? m + val : val)); // add to existing or set
  }
};

const handleMemorySubtract = () => {
  const val = parseFloat(input);
  if (!isNaN(val)) {
    setMemory((m) => (m !== null ? m - val : -val)); // subtract from existing
  }
};

const handleMemoryRecall = () => {
  if (memory !== null) {
    setInput(String(memory)); // replaces input instead of appending
  }
};

const handleMemoryClear = () => {
  setMemory(null); // clears memory
};

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
  
//Handles in real-time,Duplicate words are ignored
const processVoiceCommand = (command) => {
  const words = command.toLowerCase().split(" ");

  words.forEach((word) => {
    if (processedWords.current.includes(word)) return; // skip duplicates
    processedWords.current.push(word);

    // --- Numbers ---
    if (["zero", "0"].includes(word)) setInput((s) => s + "0");
    else if (["one", "1"].includes(word)) setInput((s) => s + "1");
    else if (["two", "to", "too", "2"].includes(word)) setInput((s) => s + "2");
    else if (["three", "3"].includes(word)) setInput((s) => s + "3");
    else if (["four", "for", "fore", "4"].includes(word)) setInput((s) => s + "4");
    else if (["five", "5"].includes(word)) setInput((s) => s + "5");
    else if (["six", "6"].includes(word)) setInput((s) => s + "6");
    else if (["seven", "7"].includes(word)) setInput((s) => s + "7");
    else if (["eight", "ate", "8"].includes(word)) setInput((s) => s + "8");
    else if (["nine", "9"].includes(word)) setInput((s) => s + "9");

    // --- Operators ---
    else if (["plus", "add", "+"].includes(word)) setInput((s) => s + "+");
    else if (["minus", "subtract", "less", "-"].includes(word)) setInput((s) => s + "-");
    else if (["times", "multiply", "x", "*"].includes(word)) setInput((s) => s + "*");
    else if (["divide", "over", "/"].includes(word)) setInput((s) => s + "/");

    // --- Parentheses ---
    else if (["open", "open bracket", "("].includes(word)) setInput((s) => s + "(");
    else if (["close", "close bracket", ")"].includes(word)) setInput((s) => s + ")");

    // --- Commands ---
    else if (["clear", "reset"].includes(word)) handleClear();
    else if (["delete", "backspace"].includes(word)) handleDelete();
    else if (["equals", "equal", "is", "result"].includes(word)) handleEqualClick();
    else if (["percent", "percentage", "%"].includes(word)) handlePercent();

    // --- Scientific Functions ---
    else if (["square", "squared"].includes(word)) setInput((s) => s + "**2");
    else if (["square root", "root", "sqrt"].includes(word)) setInput((s) => s + "Math.sqrt(");
    else if (["sin", "sine"].includes(word)) setInput((s) => s + "Math.sin(");
    else if (["cos", "cosine"].includes(word)) setInput((s) => s + "Math.cos(");
    else if (["tan", "tangent"].includes(word)) setInput((s) => s + "Math.tan(");
    else if (["log", "logarithm"].includes(word)) setInput((s) => s + "Math.log10(");
    else if (["ln", "natural log"].includes(word)) setInput((s) => s + "Math.log(");
    else if (["pi", "π"].includes(word)) setInput((s) => s + "Math.PI");
  });
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
  }, [handlePercent]);

  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","%","+"
  ];

  return (
     <div className={`calculator-app ${theme}`}>
    <div className={`app ${theme}`}>
      <div className="top-bar"> 
  <button onClick={toggleHistory}>
    History ⌄
  </button>
</div>

{showHistory && (
  <div className="history-panel">
    {history.length === 0 ? (
      <p></p>
    ) : (
      <>
        {history.map((entry, index) => (
          <div
            key={index}
            className="history-entry"
            onClick={() => setInput(entry.split("=")[0].trim())}
          >
            {entry}
          </div>
        ))}
        {/* Clear button */}
        <button 
          className="clear-history" 
          onClick={() => setHistory([])}
        >
          Clear History
        </button>
      </>
    )}
  </div>
)}

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
      className={`calc-btn ${theme} ${pressedButton === b ? "pressed" : ""}`}
      onClick={(e) => {
        setInput((s) => s + b);
        createRipple(e, b); // triggers ripple animation
      }}
      onMouseDown={() => setPressedButton(b)}
      onMouseUp={() => setPressedButton(null)}
      onMouseLeave={() => setPressedButton(null)}
      onTouchStart={() => setPressedButton(b)}
      onTouchEnd={() => setPressedButton(null)}
    >
      {b}
      {ripples
        .filter(r => r.button === b)
        .map((r, i) => (
          <span
            key={i}
            className="ripple"
            style={{ left: r.x, top: r.y }}
          />
        ))}
    </button>
  ))}

  {/* Equals button */}
  <button
    className={`equals calc-btn ${theme}`}
    onClick={(e) => {
      handleEqualClick();
      createRipple(e, "=");
    }}
    onMouseDown={() => setPressedButton("=")}
    onMouseUp={() => setPressedButton(null)}
    onMouseLeave={() => setPressedButton(null)}
    onTouchStart={() => setPressedButton("=")}
    onTouchEnd={() => setPressedButton(null)}
  >
    =
    {ripples
      .filter(r => r.button === "=")
      .map((r, i) => (
        <span
  key={i}
  className="ripple"
  style={{
    left: r.x,
    top: r.y,
    width: r.size,
    height: r.size,
  }}
/>
      ))}
  </button>
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
      {/* New mic button */}
      <button
  onMouseDown={handleMicDown}
  onMouseUp={handleMicUp}
  onTouchStart={handleMicDown}   // for mobile
  onTouchEnd={handleMicUp}       // for mobile
>
  🎤
</button>
{/* Visual speaking indicator */}
{listening && (
  <div className="mic-indicator">
    🔴 Listening...
  </div>
)}
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

  
    </div> 
      </div>

  );
}
  