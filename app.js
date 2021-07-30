require('./config/config');
require('./models/db');
require('./config/passportConfig');
var formController = require('./controllers/formController.js');
var college = require('./controllers/college.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var path=require('path');

const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/form', formController);
app.use('/college', college);


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req,res) => {

    res.sendFile(path.join(__dirname , 'public/index.html'));
    });

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }

});
const port = process.env.PORT || 8080 ;

// start server
app.listen(port, () => console.log(`Server started at port : ${process.env.PORT}`));