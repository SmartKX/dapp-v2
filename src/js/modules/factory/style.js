app.module('factory/Style', function() {

    class Style {

        static color(c) {
            return `color: ${c}`
        }
    }

    return Style
    
})