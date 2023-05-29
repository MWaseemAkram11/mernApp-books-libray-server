Promise = require('bluebird');
const port  = 5000;
const mongoose = require('./config/mongoose');
const app = require('./config/express');
const http = require('http');
mongoose.connect().then(res=>{
    console.log(`mongodb connected successfully`)
}).catch(err =>{
    console.log(`something wrong---DB`)
});
http.createServer(app).listen(port, console.log(`running server----`, port));
module.exports = app;