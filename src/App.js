import React, { useState } from "react";
import Calculator from "./Calculator";
import "./App.css";
import Converter from "./Converter";

export default function App() {
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <div className="app-container">
      <div className="top-tabs">
        <button
          className={activeTab === "calculator" ? "active" : ""}
          onClick={() => setActiveTab("calculator")}
        >
          Calculator
        </button>
        <button
          className={activeTab === "converter" ? "active" : ""}
          onClick={() => setActiveTab("converter")}
        >
          Converter
        </button>
      </div>

      {activeTab === "calculator" && <Calculator />}
      {activeTab === "converter" && <Converter />}
    </div>
  );
}
