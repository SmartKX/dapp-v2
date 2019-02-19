app.module('component/quarters', function({ model, service }) {

    var { Contract } = model
    var { events } = service

    var template = `
        <div>
            <p class="h6" v-text="year"></p>
                <div class="btn-group btn-group-sm btn-group-toggle mb-3" data-toggle="buttons">
                    <template v-for="(button, index) in buttons">
                        <template v-if="quarter(quarters, index)">
                            <label class="btn btn-outline-dark" :class="buttonIndex == index ? 'active' : ''" v-on:click="select(button)">
                                <input type="radio" name="options">
                                <span v-text="button.label"></span>
                            </label>
                        </template>
                        <template v-else>
                            <label class="btn btn-outline-dark disabled">
                                <input type="radio" name="options">
                                <span v-text="button.label"></span>
                            </label>
                        </template>
                    </template>
                </div>
            </p>
        </div>
    `

    return {
        template,
        props: ['contract', 'year'],
		data() {
			return {
                buttonIndex: '',
                buttons: ''
			}
		},
		created() {
            this.init()
		},
		mounted() {
            var { buttons, contract } = this
            if (contract.active && contract.Quarter) {
                var button = buttons
                    .find(b => b.id == contract.Quarter)
                if (button)
                    this.select(button)
            }
		},
		destroyed() {
		},
		computed: {
            quarters() {
                var { contract, year } = this
                return Contract.quarters(contract, year)
            }
        },
		methods: {
            init() {
                var { year } = this
                var list = [1, 2, 3, 4]
                var buttons = list
                    .map((n) => {
                        var label = `Q${n}`
                        var id = `${year}${1}`
                        return { id, label }
                    })
                this.buttons = buttons
            },
            quarter(quarters, index) {
                return quarters
                    .find(q => q.id && String(q.id).slice(4) == index + 1)
            },
            select(button) {
                var { contract, buttons } = this
                var { id: quarterId } = button
                this.buttonIndex = buttons
                    .findIndex(b => b.id == quarterId)
                var { accountNum, address: contractAddress } = contract
                events.$emit('quarter', { accountNum, contractAddress, quarterId })
            }
        },
		watch: {
		}
	}

})