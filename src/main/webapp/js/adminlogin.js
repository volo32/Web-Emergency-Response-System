let failedAttempts = 0;

function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    const adminUsername = "admin";
    const adminPassword = "admiN12@*";

    if (username === adminUsername && password === adminPassword) {
        alert("Welcome, Admin!");
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.location.href ='adminlobby32.html';
            }
        };
        xhr.open('POST', 'AdminLogin', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send();
    } else {
        failedAttempts++;
        const attemptsLeft = Math.max(0, 3 - failedAttempts);
        errorMessage.textContent = `Invalid username or password. You have ${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} left.`;
        if (failedAttempts >= 3) {
            alert("Too many failed attempts. Redirecting...");
            window.location.href = "http://localhost:8080/HY359_ask2_war_exploded/";
        }
    }
}
