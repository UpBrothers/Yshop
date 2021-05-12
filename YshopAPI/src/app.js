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

app.get('/customer/storeInfo',(request,response)=>customer.storeInfo(request,response));
app.get('/customer/categoryInfo',(request,response)=>customer.categoryInfo(request,response));


////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/seller/productList',(request,response)=>seller.productList(request,response));
app.get('/seller/categoryList',(request,response)=>seller.categoryList(request,response));
app.get('/seller/benefitsList',(request,response)=>seller.benefitsList(request,response));


app.listen(3000,function(){
    console.log('Connected 300 prot!!')
})

const port =8000;
module.exports=app;