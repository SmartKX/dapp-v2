app.module('component/quarters', function({ model, service }) {

    var { Contract } = model
    var { events } = service

    var { Vue } = window

    var template = `
        <div>
            <p class="h6" v-text="year"></p>
                <div class="btn-group btn-group-sm btn-group-toggle mb-3" data-toggle="buttons">
                    <template v-for="(button, index) in buttons.list">
                        <template v-if="quarter(quarters, index)">
                            <label class="btn btn-outline-dark" :class="buttons.index == index ? 'active' : ''" v-on:click="select(index)">
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
        props: ['buttons', 'contract', 'year'],
		data() {
			return {
			}
		},
		created() {
            this.init()
		},
		mounted() {
            this.preSelect()
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
                var { buttons, year } = this
                var list = [1, 2, 3, 4]
                if (!buttons.index) {
                    Vue.set(buttons, 'index', -1)
                    var list = [1, 2, 3, 4]
                        .map((n) => {
                            var label = `Q${n}`
                            var id = `${year}${n}`
                            return { id, label }
                        })
                    Vue.set(buttons, 'list', list)
                }
            },
            preSelect() {
                var { buttons, contract } = this
                if (contract.active && contract.Quarter) {
                    var index = buttons.list
                        .findIndex(b => b.id == contract.Quarter)
                    if (index > -1)
                        this.select(index)
                }
            },
            quarter(quarters, index) {
                return quarters
                    .find(q => q.id && String(q.id).slice(4) == index + 1)
            },
            select(index) {
                var { contract, buttons } = this
                buttons.index = index
                var button = buttons.list[index]
                var { id: quarterId } = button
                var { accountNum, address: contractAddress } = contract
                events.$emit('quarter', { accountNum, contractAddress, quarterId })
            }
        },
		watch: {
		}
	}

})