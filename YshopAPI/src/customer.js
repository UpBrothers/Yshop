const dbconnect= require('./dbcon');

exports.storeinfo=function(request,response){
    var schema=request.query.schema;
    dbconnect('Y#',(error,{db})=>
    db.query(`SELECT name,shopName, shopEmail, image, businessNo,shopPhone,shopAddress,description FROM Seller where URL=?`,[request.query.URL],
        function(error,value1){         
            db.end();
            dbconnect(schema,(error,{db})=>
            db.query(`SELECT groupName1,groupName2,groupName3 FROM Group_Nav_View,`+schema+`.Group,Nav where `+schema+`.Group.groupPK=Nav.groupPK and `+schema+`.Group.groupName=Group_Nav_View.groupName1 order by Nav.navOrder`,
                function(error,value2){     
                    result={
                        storeinfo : value1,
                        categoryinfo : value2
                    }    
                    db.end();
                    if(error){
                        response.send("Fail");
                    }else{
                            response.send(result);
                    }
                })
            );   
        })
    );       
};

// exports.categoryinfo=function(request,response){

//     var schema=request.query.schema;
//     dbconnect(schema,(error,{db})=>
//     db.query(`SELECT groupName1,groupName2,groupName3 FROM Group_Nav_View,`+schema+`.Group,Nav where `+schema+`.Group.groupPK=Nav.groupPK and `+schema+`.Group.groupName=Group_Nav_View.groupName1 order by Nav.order`,
//         function(error,value){         
//             if(error){
//                     response.send("Fail");
//             }else{
//                     response.send(value);
//             }
//         })
//     );       
// };
exports.showproductlist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT * FROM Product_Info_View`,
        function(error,value){    
            db.end();     
            if(error){
                    response.send("Fail");
            }else{
                    response.send(value);
            }
        })
    );       
};
exports.productinfo=function(request,response){

    var schema=request.query.schema;
    var sql = [
        `select pv.productPK, pv.name, pv.price, pv.status, pv.views, pv.thumbnail, image1, image2, image3,
        pv.registrationDate, pv.star, pv.count, pv.likecount, pv.stock, pv.dcRate
        from Product_Info_View pv, Product p  where pv.productPK=p.productPK and pv.productPK=?;`,
        `SELECT * FROM Stock where productPK=?;`,
        `select r.purchasePK,p.ID, r.title, r.context, r.image, r.star, r.registrationDate from Review r, PurchaseDetail p
        where p.purchasePK=r.purchasePK and r.purchasePK in (SELECT stockPK FROM Stock s where s.productPK=?);`,
        `SELECT * FROM QnA where productPK=?;`
    ]
    var result= {};

    dbconnect(schema,(error,{db})=>
    db.query(sql[0]+sql[1]+sql[2]+sql[3],[request.query.productPK,request.query.productPK,request.query.productPK,request.query.productPK],
        function(error,value){  
            result={
                Product_Info_View : value[0],
                Option : value[1],
                Review : value[2],
                QnA : value[3]
            }
            db.end();
            if(error){
                    response.send("Fail");
            }else{
                    response.send(result);
            }
        })
    );       
};