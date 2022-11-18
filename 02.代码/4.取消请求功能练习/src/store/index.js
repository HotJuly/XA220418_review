import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        // 用于记录那些请求出去了没回来
        fns:{}
    },
    mutations:{
        ADD_FN(state,{url,cb}){
            state.fns[url] = cb;
            // console.log('ADD_FN')
        },
        REMOVE_FN(state,url){
            delete state.fns[url]
            // console.log('REMOVE_FN')
        },
        CLEAR_FN(state){
            Object.values(state.fns).forEach((cb)=>{
                // cb&&cb();
                cb?.();
            })
        }
    }
})