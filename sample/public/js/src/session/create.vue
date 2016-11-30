<template lang='pug'>
	div
		div.row(style='margin-top:100px')
			div.col-md-4.offset-md-4
				form
					div.form-group
						label Email
						input.form-control(type='email',v-model='email')
					div.form-group
						label Password
						input.form-control(type='password',v-model='password')
					hr
					div.form-group
						button.btn.btn-success(type='button',@click='login') Login
</template>

<script>
	export default {
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
				})
			}
		}
	}
</script>

<style>
</style>