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
const ACTION_LAST_TRANSACTION = 'last_transaction';
const ACTION_TRANSACTIONS = 'last_5_transaction';
const ACTION_CARD = 'card_info';
const ACTION_GENERAL = 'general';
const ACTION_ACCOUNT = 'account';
const ACTION_FALLBACK = 'input.unknown';
const ACTION_MENU = 'main_menu';

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
        case ACTION_ACCOUNT:
            msg = 'Okay, I can  tell you about your : \n 1. Available balance \n 2. Last transaction \n 3. Last 5 transactions \n  What would you like to know more?' ;
            ctxOut = [{'name': 'available-balance', 'lifespan': 1}, {'name': 'last-transaction', 'lifespan': 1}, {'name': 'last-5-transactions', 'lifespan': 1}] ;
            sendResponseV1(msg, ctxOut);   
        break;

        case ACTION_PHONE:
            //var phone = (req.body.result.contexts[0].parameters.phonenumber != '') ? req.body.result.contexts[0].parameters.phonenumber : req.body.result.parameters.phonenumber
            var phoneNumber = new String(req.body.result.parameters.phonenumber) ;
            if(phoneNumber.length >= 10){
                msg = 'Thanks for entering the phone number, please verify the received otp' ;
                ctxOut = [{'name': 'expecting-otp', 'lifespan': 1}, {'name': 'expecting-phone', 'lifespan': 0}] ;
            }    
            else{
                msg = 'Sorry, that seems to be incorrect. Please enter a registered phone number' ;
                ctxOut = [{'name': 'expecting-phone', 'lifespan': 1, 'parameters': {'phonenumber': phoneNumber}}, {'name': 'expecting-otp', 'lifespan': 0}] ;
            }
            sendResponseV1(msg, ctxOut);
        break;

        case ACTION_CARD:
            msg = 'Okay, What would you like to know about the selected card. : \n 1. Available balance \n 2. Last transaction \n 3. Last 5 transactions ' ;
            ctxOut = [{'name': 'available-balance', 'lifespan': 1}, {'name': 'last-transaction', 'lifespan': 1}, {'name': 'last-5-transactions', 'lifespan': 1}, {'name': 'cardinfo-followup', 'lifespan': 0}] ;
            sendResponseV1(msg, ctxOut);   
        break;

        case ACTION_FALLBACK:
            //todo
        break;    

        default:
            sendResponseV1(msg);
            break;

    }

    function sendResponseV1(msg, ctxOut=[]){
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


