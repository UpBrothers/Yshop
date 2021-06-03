const dbconnect= require('./dbcon');

exports.storeinfo=function(request,response){
    var schema=request.query.schema;
    dbconnect('Y#',(error,{db})=>
    db.query(`SELECT name,shopName, shopEmail, image, businessNo,shopPhone,shopAddress,description FROM Seller where URL=?`,[request.query.URL],
        function(error,value1){         
            db.end();
            dbconnect(schema,(error,{db})=>
            db.query(`select * from (
                select g1.groupPK groupPK1, g1.groupName groupName1, null as groupPK2, null as groupName2, null as groupPK3, null as groupName3
                from `+ schema + `.Group g1
                where g1.groupPK and depth=1
                union
                select g1.groupPK groupPK1, g1.groupName groupName1,g2.groupPK groupPK2 ,g2.groupName groupName2, null as groupPK3, null as groupName3
                from `+ schema + `.Group g1,`+ schema + `.Group g2
                where g1.groupPK=g2.parent and g2.depth=2
                union
                select g1.groupPK groupPK1, g1.groupName groupName1,g2.groupPK groupPK2,g2.groupName groupName2,g3.groupPK groupPK3,g3.groupName groupName3
                from `+ schema + `.Group g1, `+ schema + `.Group g2, `+ schema + `.Group g3
                where g1.groupPK=g2.parent and g2.groupPK=g3.parent and g3.depth=3) t order by t.groupPK1;`,
                function(error,value2){     
                    result={
                        storeinfo : value1,
                        categoryinfo : value2
                    }    
                    db.end();
                    if(error){
                        response.send("Fail");
                    }else{

                        var json = []
                        var postfix = '';
                        for(let i=0;i<result.categoryinfo.length;i++){
                            if(!json.includes(result.categoryinfo[i].groupName1)){
                                json[result.categoryinfo[i].groupName1+postfix]=[]

                                for(let j=0;j<result.categoryinfo.length;j++){
                                    if((result.categoryinfo[j].groupName2!=null)&&(result.categoryinfo[i].groupName1==result.categoryinfo[j].groupName1)&&!json.includes(result.categoryinfo[j].groupName1)){
                                        json[result.categoryinfo[i].groupName1+postfix][result.categoryinfo[j].groupName2+postfix]=[];

                                    }
                                }

                            }
                        }
                        console.log(json[0])
                        response.send(result);
                    }
                })
            );   
        })
    );       
};
exports.showproductlist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT * FROM Product_Info_View where status <> '-1' and status <> '0'`,
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