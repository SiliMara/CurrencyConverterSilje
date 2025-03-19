import React, { useState, useEffect } from "react";
import './CurrencyConverter.css'; // Import the new CSS file

const CurrencyConverter = () => {
  // Initialize state and fetch exchange rates
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [toCurrency]);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => setExchangeRate(data.rates[toCurrency]));
  }, [fromCurrency, toCurrency]);

  const convert = () => (amount * exchangeRate).toFixed(2);

  return (
    <div className="currency-converter">
      <h2>Valutakalkulator</h2>
      <div className="input-group">
        {/* Add input fields for amount and currency selection */}
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="to-text">til</div>
      <div className="input-group">
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <h3>Resultat: {convert()} {toCurrency}</h3>
    </div>
  );
};

// Export CurrencyConverter component
export default CurrencyConverter;
