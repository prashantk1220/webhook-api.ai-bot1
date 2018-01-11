'use strict' ;

const express = require('express') ; 
const bodyParser = require('body-parser');
const http = require('http');
//const Assistant = require('actions-on-google').ApiAiAssistant ;
//process.env.DEBUG = 'actions-on-google:*' ;
const port = process.env.PORT || 5000;
const server = express();

const ACTION_PHONE = 'phone';
const ACTION_BALANCE = 'available_balance';
const ACTION_CARD = 'card';
const ACTION_GENERAL = 'general';
const ACTION_ACCOUNT = 'account';
const ACTION_FALLBACK = 'input.unknown';
const ACTION_WELCOME = 'input.welcome';

server.use(bodyParser.urlencoded( {
    extended:true } ));
server.use(bodyParser.json());

server.get('/', function(req, res){
    res.sendStatus(200);
});

server.post('/fulfill', function(req, res) {
    var action = req.body.result.action;
    let msg = '';
    var ctxOut;

    switch(action){
        case ACTION_WELCOME:
            //todo 
        break;

        case ACTION_PHONE:
            var phoneNumber = new String(req.body.result.parameters.phoneNumber) ;
            if(phoneNumber.length >= 10){
                msg = 'Thanks for entering the phone number, please verify the received otp' ;
                ctxOut = [{'name': 'expecting-otp', 'lifespan': 1}, {'name': 'expecting-phone', 'lifespan': 0}] ;
            }    
            else{
                msg = 'Sorry, that seems to be incorrect. Please enter a registered phone number' ;
                ctxOut = [{'name': 'expecting-phone', 'lifespan': 1}, {'name': 'expecting-otp', 'lifespan': 0}] ;
            }
            sendResponse(msg, ctxOut);
            break;

        case ACTION_FALLBACK:
            //todo
            break;    

        default:
            sendResponse(msg);
            break;

    }

    function sendResponse(msg, ctxOut=[]){
        return res.json({
            speech: msg,
            displayText: msg, 
            contextOut: ctxOut,
            source: 'node-webhook'
        });
    }
});

server.listen(port, function() {
    console.log("Bot webhook Server is up and running on "+port);
});


