app.module('factory/Sys', function() {

    class Sys {

        static wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }

    }

    return Sys
    
})