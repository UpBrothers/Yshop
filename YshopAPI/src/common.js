const dbconnect= require('./dbcon');
const common = require('./createtemplate');
const createtemplate = require('./createtemplate');

exports.registration=function(request,response){

    var post=request.body;
    var schema;

    switch(post.from){
        case 'seller':
            schema='Y#';
            dbconnect(schema,(error,{db})=>
            db.query(`insert into Seller (ID,PW,name,phone,email,shopName,URL,businessNo,shopEmail,shopPhone,shopAddress) 
            values (?,?,?,?,?,?,?,?,?,?,?)`,[post.ID,post.PW,post.name,post.phone,post.email,post.shopName,post.URL,post.businessNo,post.shopEmail,post.shopPhone,post.shopAddress],
            function(error,value){
                db.end();
                if(error){
                    console.log(error)
                    response.send(error);
                }else{
                    createtemplate(post.URL,(error,{value})=>{
                        if(error){
                            response.send("Fail")
                        }   
                        else{
                            response.send("Success");
                        }      
                    })
                }
            })
        );
        break;
        case 'customer':
            schema=post.schema;
            dbconnect(schema,(error,{db})=>
            db.query(`insert into Customer (ID,PW,name,phone,email,birthdate,gender,address) 
            values (?,?,?,?,?,?,?,?)`,[post.ID,post.PW,post.name,post.phone,post.email,post.birthdate,post.gender,post.address],
            function(error,value){      
                db.end();   
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
};
exports.check=function(request,response){

    var post=request.body;
    var schema;

    switch(post.from){
        case 'seller':
            schema='Y#'
            switch(post.key){
                case 'ID':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where ID=?`,[post.ID],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
                case 'phone':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where phone=?`,[post.phone],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break; 
                case 'email':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where email=?`,[post.email],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
                case 'shopName':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where shopName=?`,[post.shopName],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
                case 'URL':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where URL=?`,[post.URL],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break; 
                case 'businessNo':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where businessNo=?`,[post.businessNo],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
                case 'shopEmail':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where shopEmail=?`,[post.shopEmail],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
                case 'shopPhone':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Seller where shopPhone=?`,[post.shopPhone],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
            }
        break;
        case 'customer':
            schema=post.schema;
            switch(post.key){
                case 'ID':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Customer where ID=?`,[post.ID],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
                case 'phone':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Customer where phone=?`,[post.phone],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break; 
                case 'email':
                    dbconnect(schema,(error,{db})=>
                    db.query(`select count(*) cnt from Customer where email=?`,[post.email],
                    function(error,value){
                        db.end();
                        response.send(value);
                    })
                );
                break;
            }

        break;
    }
};
exports.login=function(request,response){

    var post=request.body;
    var schema;

    switch(post.from){
        case 'seller':
            schema='Y#';
            dbconnect(schema,(error,{db})=>
            db.query(`SELECT URL,ID,shopName,image FROM Seller where ID=? and PW=?`,[post.ID,post.PW],
            function(error,value){
                db.end();
                response.send(value);
            })
        );
        break;
        case 'customer':
            schema=post.schema;
            console.log(schema);
            dbconnect(schema,(error,{db})=>
            db.query(`SELECT ID FROM Customer where ID=? and PW=?`,[post.ID,post.PW],
            function(error,value){      
                db.end();   
                if(error){
                    response.send("Fail");
                }else{
                    response.send(value);
                }
            })
        );
        break;
    }
};
exports.find=function(request,response){

    var post=request.body;
    var schema;

    switch(post.from){
        case 'seller':

        break;
        case 'customer':
            switch(post.flag){
                case 'ID':
                    switch(post.key){
                       case 'phone':
                            schema=post.schema;
                            dbconnect(schema,(error,{db})=>
                            db.query(`select ID from Customer where name=? and phone=?`,[post.name,post.phone],
                            function(error,value){       
                                db.end();  
                                if(error){
                                    response.send("Fail");
                                }else{
                                    response.send(value);
                                }
                            })
                            );
                        break;
                        case 'email':
                            schema=post.schema;
                            dbconnect(schema,(error,{db})=>
                            db.query(`select ID from Customer where name=? and email=?`,[post.name,post.email],
                            function(error,value){      
                                db.end();   
                                if(error){
                                    response.send("Fail");
                                }else{
                                    response.send(value);
                                }
                            })
                            );
                        break;
                    }
                break;
                case 'PW':
                    switch(post.key){
                        case 'phone':
                             schema=post.schema;
                             dbconnect(schema,(error,{db})=>
                             db.query(`select count(*) cnt from Customer where ID=? and phone=?`,[post.ID,post.phone],
                             function(error,value){     
                                db.end();    
                                 if(error){
                                     response.send("Fail");
                                 }else{
                                     response.send(value);
                                 }
                             })
                             );
                         break;
                         case 'email':
                             schema=post.schema;
                             dbconnect(schema,(error,{db})=>
                             db.query(`select count(*) cnt from Customer where ID=? and email=?`,[post.ID,post.email],
                             function(error,value){      
                                db.end();   
                                 if(error){
                                     response.send("Fail");
                                 }else{
                                     response.send(value);
                                 }
                             })
                             );
                         break;
                     }
                break;
            }
        break;
    }
};
exports.modifypw=function(request,response){

    var post=request.body;
    var schema;

    switch(post.from){
        case 'seller':
            schema='Y#';
            dbconnect(schema,(error,{db})=>
            db.query(`update Seller set PW=? where ID=?`,[post.PW,post.ID],
            function(error,value){
                db.end();
                if(error){
                    response.send("Fail");
                }else{
                    response.send("Succe");
                }
            })
        );
        break;
        case 'customer':
            schema=post.schema;
            dbconnect(schema,(error,{db})=>
            db.query(`update Customer set PW=? where ID=?`,[post.PW,post.ID],
            function(error,value){         
                db.end();
                if(error){
                    response.send("Fail");
                }else{
                    response.send("Succe");
                }
            })
        );
        break;
    }
};