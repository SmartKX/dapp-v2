app.module('model/Household', function({ factory }) {

    var { Model } = factory

    var Quarter = { contractAddress: '', id: '' }

    class Household extends Model {

        constructor(data) {
            data.Quarter = Quarter
            super({ data })
        }

    }

    return Household

})