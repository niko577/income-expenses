const host = window.location.hostname
let api = ''

if (host === 'localhost') {
    api = 'http://localhost:5000'
} else {
    api = 'https://income-expenses.herokuapp.com'
}

export default api