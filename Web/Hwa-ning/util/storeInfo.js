const request = require('request')

const GetStoreInfo = (URL, schema, callback) => {
    const url = 'https://it2ni120k8.execute-api.ap-northeast-2.amazonaws.com/2020-05-24-test/customer/storeinfo'
    var Params = '?'
    Params += 'schema=' + schema;
    Params += '&URL=' + URL;
    const fullurl = url + Params;
    console.log("GetStoreInfo : " + fullurl);

    request(fullurl, (error, { body }) => {
        const storeInfo = JSON.parse(body);
        let storeinfo = storeInfo.storeinfo[0];
        let category = [];
        for (let i = 0; i < storeInfo.categoryinfo.length; i++) {
            if (storeInfo.categoryinfo[i].groupName2 == null)
                category.push(storeInfo.categoryinfo[i].groupName1);
            else {
                if (storeInfo.categoryinfo[i].groupName3 == null)
                    category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2);
                else
                    category.push(storeInfo.categoryinfo[i].groupName1 + "@" + storeInfo.categoryinfo[i].groupName2 + "@" + storeInfo.categoryinfo[i].groupName3);
            }
        }
        console.log(storeinfo);

        callback(undefined, { storeinfo, category })
    })
}
module.exports = GetStoreInfo;