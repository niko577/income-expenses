const host = window.location.hostname
let api = ''

if (host === 'money.appjs.tk') {
    api = 'https://api.money.appjs.tk/v0'
} else {
    api = 'https://api.dev-money.appjs.tk/v0'
}

export default api
