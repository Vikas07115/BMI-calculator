import "./App.css";
import React, { useState } from "react";


function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  let calcBmi = (e) => {
    e.preventDefault();
    if (weight === "" || height === "") {
      setError("Please enter a valid weight and height");
    } else {
      let weightNum = parseFloat(weight);
      let heightNum = parseFloat(height);

      if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {
        setError("Please enter valid numeric values for weight and height");
      } else {
        // Converting cm to meters for BMI calculation
        let heightInMeters = heightNum / 100;
        let bmi = weightNum / (heightInMeters * heightInMeters);
        setBmi(bmi.toFixed(1));
        setError("");

        if (bmi < 18.5) {
          setMessage("You are underweight");
        } else if (bmi >= 18.5 && bmi < 24.9) {
          setMessage("You have a healthy weight");
        } else if (bmi >= 25 && bmi < 29.9) {
          setMessage("You are overweight");
        } else {
          setMessage("You are obese");
        }
      }
    }
  };

  let reload = () => {
    setWeight("");
    setHeight("");
    setBmi("");
    setMessage("");
    setError("");
  };

  return (
    <div className="App">
      <div className="container">
        <h2>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter Weight value"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div>
            <label>Height (cm)</label>
            <input
              type="number"
              placeholder="Enter Height value"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">
            Submit
          </button>
          <button className="btn btn-outline" onClick={reload} type="button">
            Reload
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

