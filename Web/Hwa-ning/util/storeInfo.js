const request = require('request')

const getStoreInfo = (URL, schema, callback) => {
    const url = 'https://it2ni120k8.execute-api.ap-northeast-2.amazonaws.com/2020-05-10-test/customer/storeinfo'

    var Params = '?'
    Params += 'schema=' + schema;
    Params += '&URL=' + URL;
    const fullurl = url + Params;
    request(fullurl, (error, { body }) => {
        const storeInfo = JSON.parse(body)
        callback(undefined, {
            storeInfo
        })
    })
}
module.exports = getStoreInfo;