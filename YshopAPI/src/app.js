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
app.get('/customer/showproductlist',(request,response)=>customer.showproductlist(request,response));
app.get('/customer/productinfo',(request,response)=>customer.productinfo(request,response));


////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/seller/productlist',(request,response)=>seller.productlist(request,response));
app.get('/seller/productinfo',(request,response)=>seller.productinfo(request,response));
app.post('/seller/addproduct',(request,response)=>seller.addproduct(request,response));

app.post('/seller/removeproduct',(request,response)=>seller.removeproduct(request,response));
app.get('/seller/categorylist',(request,response)=>seller.categorylist(request,response));
app.post('/seller/addcategory',(request,response)=>seller.addcategory(request,response));
app.post('/seller/removecategory',(request,response)=>seller.removecategory(request,response));
app.get('/seller/benefitslist',(request,response)=>seller.benefitslist(request,response));
app.post('/seller/addbenefits',(request,response)=>seller.addbenefits(request,response));
app.post('/seller/removebenefits',(request,response)=>seller.removebenefits(request,response));


app.listen(3000,function(){
    console.log('Connected 300 prot!!')
})

const port =8000;
module.exports=app;