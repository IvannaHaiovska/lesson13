const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./src/backend/models");
const User = db.users;
localStrategy = require("passport-local");
const passport = require('passport');
var session = require('express-session');

app.use(function (req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    'access-control-allow-credentials': true,
  });
  // update to match the domain you will make the request from
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var auth = require('./src/backend/routes/auth');
db.sequelize.sync();

// passport config
require('./src/backend/config/passport')
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//default route
app.get('/', (req, res) => res.send('Hello my World'));

app.use('/auth', auth);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require('./src/backend/routes/users')(app);
app.listen();
