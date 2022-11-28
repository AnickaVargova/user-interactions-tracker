const SERVER_URL = 'http://localhost:4001';

 window.addEventListener("load", () => {
  
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









