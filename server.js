var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log("Cookies: ", req.cookies)
    res.send('Hello World');
})

app.get('/indexGet.html', function (req, res) {
    res.sendFile( __dirname + "/" + "indexGet.html" );
})

app.get('/indexPost.html', function (req, res) {
    res.sendFile( __dirname + "/" + "indexPost.html" );
})

app.get('/process_get', function (req, res) {
    console.log('process_get()');
    // Prepare output in JSON format
    var response = {
        name:req.query.name,
        gradeOne:req.query.gradeOne,
        gradeTwo:req.query.gradeTwo,
        gradeThree:req.query.gradeThree,
        gradeRequired: (260-req.query.gradeOne-req.query.gradeTwo-req.query.gradeThree)
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
    console.log('process_post');
    // Prepare output in JSON format
    var response = {
        name:req.body.name,
        gradeOne:req.body.gradeOne,
        gradeTwo:req.body.gradeTwo,
        gradeThree:req.body.gradeThree,
        gradeRequired: (260-req.body.gradeOne-req.body.gradeTwo-req.body.gradeThree)
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(8081, "127.0.0.1",function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})