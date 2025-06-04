const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contractRoutes = require('./routes/contracts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', contractRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});