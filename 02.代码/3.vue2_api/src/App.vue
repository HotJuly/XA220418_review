<template>
  <div id="app">

    <!-- <BigImage v-bind="$data"> -->
    <BigImage :src="url" :preview-src-list="srcList">
      <template #content="{ listeners }">
        <h1 v-on="listeners">bigImage</h1>
        <!-- <h1 @click="handler">bigImage</h1> -->
      </template>
    </BigImage>

  </div>
</template>

<script>
import BigImage from '@/components/BigImage'

export default {
  name: 'App',
  data() {
    return {
      msg: "我是初始化数据",
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  components: {
    BigImage,
  },
  mounted() {
  },
}
</script>

<style>

</style>
