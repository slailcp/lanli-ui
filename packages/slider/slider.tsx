import {
  defineComponent,
  Fragment,
  nextTick,
  onMounted,
  PropType,
  ref, watch
} from "vue";
import { setIcon } from "../utils"
import * as icons from '../icons'
import { Touch } from "../utils/touch"

const touch = new Touch();

export const SliderProps = {
  fillMaxValue: {
    type: Number,
    default: 1000,
  },
  fillMinValue: {
    type: Number,
    default: 1000,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1000,
  },
  step: {
    type: Number,
    default: 50,
  },
}


export default defineComponent({
  name: "lan-slider",
  props: SliderProps,
  emits: ['down', 'move', 'up'],
  setup(props, { emit, slots }) {

    const sliderHeight = 30;
    let sliderBoxWidth = 0;
    let initXLeft = 0;
    let initRight = 0;

    const left = ref(0)
    const width = ref(100)

    // let percentage = 0;

    onMounted(() => {
      sliderBoxWidth = Number(document.querySelector('.lan-slider-container')?.getBoundingClientRect().width);
      // initWidth = sliderBoxWidth;
      // percentage = props.fillMaxValue / sliderBoxWidth;
    })


    const onTouchStart = (e: TouchEvent, type: string) => {
      touch.start(e)
      if (type === 'min') {
        left.value = initXLeft;
      }

      if (type === 'max') {
        width.value = sliderBoxWidth - left.value - initRight
      }

    }
    const onTouchMove = (e: TouchEvent, type: string) => {
      touch.move(e)

      if (left.value < 0 || left.value > sliderBoxWidth) return;
      if (width.value < 0 || (width.value + left.value) > sliderBoxWidth) return;


      if (type === 'min') {
        left.value = initXLeft + touch.deltaX;
      }

      const w = sliderBoxWidth - initRight - left.value
      width.value = w;


      if (type === 'max') {
        width.value = w + touch.deltaX;
      }
    }
    const onTouchEnd = (e: TouchEvent, type: string) => {
      left.value = left.value <= 0 ? 0 : left.value;
      left.value = left.value >= sliderBoxWidth ? sliderBoxWidth : left.value;
      width.value = width.value <= 0 ? 0 : width.value;
      width.value = (width.value + left.value) >= sliderBoxWidth ? sliderBoxWidth - left.value - initRight : width.value;


      initXLeft = left.value;
      initRight = sliderBoxWidth - left.value - width.value


    }
    const onTouchCancel = (e: TouchEvent, type: string) => {
      console.log('onTouchCancel');

    }

    return () => {
      return <div class="lan-slider-container">
        <div class="lan-slider-fill" style={{ left: `${left.value / sliderBoxWidth * 100}%`, width: `${width.value / sliderBoxWidth * 100}%` }}>
          <div class="lan-slider-item-left"
            onTouchstart={(e) => { onTouchStart(e, 'min') }}
            onTouchmove={(e) => { onTouchMove(e, 'min') }}
            onTouchend={(e) => { onTouchEnd(e, 'min') }}
            onTouchcancel={(e) => { onTouchCancel(e, 'min') }}
          ></div>
          <div class="lan-slider-item-right"
            onTouchstart={(e) => { onTouchStart(e, 'max') }}
            onTouchmove={(e) => { onTouchMove(e, 'max') }}
            onTouchend={(e) => { onTouchEnd(e, 'max') }}
            onTouchcancel={(e) => { onTouchCancel(e, 'max') }}
          ></div>
        </div>
      </div>
    }
  }
})
