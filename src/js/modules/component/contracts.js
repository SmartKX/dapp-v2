app.module('component/contracts', function({ component, model }) {

    var { contract } = component
    var { Contract } = model

    var template = `
        <div class="accordion" id="accordionExample">
            <div class="card" v-for="(contract, index) in contracts">
			    <div class="card-header" id="headingOne" v-on:click="select(index)">
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
                aIndex: '',
//                state: ''
			}
		},
		created() {
            this.init()
		},
		mounted() {
            //console.log('contracts mounted...')
            //this.aIndex = 0
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
            /*
            date(index) {
                var { contracts } = this
                var { end, start } = contracts[index]
                return `${start} - ${end || 'Present' }`
            },
            id(index, target) {
                var id = `contract-${index + 1}`
                return target ? `#${id}` : id
            },
            */
            init() {
                var { contracts } = this
                var index = contracts
                    .findIndex(c => c.active)
                this.aIndex = index > -1 ? index : 0
            },
            select(index) {
                //setTimeout(() => {
                    //console.log('select', index + 1)
                    //this.aIndex = index
                //}, 100)
//                this.aIndex = index
            },
            /*
			status(index) {
                var { contracts } = this
                var { active } = contracts[index]
				return active ? 'Active' : 'Archived'
            },
            target(index) {
                var { id } = this
                var tag = id(index)
                return `#${tag}`
            }
            */

        },
		watch: {
		}
	}

})