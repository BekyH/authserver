const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const hostname = 'localhost';
const port = 3000;
const url = 'mongodb://localhost:27017/users'
const userRouter = require('./routes/userrouter');
mongoose.connect(url,()=>{
    console.log('connected to the server');
})
const app = express();
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/users',userRouter);

const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log("server started");
})