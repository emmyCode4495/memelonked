const express = require('express');
const cors = require('cors');
const userRoutes = require('../backend/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // to parse JSON
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Firebase Express API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
