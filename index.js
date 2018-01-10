'use strict' ;

process.env.DEBUG = 'actions-on-google:*' ;

const express = require('express') ; 
const bodyParser = require('body-parser');
const http = require('http');
//const Assistant = require('actions-on-google').ApiAiAssistant ;

const server = express();

server.use(bodyParser.urlencoded( {
    extended:true } ));
server.use(bodyParser.json());

server.post('/phone', function(req, res) {
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

server.listen((process.env.port || 3000), function() {
    console.log("Bot webhook Server is up and running");
});


