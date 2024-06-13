// app.js
let username = '';

function login() {
    const usernameInput = document.getElementById('usernameInput');
    username = usernameInput.value.trim();
    if (username) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        fetchMessages();
    } else {
        alert('Please enter a username');
    }
}

const backendUrl = 'http://127.0.0.1:5000';

async function fetchMessages() {
    const response = await fetch(`${backendUrl}/messages`);
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `Message from (${msg.username}): ${msg.content}`;
        messagesDiv.appendChild(messageElement);
    });
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value;
    if (content) {
        await fetch(`${backendUrl}/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, content }),
        });
        messageInput.value = '';
        fetchMessages();
    }
}

setInterval(fetchMessages, 5000); // Fetch new messages every 5 seconds
