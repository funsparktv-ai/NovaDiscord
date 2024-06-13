document.getElementById('sendButton').addEventListener('click', sendMessage);

async function fetchMessages() {
    const response = await fetch('https://nova-discord-funsparktv-ais-projects.vercel.app/messages');
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
    const input = document.getElementById('messageInput');
    const message = input.value;
    await fetch('https://nova-discord-funsparktv-ais-projects.vercel.app/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
    });
    input.value = '';
    fetchMessages();
}

// Fetch messages initially and every 5 seconds
fetchMessages();
setInterval(fetchMessages, 5000);
