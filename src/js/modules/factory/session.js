app.module('factory/Session', function() {

    class Session {

        constructor(user = {}) {
            this.user = user
        }

        login(data) {
            Object.assign(this.user, data)
            console.log('session login...')
            console.log(this)
        }

        logout() {
            Object.assign(this.user, {})
        }

    }

    return Session

})