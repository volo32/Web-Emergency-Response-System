/*document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            // Κλήση στο LoginUser endpoint για έλεγχο σύνδεσης
            fetch('/LoginUser', { method: 'GET' })
                .then(response => {
                    if (response.status === 200) {
                        loadChatWidget(); // Εμφάνιση του chat widget
                    } else {
                        console.error('User not logged in');
                    }
                })
                .catch(err => console.error('Error checking login status:', err));
        });
    }

    // Αυτόματος έλεγχος για συνδεδεμένο χρήστη κατά την αρχική φόρτωση
    fetch('/LoginUser', { method: 'GET' })
        .then(response => {
            if (response.status === 200) {
                loadChatWidget(); // Εμφάνιση του chat widget
            }
        })
        .catch(err => console.error('Error checking login status on load:', err));
});*/

function loadChatWidget() {
    if (!document.getElementById('chat-widget')) {
        fetch('message.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = 'css/message.css';
                document.head.appendChild(cssLink);
                //initializeChat();
            })
            .catch(err => console.error('Failed to load chat widget:', err));
    } else {
        const chatWidget = document.getElementById('chat-widget');
        chatWidget.style.display = 'block';
    }
}



function MessagesChatSelectionGET(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
            MakeButtonsForChatSelection(xhr.response);

        }
    };
    xhr.open('GET', 'MessagesChatSelection');
    xhr.send();
}

function MessagesForChatGET(incident_id){
    var xhr = new XMLHttpRequest();
    const params = new URLSearchParams({
        incident_id: incident_id
    }).toString();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(JSON.stringify(xhr.response));
            displayMessages(xhr.response);
        }
    };
    xhr.open('GET', `MessagesChat?${params}`);
    xhr.send();
}


function displayMessages(jsonString) {
    try {

        const messages = JSON.parse(jsonString);


        const container = document.getElementById("chat-section");
        container.innerHTML = ""; // Clear any previous content


        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.marginTop = "10px";


        const headerRow = document.createElement("tr");
        ["sender", "message", "date_time"].forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            th.style.border = "1px solid #ddd";
            th.style.padding = "8px";
            th.style.textAlign = "left";
            th.style.backgroundColor = "#f2f2f2";
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);


        messages.forEach(message => {
            const row = document.createElement("tr");

            // Extract only the sender, message, and date_time fields
            ["sender", "message", "date_time"].forEach(key => {
                const td = document.createElement("td");
                td.textContent = message[key];
                td.style.border = "1px solid #ddd";
                td.style.padding = "8px";
                row.appendChild(td);
            });

            table.appendChild(row);
        });

        // Append the table to the container
        container.appendChild(table);
    } catch (error) {
        console.error("Invalid JSON string provided:", error);
    }
}


function MakeButtonsForChatSelection(ids_string){
    const container = document.getElementById("chat-selection");

    container.innerHTML = "";

    const id_array= JSON.parse(ids_string);


    id_array.forEach(value => {

        const button = document.createElement("button");


        button.className = "incident-button";
        button.textContent = "Incident " + value;


        button.addEventListener("click", () => {
            MessagesForChatGET(value);
        });

        container.appendChild(button);
    });
}

function MessagePOST(){
    let myForm = document.getElementById('ChatForm');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    var jsonData=JSON.stringify(data);
    console.log(jsonData);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

        } else if (xhr.status !== 200) {

        }
    };
    xhr.open('POST', 'MessagesChat',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}
/*function initializeChat() {
    const chatWidget = document.getElementById('chat-widget');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatClose = document.getElementById('chat-close');

    // Κλείσιμο widget
    chatClose.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    // Αποστολή μηνύματος
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();

        if (message) {
            addMessage('user', message);
            chatInput.value = '';

            fetch('/api/chat/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, timestamp: new Date().toISOString() })
            }).then(response => {
                if (!response.ok) {
                    console.error('Failed to send message');
                }
            }).catch(err => console.error('Error:', err));
        }
    });

    // Φόρτωση μηνυμάτων
    const loadMessages = () => {
        fetch('/api/chat/getMessages')
            .then(response => response.json())
            .then(messages => {
                chatMessages.innerHTML = '';
                messages.forEach(msg => {
                    addMessage(msg.role, `${msg.sender}: ${msg.message}`);
                });
                chatMessages.scrollTop = chatMessages.scrollHeight;
            })
            .catch(err => console.error('Error loading messages:', err));
    };

    // Προσθήκη μηνύματος στο chat
    const addMessage = (role, content) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', role);
        messageDiv.textContent = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Φόρτωση αρχικών μηνυμάτων
    loadMessages();

    // Επαναφόρτωση κάθε 5 δευτερόλεπτα
    setInterval(loadMessages, 5000);
}*/
