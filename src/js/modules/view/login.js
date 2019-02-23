app.module('view/login', function({ factory, service }) {

    var { Style, Sys } = factory
    var { firebase } = service

    var template = `
        <div class="login-background">
            <div class="login-container">
                <div class="card">
                    <div class="card-body">
                        <div id="login">
                            <img src="img/logo.png">
                            <div>
                                <h3>Login</h3>
                                <form>
                                    <div class="form-group">
                                        <label>Username</label>
                                        <input class="form-control" v-model="user.name" placeholder="Username">
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control" v-model="user.pass" placeholder="Password">
                                    </div>
                                    <div class="form-group">
                                        <button type="button" class="btn btn-primary btn-block" :disabled="disabled" v-on:click="submit">Submit</button>
                                        <p class="register">
                                            <a href="#" v-on:click="register">Register</a>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                        <p class="status" v-text="status.text" :style="status.style"></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
    `

    var components = {}
    
    return {
        template,
        props: ['user'],
		components,
		data() {
            return {
                status: ''                
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
            disabled() {
                var { name, pass } = this.user
                return !name.length || !pass.length ? true : false
            }
		},
		watch: {
		},
		methods: {
			init() {
                console.log('init')
                this.status = { text: '....', style: Style.color('white') }
            },
            async register() {
                console.log('hmm')
            },
            async submit() {
                var { user } = this
                await Sys.wait(500)
                var text, style
                try {
                    var token = await firebase.login()
                    text = 'Ok, you are logged in!'
                    style = Style.color('#00ffaa')
                    this.status = { text, style }
                    await Sys.wait(1000)
                    user.login(token)
                } catch(e) {
                    text = typeof e == 'string' ? e : 'An error has occurred!'
                    style = Style.color('red')
                    this.status = { text, style }
                    await Sys.wait(1500)
                    this.init()
                }
            }
		}
	}

}, true)