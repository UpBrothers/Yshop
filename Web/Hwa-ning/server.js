var express = require('express');
var app = express();
const GetStoreInfo = require('./util/storeInfo');
const GetProductList = require('./util/productList');
const GetProductInfo = require('./util/productInfo');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/customer/:shopURL', function (req, res) {
    // 메인 페이지
    console.log(req.params.shopURL);
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeInfo }) => {
        if (error)
            return res.send({ error });
        GetProductList("shop_template", (error, { ProductList }) => {
            if (error)
                return res.send({ error });
            let product = {
                productPK: [],
                name: [],
                price: [],
                status: [],
                views: [],
                thumbnail: [],
                registrationDate: [],
                star: [],
                count: [],
                likecount: [],
                stock: [],
                dcRate: []
            };
            for (let i = 0; i < ProductList.length; i++) {
                product.productPK[i] = ProductList[i].productPK;
                product.name[i] = ProductList[i].name;
                product.price[i] = ProductList[i].price;
                product.status[i] = ProductList[i].status;
                product.views[i] = ProductList[i].views;
                product.thumbnail[i] = ProductList[i].thumbnail;
                product.registrationDate[i] = ProductList[i].registrationDate;
                product.star[i] = ProductList[i].star;
                product.count[i] = ProductList[i].count;
                product.likecount[i] = ProductList[i].likecount;
                product.stock[i] = ProductList[i].stock;
                product.dcRate[i] = ProductList[i].dcRate;
            }
            var idxURL = (req.params.shopURL).toString();
            return res.render('index.ejs', {
                shopName: storeInfo.storeinfo[0].shopName,
                shopEmail: storeInfo.storeinfo[0].shopEmail,
                businessNo: storeInfo.storeinfo[0].businessNo,
                shopPhone: storeInfo.storeinfo[0].shopPhone,
                shopAddress: storeInfo.storeinfo[0].shopAddress,
                description: storeInfo.storeinfo[0].description,
                name: "밍기",
                category: storeInfo.categoryinfo,
                productList: product,
                indexURL: idxURL
            });
        })
    });
});

app.get('/customer/:shopURL/product/:productPK', function (req, res) {
    // 상품 상세보기 수정중
    console.log(req.params.shopURL);
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeInfo }) => {
        if (error)
            return res.send({ error });
        GetProductInfo("shop_template", req.params.productPK, (error, { ProductList }) => {
            if (error)
                return res.send({ error });

            var idxURL = (req.params.shopURL).toString();
            return res.render('product.ejs', {
                shopName: storeInfo.storeinfo[0].shopName,
                shopEmail: storeInfo.storeinfo[0].shopEmail,
                businessNo: storeInfo.storeinfo[0].businessNo,
                shopPhone: storeInfo.storeinfo[0].shopPhone,
                shopAddress: storeInfo.storeinfo[0].shopAddress,
                description: storeInfo.storeinfo[0].description,
                name: "밍기",
                category: storeInfo.categoryinfo,
                productList: product,
                indexURL: idxURL
            });
        })
    });
});

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});