

function checkFormValidity(requiredFieldIds = null) {
    if (!requiredFieldIds) {
        requiredFieldIds = [
            "username",
            "email",
            "password",
            "confirm_password",
            "firstname",
            "lastname",
            "birthdate",
            "afm",
            "type",
            "country",
            "prefecture",
            "municipality",
            "address",
            "telephone",
            "job",
            "terms-policies"
        ];
    }

    let errors = [];
    let allFieldsValid = true;


    for (const fieldId of requiredFieldIds) {
        const field = document.getElementById(fieldId);

        if (!field) continue;

        if (field.type === "radio") {
            const radios = document.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radios).some((radio) => radio.checked);
            if (!isChecked) {
                errors.push(`Please select a value for ${fieldId}.`);
                allFieldsValid = false;
            }
        } else if (field.value.trim() === "") {
            errors.push(`Please fill the ${fieldId} field.`);
            allFieldsValid = false;
        } else if (field.type === "checkbox" && !field.checked) {
            errors.push(`Please agree to the ${fieldId} policy.`);
            allFieldsValid = false;
        }

    }


    if (!checkPasswordsValidity()) {
        allFieldsValid = false;
        errors.push("Passwords do not match or are invalid.");
    }


    const birthDateField = document.getElementById("birthdate");
    if (birthDateField) {
        const birthDate = new Date(birthDateField.value);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (!(age >= 18 && age <= 55)) {
            allFieldsValid = false;
            errors.push("Age must be between 18 and 55.");
        }
    }


    const userType = document.getElementById("type")?.value;
    if (userType === "Εθελοντής Πυροσβέστης") {
        const extraFields = ["height", "weight", "terms-fireman's"];
        for (const fieldId of extraFields) {
            const field = document.getElementById(fieldId);
            if (field && field.value.trim() === "") {
                allFieldsValid = false;
                errors.push(`Please fill the ${fieldId} field.`);
            }
            if (field.type === "checkbox" && !field.checked) {
                errors.push(`Please agree to the ${fieldId} terms.`);
                allFieldsValid = false;
            }
        }
    }


    if (allFieldsValid && userType === "Απλός Χρήστης") {
        RegisterUserPOST();
    } else if (allFieldsValid && userType === "Εθελοντής Πυροσβέστης") {
        RegisterVolunteerPOST();
    } else {
        alert("Errors:\n" + errors.join("\n"));
    }
}

function checkFormValidityVisitor() {
    const eventFieldIds = ["phone", "address", "description", "date"];
    let errors = [];
    let allFieldsValid = true;


    for (const fieldId of eventFieldIds) {
        const field = document.getElementById(fieldId);

        if (!field) {
            continue;
        }

        if (field.value.trim() === "") {
            errors.push(`Please fill the ${fieldId} field.`);
            allFieldsValid = false;
        }
    }

    if (allFieldsValid) {
        alert("Event submitted successfully!");
        submitEventForm();
    } else {
        alert("Errors:\n" + errors.join("\n"));
    }
}

function submitEventForm() {
    const form = document.getElementById("eventForm");
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/submitEvent", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert("Event successfully submitted!");
        } else {
            alert("There was an error submitting the event.");
        }
    };

    xhr.send(JSON.stringify(data));
}

function RegisterUserPOST() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    const data = {};



    formData.forEach((value, key) => (data[key] = value));
    data['lat'] = '35.3401097';
    data['lon'] = '25.1562301';
    const jsonData = JSON.stringify(data);
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('Check').innerHTML = "Successful Registration. Now please log in!<br> Your Data";
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 2000);
        } else if (xhr.status === 403) {
            document.getElementById('Check').innerHTML = 'Request failed. Username or Email or Telephone already in use-Status Code ' + xhr.status + "<br>";
        }
    };

    xhr.open('POST', 'RegisterUser', true);
    xhr.setRequestHeader("Content-type", "application/json");
    // Send the request
    xhr.send(jsonData);
}


function RegisterVolunteerPOST() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    const data = {};



    formData.forEach((value, key) => (data[key] = value));
    data['lat'] = '35.3401097';
    data['lon'] = '25.1562301';
    data['volunteer_type'] = document.getElementById("volunteer_type").value;
    data['height'] = document.getElementById("height").value;
    data['weight'] = document.getElementById('weight').value;
    const jsonData = JSON.stringify(data);

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('Check').innerHTML = "Successful Registration. Now please log in!<br> Your Data";
        } else if (xhr.status === 403) {
            document.getElementById('Check').innerHTML = 'Request failed. Username already in use-Status Code ' + xhr.status + "<br>";
        }
    };

    xhr.open('POST', 'RegisterVolunteer', true);
    xhr.setRequestHeader("Content-type", "application/json");
    // Send the request
    xhr.send(jsonData);
}


function toggleField() {
    var selectedValue = document.getElementById('type').value;
    var extraField = document.getElementById('extraField');
    var reguralTerms = document.getElementById('terms');
    var firemanTerms = document.getElementById('terms-fireman');

    if (selectedValue === 'Εθελοντής Πυροσβέστης') {
        extraField.style.display = 'block';
        firemanTerms.style.display = 'block';
        reguralTerms.style.display = 'none';
    } else {
        extraField.style.display = 'none';
        firemanTerms.style.display = 'none';
        reguralTerms.style.display = 'block';
    }
}

function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}


function checkPasswordsValidity() {
    const password1 = document.getElementById("password").value;
    const password2 = document.getElementById("confirm_password").value;
    const errorMessage = document.getElementById("error-message");
    const forbiddenPatterns = /fire|fotia|ethelontis|volunteer/i;
    const strengthPasswordMessage = document.getElementById("strength-password-message");


    if (forbiddenPatterns.test(password1)) {
        errorMessage.textContent = "Το password περιέχει απαγορευμένες λέξεις";
        errorMessage.style.color = "red";
        return 0;
    }

    if (!checkPasswordsStrength()) {
        errorMessage.textContent = "Τo password δεν μπορεί να είναι weak";
        errorMessage.style.color = "red";
        return 0;
    }

    strengthPasswordMessage.textContent = "";

    if (password1 === password2) {
        errorMessage.textContent = "Τα passwords είναι ίδια!";
        errorMessage.style.color = "green";
        return 1;
    } else {
        errorMessage.textContent = "Τα passwords δεν ταιριάζουν!";
        errorMessage.style.color = "red";
        return 0;
    }
}

function checkPasswordsStrength() {
    const strengthPasswordMessage = document.getElementById("strength-password-message");
    const password1 = document.getElementById("password").value;
    const password2 = document.getElementById("confirm_password").value;
    const halfLength = Math.ceil(password1.length / 2);
    const charCounts = {};
    const digitCount = (password1.match(/\d/g) || []).length;
    const hasUpperCase = /[A-Z]/.test(password1);
    const hasLowerCase = /[a-z]/.test(password1);
    const hasNumber = /\d/.test(password1);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password1);

    if (digitCount / password1.length >= 0.5) {
        strengthPasswordMessage.textContent = "Weak password: Περιέχει υπερβολικούς αριθμούς";
        strengthPasswordMessage.style.color = "yellow";
        return 0;
    }


    for (let char of password1) {
        charCounts[char] = (charCounts[char] || 0) + 1;

        if (charCounts[char] >= halfLength) {
            strengthPasswordMessage.textContent = "Weak password: τουλάχιστον το 50% είναι ο ίδιος χαρακτήρας";
            strengthPasswordMessage.style.color = "yellow";
            return 0;
        }
    }

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        strengthPasswordMessage.textContent = "Strong password";
        strengthPasswordMessage.style.color = "green";
        return 1;
    } else {
        strengthPasswordMessage.textContent = "Medium password - Προσθέστε κεφαλαία, μικρά, αριθμούς, και σύμβολα.";
        strengthPasswordMessage.style.color = "orange";
        return 1;
    }
}
