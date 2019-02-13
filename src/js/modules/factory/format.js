app.module('factory/Format', function() {

    var { moment, numeral } = window

    class Format {

        _numeral(a) {
            return numeral(a / 1e6)
        }

        static BPS(a) {
            var fmt = `0.00%`
            return Format._numeral(a).format(fmt)

        }

        static Y_Q(a) {
            var str = String(a)
            return `${str.slice(1, 4)} ${str.slice(4)}`
        }

        static YMD(a) {
            var fmt = `YYYYMMMDD`
            return moment(a, `YYYYMMDD`).format(fmt)
        }

        static USD(a, short = false) {
            var fmt = short ? `$0a` : `00`
            return Format._numeral(a).format(fmt)
        }

    }

    return Format

})