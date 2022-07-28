//main.js
async function getWebsiteData() {
    const address = document.domain;
    const cookies = document.cookie.split(";").length;
    let visits = await getVisits();
    let data = { "address": address, "cookies": cookies, "visits": visits };
    return data;
};
async function getVisits() {
    let visits;
    let result = await chrome.storage.sync.get([document.domain]);
    if (result[document.domain]) {
        visits = result[document.domain].visits += 1;
    } 
    else {
        visits = 1;
    }
    return visits;
};
function logSite(data) {
    let setData = {};
    setData[data.address] = data;
    chrome.storage.sync.set(setData, function() {
        console.log("succesfully logged the following values to storage:");
        console.log(data)
    });
};
async function main() {
    logSite(await getWebsiteData());
};
main();