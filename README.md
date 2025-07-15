# IPL Match Prediction

## 📌 Project Overview
This project aims to predict the outcome of Indian Premier League (IPL) matches using **Machine Learning** techniques.  
The model is trained on historical IPL data and predicts match results based on key features like team statistics, venue, toss decisions, and player performances.

✅ **Live Deployment:** [👉 Click here to try the app](https://ipl-match-prediction-dw7e-oazipo1rf-sasidhars-projects-6c55366b.vercel.app/)

---

## 🏏 Dataset
The dataset consists of IPL match records, including:
- Team names  
- Match venues  
- Toss winner & decision  
- Player performances  
- Match results (Win/Loss)

---

## 🔍 Model Approach
- **Preprocessing**: Data is preprocessed using a **ColumnTransformer** pipeline.  
- **Algorithm**: **Logistic Regression** with the **'liblinear' solver** is used.  
- **Feature Engineering**: Important features like team strength, toss impact, and match conditions are considered.  
- **Evaluation Metrics**:
  - **Accuracy**: 80%
  - **Log Loss**: Optimized to improve prediction reliability.

---

## 📊 Results
The model achieves an **80% accuracy** by fine‑tuning weights based on **log loss**, making it effective for predicting match outcomes.

---

## 🚀 Installation & Usage

### Prerequisites
- Python 3.x  
- Required libraries: Pandas, NumPy, Scikit-learn, Matplotlib, Flask (for deployment)

### How to Run the Code on Your Laptop
1. **Run the Flask API:**
   ```bash
   cd backend
   python app.py
   ```

2. **Run the Backend Server:**
   ```bash
   cd backend
   node server.js
   ```

3. **Run the Frontend:**
   ```bash
   cd myWeb
   npm start
   ```

4. **Access the Application:**
   ```
   http://localhost:3000/
   ```

---

## 🖥️ Deployment
The project is deployed and live at:  
🌐 **[https://ipl-match-prediction-dw7e-oazipo1rf-sasidhars-projects-6c55366b.vercel.app/](https://ipl-match-prediction-dw7e-oazipo1rf-sasidhars-projects-6c55366b.vercel.app/)**  

It can also be deployed using **Flask** or integrated into a **web application**.

---

## 📜 Future Improvements
- Implementing **Deep Learning models** like CNNs/LSTMs.  
- Integrating **real‑time match data**.  
- Enhancing **feature selection and hyperparameter tuning**.

---

## 🤝 Contributing
Feel free to submit issues, suggest improvements, or fork the repo to contribute!

---

## 📞 Contact
For any queries, reach out at **[sasidharreddydurgempudi@gmail.com](mailto:sasidharreddydurgempudi@gmail.com)**
