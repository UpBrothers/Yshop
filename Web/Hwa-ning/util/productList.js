const request = require('request')

const GetProductList = (schema, callback) => {
    const url = 'https://it2ni120k8.execute-api.ap-northeast-2.amazonaws.com/2020-05-24-test/customer/showproductlist'
    var Params = '?'
    Params += 'schema=' + schema;
    const fullurl = url + Params;
    console.log("GetProductList : " + fullurl);
    request(fullurl, (error, { body }) => {
        const ProductList = JSON.parse(body)
        callback(undefined, {
            ProductList
        })
    })
}
module.exports = GetProductList;