const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Stripe secret key not set in environment variables.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000; 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const users = [{ id: 1, username: 'Admin', password: bcrypt.hashSync('123', 10) }];

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: '7ca610b1fc1aacbd042682f0b7c3b84f0a3bda8ba46fcdf88c6fe7fae6acaf1784b4ff0b20e634c33c0e4c0f903f0ac097bc4a2a9cc18bea5a4c15064bf087c6', 
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ username: req.user.username });
});

// app.post('/logout', (req, res) => {
  // req.logout((err) => {
    // if (err) return res.status(500).json({ error: 'Logout failed' });
    // res.json({ message: 'Logged out successfully' });
  // });
// });

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).send({ error: 'Invalid or missing amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});