import React, { useState } from "react";
import "./Converter.css"; // we can style separately

export default function Converter() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const handleConvert = () => {
    // placeholder logic
    const rate = 0.93; // just example rate
    const result = parseFloat(amount) * rate;
    setConverted(result.toFixed(2));
  };

  return (
    <div className="converter">
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
    </div>
  );
}
