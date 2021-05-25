const request = require('request')

const GetStoreInfo = (URL, schema, callback) => {
    const url = 'https://it2ni120k8.execute-api.ap-northeast-2.amazonaws.com/2020-05-24-test/customer/storeinfo'
    var Params = '?'
    Params += 'schema=' + schema;
    Params += '&URL=' + URL;
    const fullurl = url + Params;
    console.log("GetStoreInfo : " + fullurl);
    request(fullurl, (error, { body }) => {
        const storeInfo = JSON.parse(body)
        callback(undefined, {
            storeInfo
        })
    })
}
module.exports = GetStoreInfo;