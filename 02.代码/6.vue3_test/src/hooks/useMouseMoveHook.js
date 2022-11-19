
import { ref, onMounted } from 'vue';

export default function () {
  const pageX = ref(0);
  const pageY = ref(0);

  const moveHandler = (event) => {
    // console.log('mousemove')
    const { clientX, clientY } = event;
    pageX.value = clientX;
    pageY.value = clientY;
  };

  onMounted(() => {
    document.addEventListener("mousemove", moveHandler);
  });

  return{
    pageX,
    pageY
  }
}
