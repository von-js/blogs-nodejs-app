const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes.js');
// express app
const app = express();

// connect to mongodb
const dbURI = {
  url: 'mongodb://localhost:27017/mydb',
  user: 'username',
  pwd: 'password'
}
mongoose.connect(dbURI.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: dbURI.user,
  pass: dbURI.pwd
}).then(() => {
  app.listen(3000);
  console.log('connected to data base'); 
}).catch(err => {
  console.log(err);
  process.exit();
});

// register view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Error'});
});