var debug = true

// Libraries
import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import SocketCluster from 'socketcluster-client'

// Config files
import routes from './routes.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes
})

router.beforeEach((route,redirect,next) => {
	router.app.loading = true
	if (route.meta.requiresAuth && !router.app.authenticated) {
		router.app.loading = false
		redirect('/session/create')
	} else {
		next()
	}
})

router.afterEach(route => {
	setTimeout(function() {
		router.app.loading = false
	},100)
})

const app = new Vue({
	router,
	data() {
		return {
			showSocketData:false,
			app_name:'Vue-SC-Crud-Sample',
			loading:true,
			authenticated:false,

			first:'',
			last:'',

			socket:{},
			socket_hostname:'localhost',
			socket_port:3000
		}
	},
	computed:{
		username(){ return this.first + ' ' + this.last }
	},
	watch:{
		authenticated:function(val,oldVal) {
			if (val) { router.push({ path:'/dashboard' }) }
			else { router.push({ path:'/session/create' }) }
		}
	},
	methods:{
		alert(msg) { alertify.alert(msg) },
		confirm(msg,cb) { alertify.confirm(msg,cb) },
		error(msg) { alertify.error(msg) },
		info(msg) { alertify.log(msg) },
		success(msg) { alertify.success(msg) },
		logout() {
			let vm = this
			console.log('Attempting to log out.')
			vm.$root.socket.emit('logout',{},function(err) {
				if (err) { console.log(err);return vm.$root.alert(err,'error') }
			})
		},
		connectToServer() {
			let vm = this

			vm.socket = SocketCluster.connect({
				hostname:vm.socket_hostname,
				port:vm.socket_port
			})

			vm.socket.on('connect',function(status) {
				vm.authenticated = status.isAuthenticated
			})

			vm.socket.on('authenticate',function() {
				vm.authenticated = true
				vm.setUserData()
			})

			vm.socket.on('deauthenticate',function() {
				vm.authenticated = false
			})
		},
		setUserData() {
			let vm = this
			let authToken = vm.socket.getAuthToken() || {}
			vm.first = authToken.first
			vm.last = authToken.last
			vm.email = authToken.email
		}
	},
	created() {
		let vm = this
		vm.socket_hostname = $('#address').val()
		vm.socket_port = $('#port').val()
		$('body').show()
		this.connectToServer()
	}
}).$mount('#app')

if (debug) { window.app = app }