import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import About from '@/components/About'

Vue.use(VueRouter);

export default new VueRouter({
    mode:"hash",
    routes:[
        {
            path:"/home",
            component:Home,
            // component:()=>import('@/components/Home.vue'),
            meta:{
                isShow:true
            }
        },
        
        {
            path:"/about",
            component:About
            // component:()=>import('@/components/About.vue')
        }
    ]
})