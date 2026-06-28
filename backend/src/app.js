require('dotenv').config();
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const morgan  = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes        = require('./routes/authRoutes');
const worldRoutes       = require('./routes/worldRoutes');
const levelRoutes       = require('./routes/levelRoutes');
const challengeRoutes   = require('./routes/challengeRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const rankingRoutes     = require('./routes/rankingRoutes');
const statsRoutes       = require('./routes/statsRoutes');
const errorHandler      = require('./middlewares/errorHandler');

const app = express();

// ── Security ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// ── Rate Limiting ─────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many auth attempts, please try again later.' },
});
app.use('/api/', limiter);
app.use('/api/auth', authLimiter);

// ── Body Parser ───────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logger ────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Health Check ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/worlds',       worldRoutes);
app.use('/api/levels',       levelRoutes);
app.use('/api/challenges',   challengeRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/ranking',      rankingRoutes);
app.use('/api/stats',        statsRoutes);

// ── 404 ───────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Error Handler ─────────────────────────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 CodeQuest API running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
