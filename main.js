//main.js
async function getVisits() {
    let visits;
    let result = await chrome.storage.sync.get([location.hostname]);
    if (result[location.hostname]) {
        visits = result[location.hostname].visits += 1;
    } 
    else {
        visits = 1;
    }
    return  {visits: visits };
};
function logSite(data) {
    let setData = {};
    setData[location.hostname] = data;
    chrome.storage.sync.set(setData, function() {
        console.log("succesfully logged the following values to storage:");
        console.log(setData)
    });
};
async function main() {
    logSite(await getVisits());
};
main();