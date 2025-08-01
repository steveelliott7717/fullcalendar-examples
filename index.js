// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// GET /events — FullCalendar will call this to fetch events
app.get('/events', async (req, res) => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /events — FullCalendar can send new events here
app.post('/events', async (req, res) => {
  const { title, start, end, all_day } = req.body;
  const { data, error } = await supabase.from('events').insert([
    { title, start, end, all_day }
  ]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
