require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.post('/api/contact', async (req, res) => {
  const { name, phone, projectType, bhkType, selectedServices, details } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and Phone number are required' });
  }

  try {
    const newContact = new Contact({
      name,
      phone,
      projectType,
      bhkType,
      services: selectedServices || [],
      details
    });

    const savedContact = await newContact.save();
    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: savedContact._id
    });
  } catch (error) {
    console.error('Database error during insert:', error);
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
