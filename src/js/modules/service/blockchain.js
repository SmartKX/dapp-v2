app.module('service/blockchain', function({ factory }) {

    var { store } = factory

    var { ethereum, web3, Web3 } = window

    var data = {}
    
    class BlockChain {

        static async connect() {
            if (data.web3)
                throw new Error(`Already connected!`)
            if (ethereum) {
                data.web3 = new Web3(ethereum)
                await ethereum.enable()
            } else if (web3) {
                var { currentProvider } = web3
                data.web3 = new Web3(currentProvider)
            }
            if (!data.web3)
                throw new Error(`Non-Ethereum browser detected. You should consider trying MetaMask!`)
        }

        static async transaction(tx) {
            var { households } = store
            return households
            /*
            var { eth } = data.web3 || {}
            if (!eth)
                throw new Error(`Not connected!`)
            return eth.sendTransaction(tx)
            */
        }

    }

    return BlockChain

})