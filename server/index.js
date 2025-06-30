const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI);
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5005;
app.listen(PORT);
