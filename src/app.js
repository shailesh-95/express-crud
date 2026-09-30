const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());          // security headers
app.use(cors());
app.use(morgan('dev'));     // request logging
app.use(express.json());    // parse JSON body

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', taskRoutes);

app.use(notFound);          // must come after routes
app.use(errorHandler);      // must be last

module.exports = app;