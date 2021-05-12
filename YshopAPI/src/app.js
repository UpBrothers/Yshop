const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const common = require('./common');
const seller = require('./seller');
const customer = require('./customer');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/registration',(request,response)=>common.registration(request,response));
app.post('/registration/check',(request,response)=>common.check(request,response));
app.post('/login',(request,response)=>common.login(request,response));
////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/customer/storeinfo',(request,response)=>customer.storeinfo(request,response));
app.get('/customer/categoryinfo',(request,response)=>customer.categoryinfo(request,response));


////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/seller/productlist',(request,response)=>seller.productlist(request,response));
app.get('/seller/categorylist',(request,response)=>seller.categorylist(request,response));
app.get('/seller/benefitslist',(request,response)=>seller.benefitslist(request,response));


app.listen(3000,function(){
    console.log('Connected 300 prot!!')
})

const port =8000;
module.exports=app;