app.module('service/session', function() {

    var data = {}

    class Session {

        static get data() {
            return data
        }

        static init() {
            data.households = []
            data.household = ''
            data.contract = ''
            data.quarter = ''
        }
    }

    return Session

})