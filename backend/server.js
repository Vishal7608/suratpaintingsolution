require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const contactLimiter = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(mongoSanitize());
app.use(morgan('dev'));

app.use('/api', contactLimiter);

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/contact', contactRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/housepainterssurat')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
