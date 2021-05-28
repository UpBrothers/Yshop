const dbconnect= require('./dbcon');

exports.productlist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT Product_Info_View.productPk, name, price,stock,status, registrationDate,groupPK1,groupName1,groupPK2,groupName2,groupPK3,groupName3  
    FROM Product_Group_View,Product_Info_View
    where Product_Group_View.productPK=Product_Info_View.productPK and Product_Info_View.status <> '-1'`,
    [request.query.URL],
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
        `SELECT * FROM Product where productPK=?;`,
        `SELECT * FROM Stock where productPK=?;`,
        `select * from Product_Group_View where productPK=?;`,
    ]
    var result= {};

    dbconnect(schema,(error,{db})=>
    db.query(sql[0]+sql[1]+sql[2],[request.query.productPK,request.query.productPK,request.query.productPK],
        function(error,value){  
            result={
                Product_Info_View : value[0],
                Option : value[1],
                Product_Group_View : value[2],
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
exports.addproduct=function(request,response){

    var post=request.body;
    var schema=post.schema;
    var sql = `insert into Product(name,price,thumbnail,image1,image2,image3,option1,option2,option3,registrationDate,status,views) values(?,?,?,?,?,?,?,?,?,?,?,'0');`;
    var imagelength=post.image.length;
    var optionlength=post.option.length;
    var key =[
        [post.name,post.price,post.thumbnail,post.image[0],null,null,null,null,null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],null,null,post.option[0],null,null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],null,null,post.option[0],post.option[1],null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],null,null,post.option[0],post.option[1],post.option[2],post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,null,null,null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,post.option[0],null,null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,post.option[0],post.option[1],null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,post.option[0],post.option[1],post.option[2],post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],null,null,null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],post.option[0],null,null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],post.option[0],post.option[1],null,post.registration,post.status],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],post.option[0],post.option[1],post.option[2],post.registration,post.status]
    ]
    var sql2 = [
        `insert into Stock(productPK,option1PK,option2PK,option3PK,stock,extraCharge) values(?,?,?,?,?,?);`,
        `insert into Belong values(?,(select distinct g1.groupPK from ` + schema + `.Group g1 where g1.groupName=?));`,
        `insert into Belong values(?,(select distinct g2.groupPK from ` + schema + `.Group g1, ` + schema + `.Group g2
            where g1.groupPK=g2.parent g1.groupName=? and g2.groupName=?));`,
        `insert into Belong values(?,(select distinct g3.groupPK from ` + schema + `.Group g1, ` + schema + `.Group g2, ` + schema + `.Group g3 
            where g1.groupPK=g2.parent and g2.groupPk=g3.parent and g1.groupName=? and g2.groupName=? and g3.groupName=?));`
    ]
    var insertoption1 = (productpk,callback)=>{
        for(let i=0;i<post.optionstock.length;i++){
            dbconnect(schema,(error,{db})=>
            db.query(sql2[0],[productpk,post.optionstock[i].option[0],null,null,post.optionstock[i].stock,post.optionstock[i].extraCharge],
                function(error,value){
                    if(error){
                        db.end();
                        response.send("Fail");
                    }
                })
            );  
        } 
        insertBelong(productpk)
    }
    var insertoption2 = (productpk,callback)=>{
        for(let i=0;i<post.optionstock.length;i++){
            dbconnect(schema,(error,{db})=>
            db.query(sql2[0],[productpk,post.optionstock[i].option[0],post.optionstock[i].option[1],null,post.optionstock[i].stock,post.optionstock[i].extraCharge],
                function(error,value){
                    if(error){
                        db.end();
                        response.send("Fail");
                    }
                })
            );  
        } 
        insertBelong(productpk)
    }
    var insertoption3 = (productpk,callback)=>{
        for(let i=0;i<post.optionstock.length;i++){
            dbconnect(schema,(error,{db})=>
            db.query(sql2[0],[productpk,post.optionstock[i].option[0],post.optionstock[i].option[1],post.optionstock[i].option[2],post.optionstock[i].stock,post.optionstock[i].extraCharge],
                function(error,value){
                    if(error){
                        db.end();
                        response.send("Fail");
                    }
                })
            );  
        } 
        insertBelong(productpk)
    }
    var insertBelong = (productpk)=>{
        switch(post.list.length){
            case 1:
                dbconnect(schema,(error,{db})=>
                db.query(sql2[1],[productpk,post.list[0]],
                    function(error,value){
                        db.end();
                        if(error){
                            response.send("Fail");
                        }else{
                            response.send("Success");
                        }
                    })
                );  
                break;
            case 2:
                dbconnect(schema,(error,{db})=>
                db.query(sql2[2],[productpk,post.list[0],post.list[1]],
                    function(error,value){
                        if(error){
                            console.log(error)
                            response.send("Fail");
                        }else{
                            response.send("Success");
                        }
                    })
                );  
                break;
            case 3:
                dbconnect(schema,(error,{db})=>
                db.query(sql2[3],[productpk,post.list[0],post.list[1],post.list[2]],
                    function(error,value){
                        if(error){
                            console.log(error)
                            response.send("Fail");
                        }else{
                            response.send("Success");
                        }
                    })
                );  
                break;
        }
    }
    switch(imagelength){
        case 1:
            switch(optionlength){
                case 0:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[0],
                        function(error,value){
                            db.end();
                            if(error){
                                    response.send("Fail");
                            }else{
                                    response.send("Success");
                            }
                        })
                    );   
                    break;
                case 1:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[1],
                        function(error,value){
                            insertoption1(value.insertId)
                        })
                    );   
                    break;
                case 2:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[2],
                        function(error,value){  
                            insertoption2(value.insertId)
                            })
                        );   
                    break;
                case 3:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[3],
                        function(error,value){  
                            insertoption3(value.insertId)
                            })
                        );   
                    break;
            }
         break;
        case 2:
            switch(optionlength){
                case 0:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[4],
                        function(error,value){  
                            db.end();
                            if(error){
                                response.send("Fail");
                            }else{
                                response.send("Success");
                            }
                        })
                    );   
                    break;
                case 1:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[5],
                        function(error,value){  
                            insertoption1(value.insertId)                          
                        })
                    );   
                    break;
                case 2:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[6],
                        function(error,value){  
                            insertoption2(value.insertId)
                            })
                        );   
                    break;
                case 3:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[7],
                        function(error,value){  
                            insertoption3(value.insertId)
                            })
                        );   
                    break;
            }
         break;
        case 3:
            switch(optionlength){
                case 0:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[8],
                        function(error,value){  
                            db.end();
                            if(error){
                                response.send("Fail");
                            }else{
                                response.send("Success");
                            }
                        })
                    );   
                    break;
                case 1:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[9],
                        function(error,value){  
                            insertoption1(value.insertId)                          
                        })
                    );   
                    break;
                case 2:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[10],
                        function(error,value){  
                            insertoption2(value.insertId)
                            })
                        );   
                    break;
                case 3:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[11],
                        function(error,value){  
                            insertoption3(value.insertId)
                            })
                        );   
                    break;
            }
         break;
    }    
};
exports.removeproduct=function(request,response){

    var post=request.body;
    var schema=post.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`update Product set status='-1'where productPK=?`,[post.productPK],
        function(error,value){     
            db.end();    
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
    db.query(`select * from (
        select g1.groupPK groupPk1, g1.groupName groupName1, null as groupPK2, null as groupName2, null as groupPK3, null as groupName3
        from shop_template.Group g1
        where g1.groupPK and depth=1
        union
        select g1.groupPK groupPk1, g1.groupName groupName1,g2.groupPK groupPK2 ,g2.groupName groupName2, null as groupPK3, null as groupName3
        from shop_template.Group g1,shop_template.Group g2
        where g1.groupPK=g2.parent and g2.depth=2
        union
        select g1.groupPK groupPk1, g1.groupName groupName1,g2.groupPK groupPK2,g2.groupName groupName2,g3.groupPK groupPK3,g3.groupName groupName3
        from shop_template.Group g1, shop_template.Group g2, shop_template.Group g3
        where g1.groupPK=g2.parent and g2.groupPK=g3.parent and g3.depth=3) t order by t.groupPK1;`,
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
exports.addcategory=function(request,response){

    var post=request.body;
    var schema=post.schema;
    var length=post.list.length;
    switch(length){
        case 1:
            dbconnect(schema,(error,{db})=>
            db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'1','0')`,[post.list[0]],
               function(error,value){   
                db.end();      
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
                db.end();  
                dbconnect(schema,(error2,{db})=>
                db.query(`SELECT groupPK FROM `+schema+`.Group where groupName=?`,[post.list[0]],
                   function(error2,value2){   
                    db.end();
                        dbconnect(schema,(error4,{db})=>
                        db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'2',?)`,[post.list[1],value2[0].groupPK],
                            function(error4,value4){   
                                db.end();      
                                if(error4){
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
            break;
        case 3:
            dbconnect(schema,(erro1,{db})=>
            db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'1','0')`,[post.list[0]],
               function(error1,value1){    
                db.end();     
                dbconnect(schema,(error2,{db})=>
                db.query(`SELECT groupPK FROM `+schema+`.Group where groupName=?`,[post.list[0]],
                   function(error2,value2){   
                    db.end();
                        dbconnect(schema,(error4,{db})=>
                        db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'2',?)`,[post.list[1],value2[0].groupPK],
                            function(error4,value4){     
                                db.end();    
                                dbconnect(schema,(error5,{db})=>
                                db.query(`SELECT groupPK FROM `+schema+`.Group where parent = (select groupPK from shop_template.Group where groupName=?)`,[post.list[0]],
                                   function(error5,value5){   
                                    db.end();
                                        dbconnect(schema,(error6,{db})=>
                                        db.query(`insert into `+schema+`.Group(groupName,depth, parent) value(?,'3',?)`,[post.list[2],value5[0].groupPK],
                                            function(error6,value6){    
                                                db.end();     
                                                if(error6){
                                                    db.end();
                                                        response.send("Fail");
                                                }else{
                                                    db.end();
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
            db.end();    
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
            db.end(); 
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
                    db.end();       
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
                    db.end();      
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
            db.end();       
            if(error){
                response.send("Fail");
            }else{
                response.send("Success");
            }
        })
    );       
};