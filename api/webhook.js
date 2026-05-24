const fetch = require('node-fetch');

const N8N_URL = 'https://nisaldilshan.app.n8n.cloud/webhook/9ae649e4-751a-4e8b-8f10-30dca987ed24';

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === 'lankabusfindertoken') {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
  } else if (req.method === 'POST') {
    await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.status(200).send('OK');
  }
};
