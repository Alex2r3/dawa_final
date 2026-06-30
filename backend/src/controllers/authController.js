const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');

// ── Helpers ───────────────────────────────────────────────
const signToken = (user) =>
  jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

const formatUser = (u) => ({
  id: u.id, username: u.username, email: u.email,
  avatar: u.avatar, xp_total: u.xp_total, nivel: u.nivel,
  monedas: u.monedas, created_at: u.created_at,
});

// ── Validators ────────────────────────────────────────────
exports.registerValidation = [
  body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username must be 3-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// ── Register ──────────────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check duplicates
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`)
      .single();

    if (existing) {
      return res.status(409).json({ error: 'Username or email already in use' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const avatar = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`;

    const { data: user, error } = await supabase
      .from('users')
      .insert({ username, email, password_hash, avatar })
      .select('*')
      .single();

    if (error) throw error;

    const token = signToken(user);
    res.status(201).json({ token, user: formatUser(user) });
  } catch (err) {
    next(err);
  }
};

// ── Login ─────────────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user);
    res.json({ token, user: formatUser(user) });
  } catch (err) {
    next(err);
  }
};

// ── Get Me ────────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, avatar, xp_total, nivel, monedas, created_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// ── Google Login ──────────────────────────────────────────
exports.googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (verifyErr) {
      console.error('Error verifying Google token:', verifyErr);
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const { email, name, picture } = payload;
    if (!email) {
      return res.status(400).json({ error: 'Google account has no email' });
    }

    // Check if user already exists
    let { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!user) {
      // Create new user (Google Registration)
      // 1. Generate unique username from name or email prefix
      let baseUsername = (name || email.split('@')[0])
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .replace(/[^a-zA-Z0-9]/g, '');   // remove non-alphanumeric

      if (baseUsername.length < 3) {
        baseUsername = 'user' + baseUsername;
      }
      if (baseUsername.length > 30) {
        baseUsername = baseUsername.slice(0, 30);
      }
      
      let username = baseUsername;
      let isUnique = false;
      let attempt = 0;
      
      while (!isUnique && attempt < 10) {
        const checkUsername = attempt === 0 ? username : `${username}${Math.floor(100 + Math.random() * 900)}`;
        const { data: duplicate, error: dupError } = await supabase
          .from('users')
          .select('id')
          .eq('username', checkUsername)
          .maybeSingle();
          
        if (dupError) throw dupError;
        
        if (!duplicate) {
          username = checkUsername;
          isUnique = true;
        }
        attempt++;
      }
      
      // 2. Generate random password hash
      const dummyPassword = crypto.randomBytes(32).toString('hex');
      const password_hash = await bcrypt.hash(dummyPassword, 10);
      
      // 3. Avatar
      const avatar = picture || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`;

      // Insert new user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({ username, email, password_hash, avatar })
        .select('*')
        .single();

      if (insertError) throw insertError;
      user = newUser;
    }

    const customToken = signToken(user);
    res.json({ token: customToken, user: formatUser(user) });
  } catch (err) {
    next(err);
  }
};

// ── Update Profile ────────────────────────────────────────
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { username, avatar } = req.body;

    if (!username || username.trim().length < 3) {
      return res.status(400).json({ error: 'El nombre debe tener al menos 3 caracteres' });
    }
    if (username.trim().length > 50) {
      return res.status(400).json({ error: 'El nombre no puede tener más de 50 caracteres' });
    }

    // Check username uniqueness (excluding current user)
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username.trim())
      .neq('id', userId)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ error: 'Ese nombre de usuario ya está en uso' });
    }

    const updates = { username: username.trim() };
    if (avatar) updates.avatar = avatar;

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select('id, username, email, avatar, xp_total, nivel, monedas, created_at')
      .single();

    if (error) throw error;

    res.json({ user });
  } catch (err) {
    next(err);
  }
};
