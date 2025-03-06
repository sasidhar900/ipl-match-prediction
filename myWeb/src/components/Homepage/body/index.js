import React, { useState } from 'react';
import './index.css';
import { Link } from "react-router-dom";
import cricketLogo from './images/5492.jpg';  
import App from '../../../ipl.js';

const HomePage = () => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [team1Name, setTeam1Name] = useState('');
    const [team2Name, setTeam2Name] = useState('');
    const [prediction, setPrediction] = useState('');

    // Win percentage data for teams
    
        const winPercentage= {
            csk: {
                mi: 40,
                rcb: 65.63,
                dc: 60,
                kkr: 55,
                pk: 58,
                rr: 55,
                srh: 57,
                lsg: 49,
                gt: 60
            },
            mi: {
                csk: 54.05,
                dc: 54.28,
                kkr: 67.64,
                pk: 53.12,
                rr: 51.72,
                rcb: 57.58,
                srh: 56.52,
                lsg: 16.67,
                gt: 40
            },
            rcb: {
                csk: 34.37,
                mi: 42.42,
                dc: 51,
                kkr: 49.5,
                pk: 44,
                rr: 52.5,
                srh: 50.5,
                lsg: 47,
                gt: 58
            },
            dc: {
                csk: 40,
                mi: 45.72,
                rcb: 49,
                kkr: 52,
                pk: 54,
                rr: 50,
                srh: 51,
                lsg: 53,
                gt: 56
            },
            kkr: {
                csk: 45,
                mi: 32.36,
                rcb: 50.5,
                dc: 48,
                pk: 49,
                rr: 47,
                srh: 55,
                lsg: 54,
                gt: 45
            },
            pk: {
                csk: 42,
                mi: 46.88,
                rcb: 56,
                dc: 46,
                kkr: 51,
                rr: 52,
                srh: 48,
                lsg: 55,
                gt: 54
            },
            rr: {
                csk: 45,
                mi: 48.28,
                rcb: 47.5,
                dc: 50,
                kkr: 53,
                pk: 48,
                srh: 52,
                lsg: 50.5,
                gt: 59
            },
            srh: {
                csk: 43,
                mi: 43.48,
                rcb: 49.5,
                dc: 49,
                kkr: 45,
                pk: 52,
                rr: 48,
                lsg: 56,
                gt: 60
            },
            lsg: {
                csk: 51,
                mi: 83.33,
                rcb: 53,
                dc: 47,
                kkr: 46,
                pk: 45,
                rr: 49.5,
                srh: 44,
                gt: 58
            },
            gt: {
                csk: 40,
                mi: 60,
                rcb: 42,
                dc: 44,
                kkr: 55,
                pk: 46,
                rr: 41,
                srh: 40,
                lsg: 42
            }
        };
        
    

    const selectTeam = (teamImg, teamName) => {
        if (!team1) {
            setTeam1(`${teamImg}.jpg`);
            setTeam1Name(teamName);
        } else if (!team2) {
            if (teamImg === team1) {
                alert("Please select a different team for prediction.");
            } else {
                setTeam2(`${teamImg}.jpg`);
                setTeam2Name(teamName);
            }
        } else {
            alert("You have already selected two teams. Please reset to choose again.");
        }
    };

    const clearSelections = () => {
        setTeam1('');
        setTeam2('');
        setTeam1Name('');
        setTeam2Name('');
        setPrediction('');
    };

    const makePrediction = () => {
        if (team1Name && team2Name) {
            const percentage = winPercentage[team1Name.toLowerCase()] && winPercentage[team1Name.toLowerCase()][team2Name.toLowerCase()];
            if (percentage !== undefined) {
                let winner = percentage > 50 ? team1Name : team2Name;
                const winPercent = percentage > 50 ? percentage : (100 - percentage);

                // Capitalize "MI" explicitly
                if (winner.toLowerCase() === 'mi') {
                    winner = 'MI';
                }

                setPrediction({
                    text: `PREDICTION: ${winner} HAS A HIGHER CHANCE OF WINNING WITH ${winPercent}% PROBABILITY!`,
                    winner: winner
                });
            } else {
                alert("Prediction data not available for these teams.");
            }
        } else {
            alert("Please select two teams first.");
        } 
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid navbar-color">
                    <Link className="navbar-brand mr-5n" to="#">
                        <img src={cricketLogo} className="navbar-image" alt="Cricket Logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link active" to="#">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="#">TEAMS</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="07venue.html">VENUE</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="#about-us">ABOUT US</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="01login.html">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Scrolling Text */}
           
            <div className="scrolling-text">
  <div className="scrolling-content">
    Welcome to IPL Prediction! Predict the winners before match and during Match!!!!
                                        </div>
                             </div>

            {/* Team Selection */}
            <div className="container team-container bc">
                <h2 className="text-center mb-4">SELECT  TWO  TEAMS</h2>
                <div className="row">
                    {['csk', 'mi', 'rcb', 'kkr', 'srh', 'rr', 'dc', 'gt', 'lsg', 'pk'].map((team, index) => (
                        <div key={index} className="col-md-4">
                            <div className={`team ${team}`} onClick={() => selectTeam(`${team}`, team)}>
                                <div className="team-name textStyle">{team.toUpperCase()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Teams Display */}
            <div className="container text-center mt-4 team-form1 ">
                <h4>Selected Teams:</h4>
                <div className="d-flex justify-content-center align-items-center">
                    <div className={`selected-team orange-glow ${team1Name}`}>
                        <div className="team-name">{team1Name}</div>
                    </div>
                    <div className="vs">VS</div>
                    <div className={`selected-team orange-glow ${team2Name}`}>
                        <div className="team-name">{team2Name}</div>
                    </div>
                </div>
                <button onClick={makePrediction} className="btn btn-primary mt-4" disabled={!team1 || !team2}>Make Prediction</button>
                <button onClick={clearSelections} className="btn btn-primary mt-4 clear" disabled={!team1 && !team2}>Clear</button> 

                {/* Prediction Result */}
                {prediction && (
                    <div className="prediction-result text-center mt-4 highlight ">
                        <h3>
                            {prediction.text.split(prediction.winner)[0]}
                            <span className="highlight-winner">{prediction.winner}</span>
                            {prediction.text.split(prediction.winner)[1]}
                        </h3>
                    </div>
                )}
            </div> 
            

                   
        <hr/>

    <App/>





            <footer className="footer" id="about-us">
                <div className="">
                    <div className="row">
                        <div className="footer-col"><h4 id="footer-name">Company</h4>
                            <ul>
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">About Us</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col"><h4 id="footer-name">Get Help</h4>
                            <ul>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col"><h4 id="footer-name">Online Predictions</h4>
                            <ul>
                                <li><Link to="#">Accurate</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col"><h4 id="footer-name">Follow Us</h4>
                            <div className="social-links">
                                <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                                <Link to="#"><i className="fab fa-twitter"></i></Link>
                                <Link to="#"><i className="fab fa-instagram"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
