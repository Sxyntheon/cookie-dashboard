//popup.js
async function updatePopup() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tab = tabs[0];
    let url = new URL(tab.url);
    let domain = url.hostname;
    if(domain == "extensions" || domain == "newtab" || domain == "settings") {
        return
    }
    console.log(domain);
    let cookiesDomain = await chrome.cookies.getAll({domain: domain});
    let cookiesReplaceWWW = await chrome.cookies.getAll({domain: domain.replace("www", "")});
    let cookies = cookiesDomain = cookiesReplaceWWW;
    console.log(cookies);
    let cookieLength = cookies.length;
    console.log("cookieLength:" + cookieLength);
    let log = await chrome.storage.sync.get([domain]);
    let visits = log[domain].visits
    console.log("visits:" + visits)
    document.getElementById("domain").innerHTML = domain;
    document.getElementById("cookies").innerHTML = await cookieLength;
    document.getElementById("visits").innerHTML = await visits;
}
async function deleteCookies() {
    console.log("starting removal")
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tab = tabs[0];
    let url = new URL(tab.url);
    let domain = url.hostname;
    if(domain == "extensions" || domain == "newtab" || domain == "settings") {
        return
    }
    const cookies = await chrome.cookies.getAll({domain: domain})
    console.log(cookies)
    for(var i = 0; i < cookies.length; i++) {
        var prefix = cookies[i].secure ? "https://" : "http://";
        await chrome.cookies.remove({"url": prefix + cookies[i].domain + cookies[i].path, "name": cookies[i].name});
        console.log("removed cookie " + cookies[i].name);
    }
    const cookiesReplaceWWW = await chrome.cookies.getAll({domain: domain.replace("www", "")})
    console.log(cookiesReplaceWWW)
    for(var i = 0; i < cookiesReplaceWWW.length; i++) {
        var prefix = cookiesReplaceWWW[i].secure ? "https://" : "http://";
        await chrome.cookies.remove({"url": prefix + cookiesReplaceWWW[i].domain + cookiesReplaceWWW[i].path, "name": cookiesReplaceWWW[i].name}, function() {
            console.log("removed cookie")
        });
    }
    document.getElementById("cookies").innerHTML = 0; 
};
async function resetVisits() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tab = tabs[0];
    let url = new URL(tab.url);
    let domain = url.hostname;
    if(domain == "extensions" || domain == "newtab" || domain == "settings") {
        return
    }
    visits = 0
    let setData = {};
    setData[domain] = { visits: visits }
    await chrome.storage.sync.set(setData, function() {
        console.log("logged the following: " + setData);
    });
    updatePopup();
};
updatePopup();
document.getElementById("deleteCookies").addEventListener("click", deleteCookies);
document.getElementById("resetVisits").addEventListener("click", resetVisits)