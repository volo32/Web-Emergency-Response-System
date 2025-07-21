import React from "react";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
    const navigate = useNavigate();

    const handleSelection = (userType, action) => {
        switch (action) {
            case "login":
                navigate(`/login.html`);
                break;
            case "register":
                navigate(`/index.html`);
                break;
            case "info":
                navigate(`/info?type=${userType}`);
                break;
            default:
                console.error("Invalid action");
        }
    };

    return (
        <div className="container">
            <h1>Καλώς ήρθατε στο Lobby!</h1>
            <p>Επιλέξτε τύπο χρήστη και ενέργεια:</p>

            <div className="user-selection">
                <div className="user-type">
                    <h2>Απλός Χρήστης</h2>
                    <button onClick={() => handleSelection("user", "login")}>Σύνδεση</button>
                    <button onClick={() => handleSelection("user", "register")}>Εγγραφή</button>
                </div>

                <div className="user-type">
                    <h2>Εθελοντής Πυροσβέστης</h2>
                    <button onClick={() => handleSelection("volunteer", "login")}>Σύνδεση</button>
                    <button onClick={() => handleSelection("volunteer", "register")}>Εγγραφή</button>
                </div>
                <div className="user-type">
                    <h2>Επισκέπτης</h2>
                    <button onClick={() => handleSelection("visitor", "login")}>Σύνδεση</button>
                </div>
            </div>
        </div>
    );
};
window.onload = function() {

    if (sessionStorage.getItem('selectedUserType') === 'volunteer') {

        document.getElementById('volunteer_fireman').selected = true;
    }
};


document.querySelector('button[type="submit"]').addEventListener('click', function() {

    const userType = document.getElementById('type').value;
    if (userType === 'Εθελοντής Πυροσβέστης') {
        sessionStorage.setItem('selectedUserType', 'volunteer');
    }
});


