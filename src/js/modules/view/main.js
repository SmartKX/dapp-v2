app.module('view/main', function({ view }) {

	var { homeView, loginView } = view

	var { Vue } = window

	var template = `
		<div>
			<component :is="view.component" :user="user"></component>
		</div>
    `

	var components = { homeView, loginView }

    new Vue({
		el: '#app',
		template,
		components,
		data: {
			user: '',
			views: ''
		},
		created() {
			this.init()
		},
		mounted() {
		},
		destroyed() {
		},
		computed: {
			view() {
				var { user, views } = this
				return user.token ? views.get('home') : views.get('login')
			}
		},
		watch: {
		},
		methods: {
			init() {
				var views = ['login', 'home']
				this.views = views
					.reduce((map, name) => {
						var component = `${name}-view`
						return map.set(name, { component })
					}, new Map())
				var { login, logout } = this
				var user = { name: '', pass: '', login, logout, token: '' }
				this.user = user
			},
			login(token) {
				var { user } = this
				user.token = token
			},
			logout() {
				var { user } = this
				user.name = ''
				user.token = ''
			}
		}
	})

})