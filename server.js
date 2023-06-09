// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "user-session",
    keys: ["quizApp"],
    maxAge: 5 * 60 * 60 * 1000,
  })
);
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const homepageRoutes = require('./routes/homepage');
const resultRoutes = require('./routes/result');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const createQuizRoutes = require('./routes/createQuiz');
const quizRoutes = require('./routes/quiz');
const logoutRoutes = require('./routes/logout');
const questionsRoutes = require('./routes/questions')
// const answersRoutes = require('./routes/answers')

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/users', userApiRoutes);
// app.use('/api/widgets', widgetApiRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/createQuiz', createQuizRoutes);
app.use('/quiz', quizRoutes);
app.use('/result', resultRoutes);
app.use('/logout', logoutRoutes);
app.use('/', homepageRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

