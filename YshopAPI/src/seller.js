const dbconnect= require('./dbcon');

exports.productlist=function(request,response){

    var schema=request.query.schema;
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT Product_Info_View.productPk, name, price,stock,status, registrationDate,groupPK1,groupName1,groupPK2,groupName2,groupPK3,groupName3  
    FROM Product_Group_View,Product_Info_View
    where Product_Group_View.productPK=Product_Info_View.productPK;`,
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