'use strict' ;


const express = require('express') ; 
const bodyParser = require('body-parser');
const http = require('http');
//const Assistant = require('actions-on-google').ApiAiAssistant ;
//process.env.DEBUG = 'actions-on-google:*' ;
var port = process.env.PORT || 5000;
const server = express();

server.use(bodyParser.urlencoded( {
    extended:true } ));
server.use(bodyParser.json());

server.get('/', function(req, res){
    res.sendStatus(200);
});

server.post('/fulfill', function(req, res) {
    var phone = req.body.result && req.body.result.parameters && req.body.result.parameters.phoneNumber ;
    if(phone != null){
        return res.json({
            speech: 'Thank you, Please enter the otp',
            displayText: 'Thank you, Please enter the otp',
            source: 'node-webhook'
        });
    }
    else{
        return res.json({
            speech: 'No Phone number provided, Please provide a valid phone number',
            displayText: 'No Phone number provided, Please provide a valid phone number',
            source: 'node-webhook'
        });
    }
});

server.listen(port, function() {
    console.log("Bot webhook Server is up and running");
});


