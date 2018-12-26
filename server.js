const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        console.log("Not able to write the log");
    });
    next();

});

/*app.use((req, res, next) => {
    res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('streamIt', (text) => {
    return text.toUpperCase();
});
app.get('/',(req, res) => {
    //res.send("Hello Express...");
    /*res.send({
       name: 'urvisha',
        likes: [
            'singing',
            'dancing'
        ]
    });*/
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to brand new nodejs website.'
    });

});

app.get('/about', (req, res) => {
    /*res.send("About us page");*/
    res.render('about.hbs',{
        pageTitle: 'About us Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Bad request..."
    });
});

app.listen(port, () => {
    console.log(`connection is up on port ${port}`);
});