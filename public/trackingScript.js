import { detectFirstTimeUser, sendFirstTimeRequest, storageAvailable } from "./utils.js";
import { TRACKING_KEY, SERVER_URL } from "./constants.js";

 window.addEventListener("load", () => {

    // Tracked event: A user visited the website for the first time in the last 7 days
    if (detectFirstTimeUser(storageAvailable(), localStorage.getItem(TRACKING_KEY))) {
        localStorage.removeItem(TRACKING_KEY);
        sendFirstTimeRequest();
    };

    // Tracked event: A user visited the website
    fetch(SERVER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: window.location.href, timestamp: new Date(), text: 'A user visited the website.' })
    })

        .catch(error => console.error(error))
 });

// Tracked event: A user clicked on a link
const links = document.getElementsByTagName('a');
const linksArr = Array.from(links);

linksArr.map(link => {
    link.addEventListener('click', () =>
        fetch(SERVER_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: window.location.href, timestamp: new Date(), text: 'A user clicked on a link.', targetUrl: link.href })
        })
            .catch(error => console.error(error))
    )
});

// Tracked event: A user left the website
window.addEventListener('beforeunload', () => fetch(SERVER_URL, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: window.location.href, timestamp: new Date(), text: 'A user left the website.' })
})
    .catch(error => console.error(error))
);

// Custom tracking function (example usage: called from navigation.ejs)
window.track = (customObj) => {
    if (document.readyState === 'complete') {
        fetch(SERVER_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customObj)
        })
            .catch(error => console.error(error))
    }
};









