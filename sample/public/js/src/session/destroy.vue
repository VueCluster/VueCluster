<script>
	export default {
		template:puglatizer.session.destroy({}),
		beforeRouteEnter(to, from, next) { next(vm => { vm.$root.socket.emit('logout') }) },
		beforeRouteLeave(to, from, next) { next() },
		data() {
			return { }
		}
	}
</script>

<style>
</style>