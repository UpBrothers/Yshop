const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const common = require('./common');
const seller = require('./seller');
const customer = require('./customer');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/Registration',(request,response)=>common.Registration(request,response));
app.post('/Registration/Check',(request,response)=>common.Check(request,response));
app.post('/Login',(request,response)=>common.Login(request,response));

app.listen(3000,function(){
    console.log('Connected 300 prot!!')
})

const port =8000;
module.exports=app;