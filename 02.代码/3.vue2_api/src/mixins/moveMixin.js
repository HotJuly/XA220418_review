export default {
    data() {
        return {
          pageX:0,
          pageY:0
        }
      },
      mounted() {
        document.addEventListener('mousemove',this.moveHandler);
      },
      methods:{
        moveHandler(event){
          // console.log(event)
          const {clientX,clientY} = event;
          this.pageX = clientX;
          this.pageY = clientY;
          console.log('局部混合的methods方法')
        }
      }
}