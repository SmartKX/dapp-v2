app.module('factory/Format', function() {

    var { moment, numeral } = window

    class Format {

        static _numeral(a) {
            return numeral(a / 1e6)
        }

        static BPS(a) {
            var fmt = `0.00%`
            return Format._numeral(a).format(fmt)

        }

        static Y_Q(a) {
            var str = String(a)
            return `${str.slice(0, 4)} Q${str.slice(4)}`
        }

        static YMD(a) {
            var fmt = `YYYYMMMDD`
            return moment(a, `YYYYMMDD`).format(fmt)
        }

        static _shortUSD(a) {
            return Format._numeral(a).format(`$a0`)
        } 

        static USD(a) {
            return typeof a == 'boolean' && a == true ? Format._shortUSD : Format._numeral(a).format(`00`)
        }

    }

    return Format

})