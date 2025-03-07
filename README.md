# IPL Match Prediction

## 📌 Project Overview
This project aims to predict the outcome of Indian Premier League (IPL) matches using **Machine Learning** techniques. The model is trained on historical IPL data and predicts match results based on key features like team statistics, venue, toss decisions, and player performances.

## 🏏 Dataset
The dataset consists of IPL match records, including:
- Team names
- Match venues
- Toss winner & decision
- Player performances
- Match results (Win/Loss)

## 🔍 Model Approach
- **Preprocessing**: Data is preprocessed using a **ColumnTransformer** pipeline.
- **Algorithm**: **Logistic Regression** with the **'liblinear' solver** is used.
- **Feature Engineering**: Important features like team strength, toss impact, and match conditions are considered.
- **Evaluation Metrics**:
  - **Accuracy**: 80%
  - **Log Loss**: Optimized to improve prediction reliability.

## 📊 Results
The model achieves an **80% accuracy** by fine-tuning weights based on **log loss**, making it effective for predicting match outcomes.

## 🚀 Installation & Usage
### Prerequisites
- Python 3.x
- Required libraries: Pandas, NumPy, Scikit-learn, Matplotlib, Flask (for deployment)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/IPL-Prediction.git
cd IPL-Prediction

# Install dependencies
pip install -r requirements.txt
```

### How to Run the Code on Your Laptop
1. **Run the Flask API:**
   - Open a terminal and navigate to the backend API folder:
     ```bash
     cd backend
     ```
   - Start the Flask application:
     ```bash
     python app.py
     ```

2. **Run the Backend Server:**
   - Open a new terminal and navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Run the backend server using Node.js:
     ```bash
     node server.js
     ```

3. **Run the Frontend:**
   - Open another terminal and navigate to the frontend folder:
     ```bash
     cd myWeb
     ```
   - Start the frontend application:
     ```bash
     npm start
     ```

4. **Access the Application:**
   - Open your browser and go to:
     ```
     http://localhost:3000/
     ```

## 🖥️ Deployment
The project can be deployed using **Flask** or integrated into a **web application**.

## 📜 Future Improvements
- Implementing **Deep Learning models** like CNNs/LSTMs.
- Integrating **real-time match data**.
- Enhancing **feature selection and hyperparameter tuning**.

## 🤝 Contributing
Feel free to submit issues, suggest improvements, or fork the repo to contribute!

## 📞 Contact
For any queries, reach out at [your-email@example.com].

