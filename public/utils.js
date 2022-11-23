import { TRACKING_KEY, SERVER_URL } from "./constants.js";

export const storageAvailable = () => {
    try {
        const storage = window.localStorage,
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
};

const newTrackObj = { url: window.location.href, timestamp: Date.now(), text: "A user visited the website for the first time in the last 7 days." };

export const sendFirstTimeRequest = () => {
    localStorage.setItem(TRACKING_KEY, newTrackObj);
    fetch(SERVER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newTrackObj, timestamp: new Date(newTrackObj.timestamp) })
    })
        .catch(error => console.error(error))
};

export const detectFirstTimeUser = (storage, current, expirationDays = 7) => {
    if (storage) {
        if (!current) {
            return true;
        }
        else {
            const msInDay = 86400000;
            const trackingHasExpired = (Date.now() - current.timestamp) / msInDay > expirationDays;
            if (trackingHasExpired) {
                return true;
            }
            return false;
        }
    }
    return false;
};


