import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const teams = [
    'Royal Challengers Bangalore',
    'Mumbai Indians',
    'Kings XI Punjab',
    'Kolkata Knight Riders',
    'Sunrisers Hyderabad',
    'Rajasthan Royals',
    'Chennai Super Kings',
    'Delhi Capitals',
    'Lucknow SuperGiants',
    'Gujarat Titans',
  ];

  const cities = [
    'Hyderabad',
    'Bangalore',
    'Mumbai',
    'Indore',
    'Kolkata',
    'Delhi',
    'Chandigarh',
    'Jaipur',
    'Chennai',
    'Cape Town',
    'Port Elizabeth',
    'Durban',
    'Centurion',
    'East London',
    'Johannesburg',
    'Kimberley',
    'Bloemfontein',
    'Ahmedabad',
    'Cuttack',
    'Nagpur',
    'Dharamsala',
    'Visakhapatnam',
    'Pune',
    'Raipur',
    'Ranchi',
    'Abu Dhabi',
    'Sharjah',
    'Mohali',
    'Bengaluru',
  ];

  const [formData, setFormData] = useState({
    batting_team: '',
    bowling_team: '',
    city: '',
    target: '',
    score: '',
    overs: '',
    wickets: '',
  });
  const [errors, setErrors] = useState({});
  const [battingWinProbability, setBattingWinProbability] = useState(null);
  const [bowlingWinProbability, setBowlingWinProbability] = useState(null);
  const [battingTeam, setBattingTeam] = useState('');
  const [bowlingTeam, setBowlingTeam] = useState('');
  const [isPredictionMade, setIsPredictionMade] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.batting_team) newErrors.batting_team = 'Select a batting team.';
    if (!formData.bowling_team) newErrors.bowling_team = 'Select a bowling team.';
    if (formData.batting_team === formData.bowling_team) newErrors.teams = 'Batting and Bowling teams cannot be the same.';
    if (!formData.city) newErrors.city = 'Select a city.';
    if (formData.target <= 0) newErrors.target = 'Target must be greater than 0.';
    if (formData.score < 0 || parseInt(formData.score) >= parseInt(formData.target)) newErrors.score = 'Score must be non-negative and less than target.';
    if (formData.overs < 0 || formData.overs > 20) newErrors.overs = 'Overs must be between 0 and 20.';
    if (formData.wickets < 0 || formData.wickets > 9) newErrors.wickets = 'Wickets must be between 0 and 9.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setBattingTeam(response.data.batting_team);
      setBowlingTeam(response.data.bowling_team);
      setBattingWinProbability(response.data.batting_win_probability);
      setBowlingWinProbability(response.data.bowling_win_probability);
      setIsPredictionMade(true);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="App form-color">
      <h1>IPL Win Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div>
            <label>Batting Team:</label>
            <select name="batting_team" value={formData.batting_team} onChange={handleChange} required>
              <option value="">Select Batting Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>{team}</option>
              ))}
            </select>
            {errors.batting_team && <p className="error">{errors.batting_team}</p>}
          </div>

          <div>
            <label>Bowling Team:</label>
            <select name="bowling_team" value={formData.bowling_team} onChange={handleChange} required>
              <option value="">Select Bowling Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>{team}</option>
              ))}
            </select>
            {errors.bowling_team && <p className="error">{errors.bowling_team}</p>}
            {errors.teams && <p className="error">{errors.teams}</p>}
          </div>

          <div>
            <label>City:</label>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          <div>
            <label>Target:</label>
            <input type="number" name="target" value={formData.target} onChange={handleChange} />
            {errors.target && <p className="error">{errors.target}</p>}
          </div>

          <div>
            <label>Score:</label>
            <input type="number" name="score" value={formData.score} onChange={handleChange} />
            {errors.score && <p className="error">{errors.score}</p>}
          </div>

          <div>
            <label>Overs:</label>
            <input type="number" name="overs" value={formData.overs} onChange={handleChange} />
            {errors.overs && <p className="error">{errors.overs}</p>}
          </div>

          <div>
            <label>Wickets:</label>
            <input type="number" name="wickets" value={formData.wickets} onChange={handleChange} />
            {errors.wickets && <p className="error">{errors.wickets}</p>}
          </div>

          <button type="submit">Predict</button>
        </div>
      </form>

      {isPredictionMade && (
        <div className="results">
          <h2>Prediction Results</h2>
          <div className="result-container">
            <div className="team">
              <h3>{battingTeam}</h3>
              <p>Win Probability: {battingWinProbability}%</p>
            </div>
            <div className="team">
              <h3>{bowlingTeam}</h3>
              <p>Win Probability: {bowlingWinProbability}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
