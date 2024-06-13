const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const discordToken = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.DISCORD_CHANNEL_ID;

app.get('/messages', async (req, res) => {
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
        headers: {
            'Authorization': `Bot ${discordToken}`
        }
    });
    const messages = await response.json();
    res.json(messages.map(msg => ({ username: msg.author.username, content: msg.content })));
});

app.post('/send', async (req, res) => {
    const { content } = req.body;
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            'Authorization': `Bot ${discordToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    });
    res.sendStatus(response.ok ? 200 : 500);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
