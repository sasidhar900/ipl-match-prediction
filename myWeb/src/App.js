import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './components/Loginpage'; 
import Signuppage from './components/Signuppage';
import HomePage from './components/Homepage/body';


const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/loginpage" element={<Loginpage />} />
            <Route path="/homepage" element={<HomePage />} />
        </Routes>
    </Router>
);

export default App;
