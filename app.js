const express = require('express');
const app = express();

const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const index = require('./controllers/index');
const ordering = require('./controllers/ordering');
const ordered = require('./controllers/ordered');
const card = require('./controllers/card');
const greeting = require('./controllers/greeting');
const greeted = require('./controllers/greeted');
const dataValidator = require('./middlewares/dataValidator');


app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());
app.use(dataValidator('/ordering'));

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');


app.use('/', index);
app.use('/ordering', ordering);
app.use('/ordered', ordered);
app.use('/card', card);
app.use('/greeting', greeting);
app.use('/greeted', greeted);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const URL = process.env.URL || 'http://localhost';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on ${URL}:${PORT}`);
});
