import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { convertUnit } from "../services/converterService";

function Dashboard() {
  const { logout } = useAuth();

  const [category, setCategory] = useState("length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const units = {
    length: ["meter", "kilometer"],
    weight: ["gram", "kilogram"],
    temperature: ["celsius", "fahrenheit"]
  };

  // 🔥 Backend Conversion
  useEffect(() => {
    const fetchConversion = async () => {
      if (!value) {
        setResult("");
        return;
      }

      try {
        setLoading(true);
        const data = await convertUnit(category, value, fromUnit, toUnit);
        setResult(data.result);
      } catch (error) {
        console.error("Conversion error:", error);
        setResult("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchConversion();
  }, [value, fromUnit, toUnit, category]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Unit Converter</h1>

        <div className="dashboard-user">
          <button
            className="logout-button"
            onClick={logout}
            title="Logout"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>

      {/* CONVERTER CARD */}
      <div className="converter-card">

        <label className="converter-label">Category</label>
        <select
          className="converter-select"
          value={category}
          onChange={(e) => {
            const newCategory = e.target.value;
            setCategory(newCategory);
            setFromUnit(units[newCategory][0]);
            setToUnit(units[newCategory][1]);
          }}
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>

        <label className="converter-label">Value</label>
        <input
          className="converter-input"
          type="number"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <label className="converter-label">From</label>
        <select
          className="converter-select"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {units[category].map((unit) => (
            <option key={unit}>{unit}</option>
          ))}
        </select>

        <label className="converter-label">To</label>
        <select
          className="converter-select"
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          {units[category].map((unit) => (
            <option key={unit}>{unit}</option>
          ))}
        </select>

        <button className="swap-button" onClick={swapUnits}>
          Swap Units
        </button>

        {loading && (
          <div className="converter-result">
            Converting...
          </div>
        )}

        {!loading && result !== "" && (
          <div className="converter-result">
            Result: {result}
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
