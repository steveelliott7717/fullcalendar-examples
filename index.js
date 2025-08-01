 
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let events = [];
let event_id_counter = 1;

// Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// Create event
app.post('/events', (req, res) => {
  const data = req.body;
  data.id = event_id_counter++;
  events.push(data);
  res.status(201).json(data);
});

// Update event
app.put('/events/:event_id', (req, res) => {
  const event_id = parseInt(req.params.event_id);
  const update = req.body;
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === event_id) {
      events[i] = { ...events[i], ...update };
      return res.json(events[i]);
    }
  }
  res.status(404).json({ error: 'Event not found' });
});

// Delete event
app.delete('/events/:event_id', (req, res) => {
  const event_id = parseInt(req.params.event_id);
  const index = events.findIndex(e => e.id === event_id);
  if (index !== -1) {
    events.splice(index, 1);
    return res.json({ message: 'Event deleted' });
  }
  res.status(404).json({ error: 'Event not found' });
});

app.listen(port, () => {
  console.log(`Calendar API running on port ${port}`);
});
