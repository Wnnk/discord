import { createRouter, createWebHashHistory,createWebHistory  } from "vue-router";
import { staticRouter } from "./modules/staticRouter";


const router = createRouter({
	history: createWebHashHistory (),
	routes: staticRouter,

});

router.beforeEach((to,from,next)=>{
	const token = sessionStorage.getItem('token')
	if(to.path !== '/login' && token === undefined) {
		next('/login')
	}
	next()
})

export default router