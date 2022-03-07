const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI =
  'mongodb+srv://et3rnald:YDRMKfqEf9kP4B4@cluster0.v8ykp.mongodb.net/node-tuts-netninja?retryWrites=true&w=majority';
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page.
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 error',
  });
});
