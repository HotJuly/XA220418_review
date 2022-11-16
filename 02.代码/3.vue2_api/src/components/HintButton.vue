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
            <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
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
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  