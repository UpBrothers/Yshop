var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const GetStoreInfo = require('./util/storeInfo');
const GetProductList = require('./util/productList');
const GetProductInfo = require('./util/productInfo');
const Login_process = require('./util/login_process');
const Reg_process = require('./util/reg_process');

const bodyParser = require('body-parser');
const sessionKey = require('./session_key');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const sessionkey = require("./session_key");
app.use(session({
    secret: sessionkey,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
        maxAge: 60 * 60 * 100
    }
}))

app.get('/customer/:shopURL/logout_process', function (req, res) {
    req.session.destroy();
    return res.redirect('/customer/' + req.params.shopURL);
})

app.get('/customer/:shopURL', function (req, res) {
    // 메인 페이지
    console.log(req.params.shopURL);
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeInfo }) => {
        if (error)
            return res.send({ error });
        GetProductList("shop_template", (error, { ProductList }) => {
            if (error)
                return res.send({ error });
            let category = [];
            for (let i = 0; i < storeInfo.categoryinfo.length; i++) {
                if (storeInfo.categoryinfo[i].groupName2 == null)
                    category.push(storeInfo.categoryinfo[i].groupName1);
                else {
                    if (storeInfo.categoryinfo[i].groupName3 == null)
                        category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2);
                    else
                        category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2 + "@" + storeInfo.categoryinfo[i].groupName3);
                }
            }
            console.log(category);
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
            let StoreInfo = {
                shopImage: storeInfo.storeinfo[0].image,
                shopName: storeInfo.storeinfo[0].shopName,
                shopEmail: storeInfo.storeinfo[0].shopEmail,
                businessNo: storeInfo.storeinfo[0].businessNo,
                shopPhone: storeInfo.storeinfo[0].shopPhone,
                shopAddress: storeInfo.storeinfo[0].shopAddress,
                description: storeInfo.storeinfo[0].description,
                shopCEO: storeInfo.storeinfo[0].name,
            }
            var idxURL = (req.params.shopURL).toString();
            return res.render('index.ejs', {
                categoryInfo: category,
                category: storeInfo.categoryinfo,
                storeInfo: StoreInfo,
                productList: product,
                indexURL: idxURL,
                loginInfo: req.session.userID
            });
        })
    });
});

app.get('/customer/:shopURL/product/:productPK', function (req, res) {
    // 상품 상세보기 수정완료
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
            let StoreInfo = {
                shopImage: storeInfo.storeinfo[0].image,
                shopName: storeInfo.storeinfo[0].shopName,
                shopEmail: storeInfo.storeinfo[0].shopEmail,
                businessNo: storeInfo.storeinfo[0].businessNo,
                shopPhone: storeInfo.storeinfo[0].shopPhone,
                shopAddress: storeInfo.storeinfo[0].shopAddress,
                description: storeInfo.storeinfo[0].description,
                shopCEO: storeInfo.storeinfo[0].name,
            }
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
            let category = [];
            for (let i = 0; i < storeInfo.categoryinfo.length; i++) {
                if (storeInfo.categoryinfo[i].groupName2 == null)
                    category.push(storeInfo.categoryinfo[i].groupName1);
                else {
                    if (storeInfo.categoryinfo[i].groupName3 == null)
                        category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2);
                    else
                        category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2 + "@" + storeInfo.categoryinfo[i].groupName3);
                }
            }
            return res.render('product.ejs', {
                categoryInfo: category,
                storeInfo: StoreInfo,
                productInfo: product,
                optionInfo: options,
                indexURL: idxURL,
                loginInfo: req.session.userID
            });
        })
    });
});

app.get('/customer/:shopURL/login', function (req, res) {
    // 로그인 페이지
    console.log(req.params.shopURL);
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeInfo }) => {
        if (error)
            return res.send({ error });
        let idxURL = (req.params.shopURL).toString();
        let StoreInfo = {
            shopImage: storeInfo.storeinfo[0].image,
            shopName: storeInfo.storeinfo[0].shopName,
            shopEmail: storeInfo.storeinfo[0].shopEmail,
            businessNo: storeInfo.storeinfo[0].businessNo,
            shopPhone: storeInfo.storeinfo[0].shopPhone,
            shopAddress: storeInfo.storeinfo[0].shopAddress,
            description: storeInfo.storeinfo[0].description,
            shopCEO: storeInfo.storeinfo[0].name,
        }
        let category = [];
        for (let i = 0; i < storeInfo.categoryinfo.length; i++) {
            if (storeInfo.categoryinfo[i].groupName2 == null)
                category.push(storeInfo.categoryinfo[i].groupName1);
            else {
                if (storeInfo.categoryinfo[i].groupName3 == null)
                    category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2);
                else
                    category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2 + "@" + storeInfo.categoryinfo[i].groupName3);
            }
        }
        return res.render('login.ejs', {
            storeInfo: StoreInfo,
            categoryInfo: category,
            indexURL: idxURL,
            loginInfo: undefined
        });
    })
});

app.get('/customer/:shopURL/registration', function (req, res) {
    // 회원가입페이지
    console.log(req.params.shopURL);
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeInfo }) => {
        if (error)
            return res.send({ error });
        let idxURL = (req.params.shopURL).toString();
        let StoreInfo = {
            shopImage: storeInfo.storeinfo[0].image,
            shopName: storeInfo.storeinfo[0].shopName,
            shopEmail: storeInfo.storeinfo[0].shopEmail,
            businessNo: storeInfo.storeinfo[0].businessNo,
            shopPhone: storeInfo.storeinfo[0].shopPhone,
            shopAddress: storeInfo.storeinfo[0].shopAddress,
            description: storeInfo.storeinfo[0].description,
            shopCEO: storeInfo.storeinfo[0].name,
        }
        let category = [];
        for (let i = 0; i < storeInfo.categoryinfo.length; i++) {
            if (storeInfo.categoryinfo[i].groupName2 == null)
                category.push(storeInfo.categoryinfo[i].groupName1);
            else {
                if (storeInfo.categoryinfo[i].groupName3 == null)
                    category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2);
                else
                    category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2 + "@" + storeInfo.categoryinfo[i].groupName3);
            }
        }
        return res.render('registration.ejs', {
            storeInfo: StoreInfo,
            categoryInfo: category,
            indexURL: idxURL,
            loginInfo: undefined
        });
    })
});

app.post('/customer/:shopURL/reg_process', function (req, res) {
    // 회원가입 요청
    console.log(req.body);
    Reg_process("shop_template", req.body.id, req.body.pw, req.body.uname, req.body.phone, req.body.email, req.body.birthdate, req.body.gender, req.body.address, (error, { user }) => {
        console.log("server.js " + user);
        if (user == "Fail") {
            console.log("회원가입에러");
        }
        else if (error) {
            return res.send({ error });
        }
        console.log("회원가입이 완료되었습니다!");
        return res.redirect('/customer/' + req.params.shopURL + "?loginInfo=" + `${req.session.userID}`);
    })
});

app.post('/customer/:shopURL/login_process', function (req, res) {
    // 로그인 요청
    Login_process("shop_template", req.body.id, req.body.pw, (error, { id }) => {
        console.log(id);
        if (id == "Fail") {
            console.log("로그인 에러")
        }
        else if (error) {
            return res.send({ error });
        }

        req.session.userID = id[0].ID;
        console.log(req.session);
        return res.redirect('/customer/' + req.params.shopURL + "?loginInfo=" + `${req.session.userID}`);
    })
});

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});