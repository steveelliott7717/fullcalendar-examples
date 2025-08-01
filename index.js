const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory event storage (use a database for production)
let events = [];

app.use(cors());
app.use(express.json()); // For parsing application/json

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// Add a new event
app.post('/events', (req, res) => {
  const { title, date, time, description } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: 'Missing required fields: title, date' });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    date,
    time: time || '',
    description: description || '',
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
