// app.js
async function fetchMessages() {
    const response = await fetch('http://127.0.0.1:5000/messages');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.username} - ${msg.content}`;
        messagesDiv.appendChild(messageElement);
    });
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value;
    if (content) {
        await fetch('http://127.0.0.1:5000/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });
        messageInput.value = '';
        fetchMessages();
    }
}

setInterval(fetchMessages, 5000); // Fetch new messages every 5 seconds
fetchMessages(); // Initial fetch
