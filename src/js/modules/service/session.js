app.module('service/session', function({ factory }) {

    var { Session } = factory

    var session = new Session()

    return session

})