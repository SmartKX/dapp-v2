app.module('component/contracts', function({ component, model }) {

    var { contract } = component
    var { Contract } = model

    var template = `
        <div class="accordion" id="accordionExample">
            <div class="card" v-for="(contract, index) in contracts">
                <div class="card-header" id="headingOne">
                    <div data-toggle="collapse" :data-target="contract.Id(index, true)" :aria-expanded="contract.active" aria-controls="collapseOne">
                        <h3 v-text="contract.Status"></h3>
                        <small class="text-muted" v-text="contract.Date"></small>
                    </div>
                </div>
                <div :id="contract.Id(index)" class="collapse" :class="contract.active ? 'show' : ''" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        <contract :contract="contract" :aIndex="aIndex"></contract>
                    </div>
                </div>
            </div>
        </div>
    `
    
    var components = { contract }

	return {
        template,
        props: ['household'],
        components,
		data() {
			return {
                aIndex: ''
			}
		},
		created() {
            this.init()
		},
		mounted() {
        },
		destroyed() {
		},
		computed: {
            contracts() {
                var { household } = this
                var contracts = household ? household.contracts : []
                return contracts
                    .map(data => new Contract(data, household.accountNum))
            }
		},
		methods: {
            init() {
                var { contracts } = this
                var index = contracts
                    .findIndex(c => c.active)
                this.aIndex = index > -1 ? index : 0
            }
        },
		watch: {
		}
	}

})