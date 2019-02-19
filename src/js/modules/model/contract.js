app.module('model/Contract', function({ factory }) {

    var { Format, Model } = factory

    var required = ['accountNum']

    class Contract extends Model {

        constructor(data, accountNum) {
            if (accountNum)
                data.accountNum = accountNum
            data.Quarter = 0
            super({ data, required })
        }

        get Accounts() {
            var { accounts } = this
            var n = Array.isArray(accounts) ? accounts.length : 0
			return `Accounts: ${n}`
        }

        get Date() {
            var { end, start } = this
            return `${start} - ${end || 'Present' }`
        }

        get Executed() {
			var { executed: date } = this
			var executed = Format.YMD(date).toUpperCase()
			return `Executed: ${executed}`
        }

        get Status() {
            var { active } = this
            return active ? 'Active' : 'Archived'
        }

        static quarters(c, year) {
            var quarters = c ? c.quarters : []
            return quarters
                .filter(q => q.id && String(q.id).slice(0, 4) == year)
        }

        static year(n) {
            return n ? +String(n).slice(0, 4) : new Date().getFullYear()
        }

        get Years() {
            var end = Contract.year(this.end)
            var start = Contract.year(this.start)
            var years = start == end ? [start] : [start, end]
            while(end - start > 1) {
                start++
                years.splice(1, 0, start)
            }
            return years
                .reverse()
        }

        Range(index) {
			var { splits } = this
            var shortUSD = Format.USD(true)
            var a, z
            if (Array.isArray(splits)) {
                a = splits[index]
                z = splits[index + 1]
            }
			return `${Format.USD(a || 0).toUpperCase()} - ${shortUSD(z || 0).toUpperCase()}`
        }

        Rate(index) {
            var { bps } = this
            var rate = Array.isArray(bps) ? bps[index] : 0
			return Format.BPS(rate).toUpperCase()
        }

        Id(index, target) {
            var id = `contract-${index + 1}`
            return target ? `#${id}` : id
        }

    }

    return Contract

})