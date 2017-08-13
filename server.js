const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append')
    }
  })
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'Home page',
      welcome: 'Hello'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
      pageTitle: 'Portfolio page',
      screamBitch: 'I am 19'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Wat the fuck'
    });
});

app.listen(port);
