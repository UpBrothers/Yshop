var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const GetStoreInfo = require('./util/storeInfo');
const GetProductList = require('./util/productList');
const GetProductInfo = require('./util/productInfo');
const Login_process = require('./util/login_process');
const Reg_process = require('./util/reg_process');
const Customer_CheckID = require('./util/customer_checkID');
const Customer_CheckPhone = require('./util/customer_checkphone');
const Customer_CheckEmail = require('./util/customer_checkEmail');

const bodyParser = require('body-parser');
const sessionkey = require("./session_key");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: sessionkey,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true
}))
app.get('/customer/:shopURL/logout_process', function (req, res) {
    req.session.destroy();
    return res.redirect('/customer/' + req.params.shopURL);
})

app.get('/customer/:shopURL', function (req, res) {
    // 메인 페이지
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeinfo, category }) => {
        GetProductList("shop_template", (error, { productlist }) => {
            if (error)
                return res.send({ error });

            var idxURL = (req.params.shopURL).toString();
            return res.render('index.ejs', {
                categoryInfo: category,
                storeInfo: storeinfo,
                productList: productlist,
                indexURL: idxURL,
                loginInfo: req.session.userID
            });
        })
    });
});

app.get('/customer/:shopURL/product/:productPK', function (req, res) {
    // 상품 상세보기
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeinfo, category }) => {
        GetProductInfo("shop_template", req.params.productPK, (error, { product, image, option }) => {
            if (error)
                return res.send({ error });

            var idxURL = (req.params.shopURL).toString();
            console.log(option);
            return res.render('product.ejs', {
                categoryInfo: category,
                storeInfo: storeinfo,
                productInfo: product,
                imageInfo: image,
                optionInfo: option,
                indexURL: idxURL,
                loginInfo: req.session.userID
            });
        })
    });
});

app.get('/customer/:shopURL/login', function (req, res) {
    // 로그인 페이지
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeinfo, category }) => {
        if (error)
            return res.send({ error });
        let idxURL = (req.params.shopURL).toString();

        return res.render('login.ejs', {
            storeInfo: storeinfo,
            categoryInfo: category,
            indexURL: idxURL,
            loginInfo: undefined
        });
    })
});

app.get('/customer/:shopURL/registration', function (req, res) {
    // 회원가입페이지
    GetStoreInfo(req.params.shopURL, "shop_template", (error, { storeinfo, category }) => {
        if (error)
            return res.send({ error });
        let idxURL = (req.params.shopURL).toString();

        return res.render('registration.ejs', {
            storeInfo: storeinfo,
            categoryInfo: category,
            indexURL: idxURL,
            loginInfo: undefined
        });
    })
});

app.post('/customer/:shopURL/reg_process', function (req, res) {
    // 회원가입 요청
    let rb = req.body;
    Reg_process("shop_template", rb.id, rb.pw, rb.uname, rb.phone, rb.email, rb.birthdate, rb.gender, rb.address, (error, { user }) => {
        if (error) {
            return res.send({ error });
        }

        if (user == "Fail")
            console.log("회원가입실패");
        else
            console.log(rb.id + "회원가입");
        return res.redirect('/customer/' + req.params.shopURL);
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
        console.log(req.session + "로그인");
        req.session.save(function () {
            return res.redirect('/customer/' + req.params.shopURL);
        });
    })
});

app.post('/customer/:shopURL/idcheck', function (req, res) {
    // ID 중복 확인
    Customer_CheckID("shop_template", req.body.test, (error, { chkid }) => {
        console.log(chkid);
        if (error)
            console.log("ERROR : ", error);
        if (chkid[0].cnt == 1) {
            console.log("사용 불가능한 ID입니다.");
            res.send({ checkID: false });
        }
        else {
            console.log("사용 가능한 ID입니다.");
            res.send({ checkID: true });
        }
    })
});

app.post('/customer/:shopURL/phonecheck', function (req, res) {
    // 전화번호 중복 확인
    Customer_CheckPhone("shop_template", req.body.test, (error, { chkphone }) => {
        console.log(chkphone);
        if (error)
            console.log("ERROR : ", error);
        if (chkphone[0].cnt == 1) {
            res.send({ checkPhone: false });
        }
        else {
            res.send({ checkPhone: true });
        }
    })
});

app.post('/customer/:shopURL/emailcheck', function (req, res) {
    // 이메일 중복 확인
    Customer_CheckEmail("shop_template", req.body.test, (error, { chkemail }) => {
        console.log(chkemail);
        if (error)
            console.log("ERROR : ", error);
        if (chkemail[0].cnt == 1) {
            res.send({ checkEmail: false });
        }
        else {
            res.send({ checkEmail: true });
        }
    })
});

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});