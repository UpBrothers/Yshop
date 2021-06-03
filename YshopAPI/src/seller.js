const dbconnect= require('./dbcon');

exports.productlist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT p1.productPk, p1.name, p1.price, p1.thumbnail,p1.option1,p1.option2,p1.option3, p1.stock,p1.status, p1.registrationDate,p2.groupPK1,p2.groupName1,p2.groupPK2,p2.groupName2,p2.groupPK3,p2.groupName3 
    from (SELECT piv.productPk, piv.name, piv.price, piv.thumbnail,p.option1,p.option2,p.option3, piv.stock,piv.status, piv.registrationDate
        FROM Product_Info_View piv , Product p
        where piv.productPK=p.productPK and piv.status <> '-1') as p1 left outer join 
        (SELECT piv.productPk, piv.name, piv.price, piv.thumbnail,p.option1,p.option2,p.option3, piv.stock,piv.status, piv.registrationDate,groupPK1,groupName1,groupPK2,groupName2,groupPK3,groupName3  
        FROM Product_Group_View,Product_Info_View piv , Product p
        where Product_Group_View.productPK=piv.productPK and piv.productPK=p.productPK and piv.status <> '-1') as p2 on p1.productPK = p2.productPK;`,
        function(error,value){         
            db.end();
            if(error){
                console.log(error)
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
    var sql = `insert into Product(name,price,thumbnail,image1,image2,image3,option1,option2,option3,registrationDate,status,views,stock) values(?,?,?,?,?,?,?,?,?,now(),?,'0',?);`;
    var imagelength=post.image.length;
    var optionlength=post.option.length;
    var key =[
        [post.name,post.price,post.thumbnail,post.image[0],null,null,null,null,null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],null,null,post.option[0],null,null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],null,null,post.option[0],post.option[1],null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],null,null,post.option[0],post.option[1],post.option[2],post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,null,null,null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,post.option[0],null,null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,post.option[0],post.option[1],null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],null,post.option[0],post.option[1],post.option[2],post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],null,null,null,post.registration,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],post.option[0],null,null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],post.option[0],post.option[1],null,post.status,post.stock],
        [post.name,post.price,post.thumbnail,post.image[0],post.image[1],post.image[2],post.option[0],post.option[1],post.option[2],post.status,post.stock]
    ]
        var sql2 = [
        `insert into Stock(productPK,option1PK,option2PK,option3PK,stock,extraCharge) values(?,?,?,?,?,?);`,
        `insert into Belong values(?,?);`,
    ]
    // var sql2 = [
    //     `insert into Stock(productPK,option1PK,option2PK,option3PK,stock,extraCharge) values(?,?,?,?,?,?);`,
    //     `insert into Belong values(?,(select distinct g1.groupPK from ` + schema + `.Group g1 where g1.groupName=?));`,
    //     `insert into Belong values(?,(select distinct g2.groupPK from ` + schema + `.Group g1, ` + schema + `.Group g2
    //         where g1.groupPK=g2.parent g1.groupName=? and g2.groupName=?));`,
    //     `insert into Belong values(?,(select distinct g3.groupPK from ` + schema + `.Group g1, ` + schema + `.Group g2, ` + schema + `.Group g3 
    //         where g1.groupPK=g2.parent and g2.groupPk=g3.parent and g1.groupName=? and g2.groupName=? and g3.groupName=?));`
    // ]
    // var insertBelong = (productpk)=>{
    //     switch(post.list.length){
    //         case 1:
    //             dbconnect(schema,(error,{db})=>
    //             db.query(sql2[1],[productpk,post.list[0]],
    //                 function(error,value){
    //                     db.end();
    //                     if(error){
    //                         response.send("Fail");
    //                     }else{
    //                         response.send("Success");
    //                     }
    //                 })
    //             );  
    //             break;
    //         case 2:
    //             dbconnect(schema,(error,{db})=>
    //             db.query(sql2[2],[productpk,post.list[0],post.list[1]],
    //                 function(error,value){
    //                     if(error){
    //                         console.log(error)
    //                         response.send("Fail");
    //                     }else{
    //                         response.send("Success");
    //                     }
    //                 })
    //             );  
    //             break;
    //         case 3:
    //             dbconnect(schema,(error,{db})=>
    //             db.query(sql2[3],[productpk,post.list[0],post.list[1],post.list[2]],
    //                 function(error,value){
    //                     if(error){
    //                         console.log(error)
    //                         response.send("Fail");
    //                     }else{
    //                         response.send("Success");
    //                     }
    //                 })
    //             );  
    //             break;
    //     }
    // }
    var insertBelong = (productpk)=>{
        dbconnect(schema,(error,{db})=>
        db.query(sql2[1],[productpk,post.groupPK],
            function(error,value){
                db.end();
                if(error){
                    response.send("Fail");
                }else{
                    response.send("Success");
                }
            })
        );  
    }
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


    switch(imagelength){
        case 1:
            switch(optionlength){
                case 0:
                    dbconnect(schema,(error,{db})=>
                    db.query(sql,key[0],
                        function(error,value){
                            console.log(value)
                            insertBelong(value.insertId)
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
                            insertBelong(value.insertId)
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
                            insertBelong(value.insertId)
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

    var sql = [`select * from (
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
        where g1.groupPK=g2.parent and g2.groupPK=g3.parent and g3.depth=3) t order by t.groupPK1;`
    ]
    dbconnect(schema,(error,{db})=>
    db.query(sql[0],
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


    dbconnect(schema,(error,{db})=>
        db.query(`insert into `+schema+`.Group(groupName, depth, parent) value(?,?,?)`,[post.groupName,post.depth,post.parent],
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
exports.removecategory=function(request,response){

    var post=request.body;
    var schema=post.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`delete from `+schema+`.Group where groupPK=?`,[post.groupPK],
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
    db.query(`SELECT discountPK,discountName, flag,target1,target2, if(flag = 1, (select groupName from `+ schema + `.Group g where g.groupPK=d.target1),(select p.name from Product p where p.productPK=d.target2)) resultname,
    dcRate,startDate,endDate,registrationDate FROM Discount d`,
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

    switch(post.flag){
        case '1':
            dbconnect(schema,(error,{db})=>
            db.query(`insert into Discount(discountName, flag, target1, dcRate, startDate, endDate,registrationDate) values(?,?,?,?,?,?,now())`,[post.discountName,post.flag,post.target1,post.dcRate,post.startDate,post.endDate],
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
            db.query(`insert into Discount(discountName, flag, target2, dcRate, startDate, endDate, registrationDate) values(?,?,?,?,?,?,now())`,[post.discountName,post.flag,post.target2,post.dcRate,post.startDate,post.endDate],
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