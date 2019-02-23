app.module('service/firebase', function({ factory }) {

    var { Sys } = factory
    var { firebase } = window

    var config = {
        apiKey: "AIzaSyC68QHgBHmqs_s7yFsa29zD5uBEmFm69l0",
        authDomain: "smart-kx.firebaseapp.com",
        databaseURL: "https://smart-kx.firebaseio.com",
        projectId: "smart-kx",
        storageBucket: "smart-kx.appspot.com",
        messagingSenderId: "21341398973"
    }

    firebase.initializeApp(config)

    class Firebase {

        static async login(user) {
            await Sys.wait(500)
            return 'some bollox'
        }

    }

    return Firebase

})