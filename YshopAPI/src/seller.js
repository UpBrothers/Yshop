const dbconnect= require('./dbcon');

exports.productlist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT Product_Info_View.productPk, name, price,stock,status, registrationDate,groupPK1,groupName1,groupPK2,groupName2,groupPK3,groupName3  
    FROM Product_Group_View,Product_Info_View
    where Product_Group_View.productPK=Product_Info_View.productPK and Product_Info_View.status <> '-1'`,
    [request.query.URL],
        function(error,value){         
            if(error){
                    response.send("Fail");
            }else{
                    response.send(value);
            }
        })
    );       
};
exports.removeproduct=function(request,response){

    var post=request.body;
    var schema=post.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`update Product set status='-1'where productPK=?`,[post.productPK],
        function(error,value){         
            if(error){
                response.send("Fail");
            }else{
                response.send("Success");
            }
        })
    );       
};
exports.categorylist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT groupName1,groupName2,groupName3 FROM Group_Nav_View,`+schema+`.Group,Nav where `+schema+`.Group.groupPK=Nav.groupPK and `+schema+`.Group.groupName=Group_Nav_View.groupName1 order by Nav.order`,
        function(error,value){         
            if(error){
                    response.send("Fail");
            }else{
                    response.send(value);
            }
        })
    );       
};
exports.addcategory=function(request,response){

    var post=request.body;
    var schema=post.schema;
    var length=post.list.length;
    switch(length){
        case 1:
            dbconnect(schema,(error,{db})=>
            db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'1','0')`,[post.list[0]],
               function(error,value){         
                    if(error){
                            response.send("Fail");
                    }else{
                            response.send("Success");
                    }
                })
           ); 
            break;
        case 2:
            dbconnect(schema,(erro1,{db})=>
            db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'1','0')`,[post.list[0]],
               function(error1,value1){         
                dbconnect(schema,(error2,{db})=>
                db.query(`SELECT groupPK FROM `+schema+`.Group where groupName=?`,[post.list[0]],
                   function(error2,value2){   
                        dbconnect(schema,(error4,{db})=>
                        db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'2',?)`,[post.list[1],value2[0].groupPK],
                            function(error4,value4){         
                                if(error4){
                                        response.send("Fail");
                                }else{
                                    console.log("success")
                                        response.send("Success");
                                }
                            })
                        );
                    })
                 );
                })
           );
            break;
        case 3:
            dbconnect(schema,(erro1,{db})=>
            db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'1','0')`,[post.list[0]],
               function(error1,value1){         
                dbconnect(schema,(error2,{db})=>
                db.query(`SELECT groupPK FROM `+schema+`.Group where groupName=?`,[post.list[0]],
                   function(error2,value2){   
                        dbconnect(schema,(error4,{db})=>
                        db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'2',?)`,[post.list[1],value2[0].groupPK],
                            function(error4,value4){         
                                dbconnect(schema,(error5,{db})=>
                                db.query(`SELECT groupPK FROM `+schema+`.Group where parent = (select groupPK from shop_template.Group where groupName=?)`,[post.list[0]],
                                   function(error5,value5){   
                                        dbconnect(schema,(error6,{db})=>
                                        db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'3',?)`,[post.list[2],value5[0].groupPK],
                                            function(error6,value6){         
                                                if(error6){
                                                        response.send("Fail");
                                                }else{
                                                        response.send("Success");
                                                }
                                            })
                                        );
                                    })
                                 );
                            })
                        );
                    })
                 );
                })
           );
            break;
    }     
};
exports.removecategory=function(request,response){

    var post=request.body;
    var schema=post.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`delete from `+schema+`.Group where groupName=?`,[post.list[0]],
        function(error,value){         
            if(error){
                response.send("Fail");
            }else{
                response.send("Success");
            }
        })
    );       
};
exports.benefitslist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT * FROM Discount`,
        function(error,value){         
            if(error){
                    response.send("Fail");
            }else{
                    response.send(value);
            }
        })
    );       
};
exports.addbenefits=function(request,response){

    var post=request.body;
    var schema=post.schema;
    console.log(post.flag)

    switch(post.flag){
        case '1':
            console.log(post.flag)
            dbconnect(schema,(error,{db})=>
            db.query(`insert into Discount(discountName, flag, target1, dcRate, startDate, endDate) values(?,?,?,?,?,?)`,[post.discountName,post.flag,post.target1,post.dcRate,post.startDate,post.endDate],
                function(error,value){         
                    if(error){
                        response.send("Fail");
                    }else{
                        response.send("Success");
                    }
                })
            );  
            break;
        case '2':
            dbconnect(schema,(error,{db})=>
            db.query(`insert into Discount(discountName, flag, target2, dcRate, startDate, endDate) values(?,?,?,?,?,?)`,[post.discountName,post.flag,post.target2,post.dcRate,post.startDate,post.endDate],
                function(error,value){         
                    if(error){
                        response.send("Fail");
                    }else{
                        response.send("Success");
                    }
                })
            ); 
            break;            
    }     
};
exports.removebenefits=function(request,response){

    var post=request.body;
    var schema=post.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`delete from Discount where discountPK=?`,[post.discountPK],
        function(error,value){         
            if(error){
                response.send("Fail");
            }else{
                response.send("Success");
            }
        })
    );       
};