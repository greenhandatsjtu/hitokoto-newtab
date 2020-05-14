global.browser = require('webextension-polyfill')

browser.runtime.onInstalled.addListener(function () {
    browser.storage.local.set({types: ['a']})
        .then(() => {
            console.log("types initialized.")
        })
    browser.storage.local.set({wallpaper: null})
        .then()
})
