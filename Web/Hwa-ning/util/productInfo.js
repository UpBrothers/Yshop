const request = require('request')

const GetProductInfo = (schema, productPK, callback) => {
    const url = 'https://it2ni120k8.execute-api.ap-northeast-2.amazonaws.com/2020-05-24-test/customer/productinfo'
    var Params = "?";
    Params += 'schema=' + schema;
    Params += '&productPK=' + productPK;
    const fullurl = url + Params;
    console.log("GetProductInfo : " + fullurl);
    request(fullurl, (error, { body }) => {
        const ProductInfo = JSON.parse(body)
        callback(undefined, {
            ProductInfo
        })
    })
}
module.exports = GetProductInfo;