const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/proxy/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const apiUrl = `https://yuvasetu-5kqb.vercel.app/api/youth/teams/event/${eventId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from API' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});