<script>
	export default {
		template:puglatizer.session.create({}),
		beforeRouteEnter(to, from, next) { next(vm => {}) },
		beforeRouteLeave(to, from, next) { next() },
		data() {
			return {
				email:'',
				password:''
			}
		},
		methods:{
			login() {
				let vm = this

				if (!vm.email) { return vm.$root.error('An email is required to login') }
				if (!vm.password) { return vm.$root.error('A password is required to login') }

				vm.$root.socket.emit('login',{
					method:'store',
					email:vm.email,
					password:vm.password
				},function(err) {
					if (err) { console.log(err);return vm.$root.alert(err,'error') }
					vm.$root.authenticated = true
					console.log('Finished!')
				})
			}
		}
	}
</script>

<style>
</style>