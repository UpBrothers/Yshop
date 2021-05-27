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
                shopCEO: storeInfo.storeinfo[0].name,
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
    console.log(req.params.productPK)
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeInfo }) => {
        if (error)
            return res.send({ error });
        GetProductInfo("shop_template", req.params.productPK, (error, { ProductInfo }) => {
            if (error)
                return res.send({ error });

            let idxURL = (req.params.shopURL).toString();
            if (ProductInfo == null)
                return res.render('error.ejs');
            let product = {
                productPK: ProductInfo.Product_Info_View[0].productPK,
                pname: ProductInfo.Product_Info_View[0].name,
                price: ProductInfo.Product_Info_View[0].price,
                status: ProductInfo.Product_Info_View[0].status,
                views: ProductInfo.Product_Info_View[0].views,
                thumbnail: ProductInfo.Product_Info_View[0].thumbnail,
                regDate: ProductInfo.Product_Info_View[0].registrationDate,
                star: ProductInfo.Product_Info_View[0].star,
                revCount: ProductInfo.Product_Info_View[0].count,
                likeCount: ProductInfo.Product_Info_View[0].likecount,
                stock: ProductInfo.Product_Info_View[0].stock,
                dcRate: ProductInfo.Product_Info_View[0].dcRate,
                image: []
            };
            if (ProductInfo.Product_Info_View[0].image1 != null) {
                product.image[0] = ProductInfo.Product_Info_View[0].image1;
                if (ProductInfo.Product_Info_View[0].image2 != null) {
                    product.image[1] = ProductInfo.Product_Info_View[0].image2;
                    if (ProductInfo.Product_Info_View[0].image3 != null) {
                        product.image[2] = ProductInfo.Product_Info_View[0].image3;
                    }
                }
            }
            let options = {
                stockPK: [],
                option1: [],
                option2: [],
                option3: [],
                stock: [],
                extracharge: []
            };
            for (let i = 0; i < ProductInfo.Option.length; i++) {
                options.stockPK[i] = ProductInfo.Option[i].stockPK;
                options.option1[i] = ProductInfo.Option[i].option1PK;
                options.option2[i] = ProductInfo.Option[i].option2PK;
                options.option3[i] = ProductInfo.Option[i].option3PK;
                options.stock[i] = ProductInfo.Option[i].stock;
                options.extracharge[i] = ProductInfo.Option[i].extraCharge;
            }
            console.log(product);
            console.log(options);
            return res.render('product.ejs', {
                shopName: storeInfo.storeinfo[0].shopName,
                shopEmail: storeInfo.storeinfo[0].shopEmail,
                businessNo: storeInfo.storeinfo[0].businessNo,
                shopPhone: storeInfo.storeinfo[0].shopPhone,
                shopAddress: storeInfo.storeinfo[0].shopAddress,
                description: storeInfo.storeinfo[0].description,
                shopCEO: storeInfo.storeinfo[0].name,
                productInfo: product,
                optionInfo: options,
                indexURL: idxURL
            });
        })
    });
});

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});