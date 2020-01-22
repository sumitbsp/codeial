const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/', require('./routes'))

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err) {
    if (err) {
        console.log(`error in running the server: ${err}`);
    };
    console.log(`server is succesfully running on port: ${port}`)
})