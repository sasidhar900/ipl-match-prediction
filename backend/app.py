from flask import Flask, request, jsonify, send_from_directory
import pickle
import pandas as pd
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)

# Load the pre-trained model
try:
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    print(f"Loading model from: {model_path}")
    pipe = pickle.load(open(model_path, 'rb'))
except FileNotFoundError:
    pipe = None
    print("Error: 'model.pkl' not found. Place it in the same directory as 'app.py'.")

# Teams and cities list
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

team_name_map = {
    'Lucknow SuperGiants': 'Delhi Daredevils',
    'Gujarat Titans': 'Deccan Chargers',
}

# Serve React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Prediction API
@app.route('/predict', methods=['POST'])
def predict():
    if pipe is None:
        return jsonify({"error": "Model not loaded. Check server logs."}), 500

    try:
        data = request.json
        batting_team = data['batting_team']
        bowling_team = data['bowling_team']
        selected_city = data['city']
        target = int(data['target'])
        score = int(data['score'])
        overs = float(data['overs'])
        wickets = int(data['wickets'])

        original_batting_team = batting_team
        original_bowling_team = bowling_team

        batting_team = team_name_map.get(batting_team, batting_team)
        bowling_team = team_name_map.get(bowling_team, bowling_team)

        runs_left = target - score
        balls_left = 120 - (overs * 6)
        wickets_left = 10 - wickets
        crr = score / overs if overs > 0 else 0
        rrr = (runs_left * 6) / balls_left if balls_left > 0 else 0

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

        result = pipe.predict_proba(input_df)[0]
        batting_win_prob = result[1] * 100
        bowling_win_prob = result[0] * 100

        return jsonify({
            'batting_team': original_batting_team,
            'bowling_team': original_bowling_team,
            'batting_win_probability': batting_win_prob,
            'bowling_win_probability': bowling_win_prob
        })

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))  # for Render / Heroku
    app.run(host='0.0.0.0', port=port)
