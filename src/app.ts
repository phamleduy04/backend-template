import express from 'express';
import logger from 'morgan';
import * as path from 'path';

import rateLimit from 'express-rate-limit';

// Routes
import { index } from './routes/index';
// Create Express server
export const app = express();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to API calls only
// app.use('/api', apiLimiter)

app.use('*', apiLimiter);

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', index);
