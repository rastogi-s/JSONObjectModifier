// require express
var express = require('express')
var app = express();


// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err.status === 400)
        return res.status(err.status).send({
            "verb": req.method,
            "url": req.protocol + '://' + req.get('host') + req.originalUrl,
            "message": "Not a JSON Object"
        });
    return next(err);
});
// require mongoose

// for local connection string
var connectionString = 'mongodb://127.0.0.1:27017/tiny-url';

// check if running remotely
if (process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
}

// configure the rest access.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        req.headers.origin);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var urlService = require('./services/json-modifier.service.server');
urlService(app);




app.listen(process.env.PORT || 5500, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});