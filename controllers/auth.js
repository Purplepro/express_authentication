const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'See you next time...');
  res.redirect('/');
});



///post routes

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'welcome back ...',
  failureFlash: 'Either email or password is incorrect. Please try again.'
}))

router.post('/signup', async (req, res) => {
  const { name, email, password} = req.body;
  try {
    const [user, email, password] = await db.user.findOrCreate({
      where: {email},
      default: { name, password }
    });

    if(created) {
      console.log(`-----${user.name} was created------`);
      const successObject = {
        successRedirect: '/',
        successFlash: `Weclome ${user.name}. Account was created`
      }

      passport.authenticate('local', successObject)(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  } catch (error) {
    console.log('-------Error-------')
    console.log(error);
    //handle the user in case something goes wrong
    req.flash('error', 'Either email or password is incorrect. Please try again');
    res.redirect('/auth/signup');
  }
});

module.exports = router;
