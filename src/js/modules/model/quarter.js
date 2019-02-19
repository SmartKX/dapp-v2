app.module('model/Quarter', function({ factory }) {

    var { Model } = factory

    var defaults = { select: false }
    var required = ['accountNum', 'contractAddress', 'id']

    class Quarter extends Model {

        constructor(data, accountNum, contractAddress) {
            if (contractAddress)
                data.contractAddress = contractAddress
            if (accountNum)
                data.accountNum = accountNum
            super({ data, required, defaults })
        }

        get label() {
            var { id } = this
            var N = String(id).slice(4)
            return `Q${N}`
        }

        get year() {
            var { id } = this
            return +String(id).slice(0, 4)
        }

    }

    return Quarter

})