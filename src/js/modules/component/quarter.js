app.module('component/quarter', function({ component, factory, service }) {

    var { chart } = component
    var { Format, Sys } = factory
    var { events } = service

    var template = `
        <div class="quarter">
            <template v-if="contract">
                <h1 v-text="id"></h1>
                <div class="row">
                    <div class="col-4">
                        <div class="form-group" v-for="(split, index) in values" :key="index">
                            <label :for="label(index)" v-text="accounts[index]"></label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">$</div>
                                </div>
                                <input type="text" class="form-control" :id="label(index)" aria-describedby="emailHelp" placeholder="Enter account ammount" :value="split | usd">
                            </div>
                            <small id="emailHelp" class="form-text text-muted">Small note about something or other.</small>
                        </div>
                    </div>
                    <div class="col-8">
                        <chart :data="chartData"></chart>
                    </div>
                </div>
            </template>
        </div>
    `

    var components = { chart }

    var filters = {
		usd: Format.USD
	}

    return {
        template,
        props: ['household'],
        components,
        filters,
		data() {
			return {
                chart: '',
                contractAddress: '',
                quarterId: '',
			}
		},
		created() {
            this.init()
            var { quarter } = this
            this.events = { quarter: quarter.bind(this) }
            events.watch(this.events, this._uid)
		},
		mounted() {
		},
		destroyed() {
            events.unwatch(this.events, this._uid)
		},
		computed: {
            accounts() {
                var { contract } = this
                return contract ? contract.accounts : []
            },
            contract() {
                var { contractAddress, household } = this
                var contracts = household ? household.contracts : []
                return contracts
                    .find(c => c.address == contractAddress)
            },
            chartData() {
                var { accounts, values } = this
                return { accounts, values }
            },
            id() {
                var { quarterId } = this
                return Format.Y_Q(quarterId)
            },
            values() {
                var { contract, quarterId } = this
                var quarters = contract ? contract.quarters : []
                var quarter = quarters
                    .find(q => q.id == quarterId)
                return quarter ? quarter.values : []
            }
        },
		methods: {
            init() {
                this.contractAddress = ''
                this.quarterId = ''
            },
            async quarter(e) {
                this.init()
                console.log('quarter event...')
                var { contractAddress, quarterId } = e
                await Sys.wait(100)
                this.contractAddress = contractAddress
                this.quarterId = quarterId
            },
            label(index) {
                return `account${index}`
            },
        },
		watch: {
            household: {
                handler() {
                    console.log('household changed...')
                    this.init()
                },
                deep: true
            }
		}
	}

})