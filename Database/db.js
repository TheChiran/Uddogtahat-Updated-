const mongoose = require('mongoose');
var express = require('express');
var app = express();
let config = require('../config');

//const {db: {host,port,name}} = config;
//let dbURL = `mongodb://${host}:${port}/${name}`;
dbURL = `mongodb+srv://uddogtahat:uddogtahat54321@cluster0-gsey2.mongodb.net/uddogtahat?retryWrites=true&w=majority`;





module.exports=dbURL;
