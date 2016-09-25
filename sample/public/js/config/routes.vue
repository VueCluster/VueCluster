<script>
	import DashboardIndex from '../src/dashboard/index.vue'
	import SessionIndex from '../src/session/index.vue'
	import SessionCreate from '../src/session/create.vue'
	import SessionDestroy from '../src/session/destroy.vue'

	export default [
		{ path:'/',name:'redirectDashboard',redirect:'/dashboard' },
		{ path:'/session',name:'redirectSession',redirect:'/session/create' }, // There is no session index.. at least there never should be
		{ path:'/dashboard',name:'dashboard',meta:{ requiresAuth:true },component:DashboardIndex,beforeEnter:(route,redirect,next) => { next() } },
		{ path:'/session',name:'session',component:SessionIndex, children:[
			{ path:'create',name:'session/create',meta:{ requiresAuth:false },component:SessionCreate,beforeEnter:(route,redirect,next) => { next() } },
			{ path:'destroy',name:'session/destroy',meta:{ requiresAuth:false },component:SessionDestroy,beforeEnter:(route,redirect,next) => { next() } }
		] }
	]
</script>