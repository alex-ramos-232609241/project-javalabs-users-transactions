'use strict';

const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var morgan = require('morgan');
const cookieParser = require('cookie-parser');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
  });

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

const whitelist = [process.env.FRONTEND_URL || 'http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("build"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port,()=> {
    console.log(`app running in port: ${port}`)
});

module.exports = app;