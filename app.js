const backendUrl = 'http://127.0.0.1:5000'; // Change this to your deployed backend URL when deployed

async function fetchMessages() {
    try {
        const response = await fetch(`${backendUrl}/messages`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const messages = await response.json();
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `Message from (${msg.username}): ${msg.content}`;
            messagesDiv.appendChild(messageElement);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value;
    if (content) {
        try {
            const response = await fetch(`${backendUrl}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: 'anonymous', content }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            messageInput.value = '';
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

setInterval(fetchMessages, 5000); // Fetch new messages every 5 seconds
