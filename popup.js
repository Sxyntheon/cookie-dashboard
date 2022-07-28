//popup.js
async function updatePopup() {

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tab = tabs[0];
    let url = new URL(tab.url);
    let domain = url.hostname;
    console.log(domain);
    let result = await chrome.storage.sync.get([domain]);
    let log = result[domain];
    console.log(log);

    document.getElementById("domain").innerHTML = await log.address;
    document.getElementById("cookies").innerHTML = await log.cookies;
    document.getElementById("visits").innerHTML = await log.visits;
}
updatePopup()