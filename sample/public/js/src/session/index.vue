<template lang='pug'>
	div
		router-view
</template>

<script>
	export default {
		beforeRouteEnter(to, from, next) { next(vm => {}) },
		beforeRouteLeave(to, from, next) { next() }
	}
</script>

<style>
</style>