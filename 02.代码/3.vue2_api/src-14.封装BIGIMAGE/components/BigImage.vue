<template>
    <div class="big">
        <!-- <el-image 
        ref="image123"
        v-show="false"
        style="width: 100px; height: 100px" 
        :src="url" 
        :preview-src-list="preview-src-list"
        > -->
        <el-image 
        ref="image123"
        v-show="false"
        style="width: 100px; height: 100px" 
        v-bind="$attrs"
        >
        </el-image>
        <img :src="$attrs.src" alt="">

        <!-- <button @click="handler">查看大图</button> -->

        <slot name="content" :listeners="{
            click:handler
        }"></slot>
    </div>
</template>
  
<script>
export default {
    name: 'BigImage',
    data() {
        return {
        }
    },
    // props:['url','preview-src-list'],
    methods:{
        handler(){
            this.$refs.image123.clickHandler();
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  