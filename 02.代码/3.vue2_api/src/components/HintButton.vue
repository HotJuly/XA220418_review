<template>
    <div class="big">
        <el-tooltip class="item" effect="dark" :content="title" placement="top-start">
            <!-- <el-button :type="type" :size="size">添加</el-button> -->
            <!-- <el-button v-bind="{
                type:'danger',
                size:'big'
            }">添加</el-button> -->
            <!-- <el-button v-bind="{
                type,
                size
            }">添加</el-button> -->
            <!-- <el-button v-bind="$attrs" v-on="{
                click:fn
            }">添加</el-button> -->
            <!-- <el-button v-bind="$attrs" @click="handler1">添加</el-button> -->
            <!-- <el-button v-bind="$attrs" v-on="$listeners">添加</el-button> -->
            <!-- <button @click="fn">添加</button> -->
            <button v-on="$listeners">添加</button>
            <!-- @和v-on是用一个东西,
            他们在绑定事件的时候,
            会判断当前标签是原生DOM还是组件标签

                如果是原生DOM,那么绑定的就是原生事件
                如果是组件,那么绑定的就是自定义事件
             -->
            
        </el-tooltip>
    </div>
</template>
  
<script>
export default {
    name: 'BigImage',
    // props:["title",'type','size']
    props:["title"],
    methods:{
        fn(){
            console.log(3)
        }
    },
    mounted(){
        console.log(this.$listeners)
    },
    watch:{
        a(){

        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  