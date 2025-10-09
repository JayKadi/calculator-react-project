import React, { useState } from "react";
import "./Converter.css";
import { motion, AnimatePresence } from "framer-motion";

//
// ─── CURRENCY CONVERTER ───────────────────────────────────────────────
//
function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const handleConvert = () => {
    const rate = 0.93; // static example rate
    const result = parseFloat(amount || 0) * rate;
    setConverted(result.toFixed(2));
  };

  return (
    <motion.div
      className="converter-content"
      initial={{ opacity: 0, y: 30 }}        // starts slightly lower and transparent
      animate={{ opacity: 1, y: 0 }}         // slides up and fades in
      exit={{ opacity: 0, y: -30 }}          // slides up and fades out when leaving
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h2>Currency Converter</h2>
      <div className="converter-inputs">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="KES">KES</option>
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="KES">KES</option>
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {converted !== null && (
        <div className="converter-result">
          {amount} {fromCurrency} = {converted} {toCurrency}
        </div>
      )}
    </motion.div>
  );
}

//
// ─── LENGTH CONVERTER ───────────────────────────────────────────────
//
function LengthConverter() {
  const [length, setLength] = useState("");
  const [converted, setConverted] = useState(null);
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");

  const handleConvert = () => {
    let rate = 1;

    // simple local conversion logic
    if (fromUnit === "meters" && toUnit === "feet") rate = 3.281;
    else if (fromUnit === "feet" && toUnit === "meters") rate = 0.3048;
    else if (fromUnit === "meters" && toUnit === "kilometers") rate = 0.001;
    else if (fromUnit === "kilometers" && toUnit === "meters") rate = 1000;

    const result = parseFloat(length || 0) * rate;
    setConverted(result.toFixed(3));
  };

  return (
    <motion.div
      className="converter-content"
      initial={{ opacity: 0, y: 30 }}        // starts slightly lower and transparent
      animate={{ opacity: 1, y: 0 }}         // slides up and fades in
      exit={{ opacity: 0, y: -30 }}          // slides up and fades out when leaving
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h3>Length Converter</h3>

      {/* Direction info */}
      <p className="conversion-info">
        {fromUnit} → {toUnit}
      </p>

      <div className="converter-inputs">
        <input
          type="number"
          placeholder="Length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          <option value="meters">Meters</option>
          <option value="feet">Feet</option>
          <option value="kilometers">Kilometers</option>
        </select>

        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          <option value="meters">Meters</option>
          <option value="feet">Feet</option>
          <option value="kilometers">Kilometers</option>
        </select>

        <button onClick={handleConvert}>Convert</button>
      </div>

      {converted !== null && (
        <div className="converter-result">
          {length} {fromUnit} = {converted} {toUnit}
        </div>
      )}
   </motion.div>
  );
}

//
// ─── MASS CONVERTER ───────────────────────────────────────────────
//
function MassConverter() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [fromUnit, setFromUnit] = useState("kg");
  const [toUnit, setToUnit] = useState("lb");

  const handleConvert = () => {
    let rate = 2.20462; // 1 kg = 2.20462 lb
    if (fromUnit === "lb" && toUnit === "kg") {
      rate = 1 / 2.20462;
    }
    const result = parseFloat(amount || 0) * rate;
    setConverted(result.toFixed(2));
  };

  return (
    <motion.div
      className="converter-content"
      initial={{ opacity: 0, y: 30 }}        // starts slightly lower and transparent
      animate={{ opacity: 1, y: 0 }}         // slides up and fades in
      exit={{ opacity: 0, y: -30 }}          // slides up and fades out when leaving
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h2>Mass Converter</h2>
      <div className="converter-inputs">
        <input
          type="number"
          placeholder="Enter mass"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {/* This row puts the two selects side by side */}
        <div className="unit-row">
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            <option value="kg">Kilograms (kg)</option>
            <option value="lb">Pounds (lb)</option>
          </select>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            <option value="kg">Kilograms (kg)</option>
            <option value="lb">Pounds (lb)</option>
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>
      </div>

      {converted !== null && (
        <div className="converter-result">
          {amount} {fromUnit} = {converted} {toUnit}
        </div>
      )}

      <p className="conversion-info">
        {fromUnit} → {toUnit}
      </p>
    </motion.div>
  );
}

//
// ─── AREA CONVERTER ───────────────────────────────────────────────
//
function AreaConverter() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [fromUnit, setFromUnit] = useState("m²");
  const [toUnit, setToUnit] = useState("ft²");

  const handleConvert = () => {
    let rate = 10.7639; // 1 square meter = 10.7639 square feet
    if (fromUnit === "ft²" && toUnit === "m²") {
      rate = 1 / 10.7639;
    }
    const result = parseFloat(amount || 0) * rate;
    setConverted(result.toFixed(2));
  };

  return (
    <motion.div
      className="converter-content"
      initial={{ opacity: 0, y: 30 }}        // starts slightly lower and transparent
      animate={{ opacity: 1, y: 0 }}         // slides up and fades in
      exit={{ opacity: 0, y: -30 }}          // slides up and fades out when leaving
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h2>Area Converter</h2>

      <div className="converter-inputs">
        <input
          type="number"
          placeholder="Enter area"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Side-by-side dropdowns for from/to units */}
        <div className="unit-row">
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            <option value="m²">Square Metres (m²)</option>
            <option value="ft²">Square Feet (ft²)</option>
          </select>

          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            <option value="m²">Square Metres (m²)</option>
            <option value="ft²">Square Feet (ft²)</option>
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>
      </div>

      {converted !== null && (
        <div className="converter-result">
          {amount} {fromUnit} = {converted} {toUnit}
        </div>
      )}

      <p className="conversion-info">
        {fromUnit} → {toUnit}
      </p>
    </motion.div>
  );
}

//
// ─── TIME CONVERTER ───────────────────────────────────────────────
//
function TimeConverter() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [fromUnit, setFromUnit] = useState("hours");
  const [toUnit, setToUnit] = useState("minutes");

  const handleConvert = () => {
    let rate = 60; // 1 hour = 60 minutes
    if (fromUnit === "minutes" && toUnit === "hours") {
      rate = 1 / 60;
    }
    const result = parseFloat(amount || 0) * rate;
    setConverted(result.toFixed(2));
  };

  return (
    <motion.div
      className="converter-content"
      initial={{ opacity: 0, y: 30 }}        // starts slightly lower and transparent
      animate={{ opacity: 1, y: 0 }}         // slides up and fades in
      exit={{ opacity: 0, y: -30 }}          // slides up and fades out when leaving
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h2>Time Converter</h2>

      <div className="converter-inputs">
        <input
          type="number"
          placeholder="Enter time"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Side-by-side unit selectors */}
        <div className="unit-row">
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
            <option value="seconds">Seconds</option>
          </select>

          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
            <option value="seconds">Seconds</option>
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>
      </div>

      {converted !== null && (
        <div className="converter-result">
          {amount} {fromUnit} = {converted} {toUnit}
        </div>
      )}

      <p className="conversion-info">
        {fromUnit} → {toUnit}
      </p>
    </motion.div>
  );
}

//
// ─── DISCOUNT CONVERTER ───────────────────────────────────────────────
//
function DiscountConverter() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const handleConvert = () => {
    const price = parseFloat(originalPrice || 0);
    const discount = parseFloat(discountPercent || 0);
    const result = price - (price * discount) / 100;
    setDiscountedPrice(result.toFixed(2));
  };

  return (
<motion.div
      className="converter-content"
      initial={{ opacity: 0, y: 30 }}        // starts slightly lower and transparent
      animate={{ opacity: 1, y: 0 }}         // slides up and fades in
      exit={{ opacity: 0, y: -30 }}          // slides up and fades out when leaving
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h2>Discount Calculator</h2>

      <div className="converter-inputs">
        <input
          type="number"
          placeholder="Original Price"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Discount (%)"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
        />

        <button onClick={handleConvert}>Calculate</button>
      </div>

      {discountedPrice !== null && (
        <div className="converter-result">
          Final Price: {discountedPrice}
        </div>
      )}

      <p className="conversion-info">
        Discount Applied → Final Price
      </p>
       </motion.div>
  );
}


//
// ─── MAIN CONVERTER DASHBOARD ───────────────────────────────────────────────
//
export default function Converter() {
  const [activeConverter, setActiveConverter] = useState("currency");

  return (
    <div className="converter-dashboard">
      {/* First Row */}
      <div className="converter-row">
        <button
          className={activeConverter === "currency" ? "active" : ""}
          onClick={() => setActiveConverter("currency")}
        >
          💵 Currency
        </button>
        <button
          className={activeConverter === "length" ? "active" : ""}
          onClick={() => setActiveConverter("length")}
        >
          📏 Length
        </button>
        <button
          className={activeConverter === "mass" ? "active" : ""}
          onClick={() => setActiveConverter("mass")}
        >
          ⚖️ Mass
        </button>
      </div>

      {/* Second Row */}
      <div className="converter-row">
        <button
          className={activeConverter === "area" ? "active" : ""}
          onClick={() => setActiveConverter("area")}
        >
          🧭 Area
        </button>
        <button
          className={activeConverter === "time" ? "active" : ""}
          onClick={() => setActiveConverter("time")}
        >
          ⏰ Time
        </button>
        <button
          className={activeConverter === "discount" ? "active" : ""}
          onClick={() => setActiveConverter("discount")}
        >
          💸 Discount
        </button>
      </div>

      {/* Active Converter Display */}
      <div className="converter-display">
         <AnimatePresence mode="wait">
        {activeConverter === "currency" && <CurrencyConverter />}
        {activeConverter === "length" && <LengthConverter />}
        {activeConverter === "mass" && <MassConverter />}
        {activeConverter === "area" && <AreaConverter />}
        {activeConverter === "time" && <TimeConverter />}
        {activeConverter === "discount" && <DiscountConverter />}
      </AnimatePresence>
      </div>
    </div>
  );
}
