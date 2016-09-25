<script>
	export default {
		template:puglatizer.session.destroy({}),
		beforeRouteEnter(route,redirect,next) { next(vm => { vm.$root.socket.emit('logout') }) },
		beforeRouteLeave(route,redirect,next) { next() },
		data() {
			return { }
		}
	}
</script>

<style>
</style>