const scriptURL = 'https://script.google.com/macros/s/AKfycbxYQyhSGcyxgcHdCX725NMjmVzZXEpi_Mp6sP0OcXWpYmdXNSflPNpfKnCkc6sMplIoxQ/exec';

document.getElementById('sendButton').addEventListener('click', sendMessage);

async function fetchMessages() {
    const response = await fetch(scriptURL);
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.author.username} - ${msg.content}`;
        messagesDiv.appendChild(messageElement);
    });
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    await fetch(scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });
    input.value = '';
    fetchMessages();
}

// Fetch messages initially and every 5 seconds
fetchMessages();
setInterval(fetchMessages, 5000);
