from flask import Flask, request, jsonify
import pickle
import pandas as pd
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Function to load the pre-trained model
try:
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    print("Loading model from:", model_path)
    pipe = pickle.load(open(model_path, 'rb'))
except FileNotFoundError:
    pipe = None
    print("Error: 'model.pkl' file not found. Place it in the same directory as 'app.py'.")

# Teams and cities data
teams = [
    'Royal Challengers Bangalore', 'Mumbai Indians', 'Kings XI Punjab', 
    'Kolkata Knight Riders', 'Sunrisers Hyderabad', 'Rajasthan Royals', 
    'Chennai Super Kings', 'Delhi Capitals', 'Lucknow SuperGiants', 
    'Gujarat Titans'
]
cities = [
    'Hyderabad', 'Bangalore', 'Mumbai', 'Indore', 'Kolkata', 'Delhi', 
    'Chandigarh', 'Jaipur', 'Chennai', 'Cape Town', 'Port Elizabeth', 
    'Durban', 'Centurion', 'East London', 'Johannesburg', 'Kimberley', 
    'Bloemfontein', 'Ahmedabad', 'Cuttack', 'Nagpur', 'Dharamsala', 
    'Visakhapatnam', 'Pune', 'Raipur', 'Ranchi', 'Abu Dhabi', 'Sharjah', 
    'Mohali', 'Bengaluru'
]

# Map new team names to old team names used in the model
team_name_map = {
    'Lucknow SuperGiants': 'Delhi Daredevils',
    'Gujarat Titans': 'Deccan Chargers',
}

@app.route('/predict', methods=['POST'])
def predict():
    """Predicts the win probability based on input data."""
    if pipe is None:
        return jsonify({"error": "Model is not loaded. Please check server logs."}), 500

    try:
        # Parse JSON request data
        data = request.json
        batting_team = data['batting_team']
        bowling_team = data['bowling_team']
        selected_city = data['city']
        target = int(data['target'])
        score = int(data['score'])
        overs = float(data['overs'])
        wickets = int(data['wickets'])

        # Check if the teams are in the mapping and replace with old team names
        original_batting_team = batting_team  # Save the original team name
        original_bowling_team = bowling_team  # Save the original team name

        if batting_team in team_name_map:
            batting_team = team_name_map[batting_team]
        if bowling_team in team_name_map:
            bowling_team = team_name_map[bowling_team] 

        # Calculations
        runs_left = target - score
        balls_left = 120 - (overs * 6)
        wickets_left = 10 - wickets
        crr = score / overs if overs > 0 else 0
        rrr = (runs_left * 6) / balls_left if balls_left > 0 else 0

        # DataFrame for prediction
        input_df = pd.DataFrame({
            'batting_team': [batting_team],
            'bowling_team': [bowling_team],
            'city': [selected_city],
            'total_runs_x': [target],
            'balls_left': [balls_left],
            'required_runs': [runs_left],
            'wickets_left': [wickets_left],
            'crr': [crr],
            'rrr': [rrr]
        })

        # Get prediction probabilities
        result = pipe.predict_proba(input_df)
        batting_win_prob = result[0][1] * 100  # Batting team's win probability
        bowling_win_prob = result[0][0] * 100  # Bowling team's win probability
        
        return jsonify({
            'batting_team': original_batting_team,  # Return the original selected team name
            'bowling_team': original_bowling_team,  # Return the original selected team name
            'batting_win_probability': batting_win_prob,
            'bowling_win_probability': bowling_win_prob
        })

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
