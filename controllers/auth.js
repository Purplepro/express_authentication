const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'welcome back ...',
  failureFlash: 'Either email or password is incorrect. Please try again.'
}))

module.exports = router;
