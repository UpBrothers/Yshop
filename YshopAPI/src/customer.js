const dbconnect= require('./dbcon');

exports.storeinfo=function(request,response){

    var schema='Y#';
    dbconnect(schema,(error,{db})=>
    db.query(`SELECT shopName, shopEmail, businessNo,shopPhone,shopAddress FROM Seller where URL=?`,[request.query.URL],
        function(error,value){         
            if(error){
                    response.send("Fail");
            }else{
                    response.send(value);
            }
        })
    );       
};
exports.categoryinfo=function(request,response){

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