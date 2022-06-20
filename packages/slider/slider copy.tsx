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



export const SliderProps = {
  fillValue: {
    type: Number,
    default: 1000,
  },
  minValue: {
    type: Number,
    default: 0,
  },
  maxValue: {
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

    const tipShow = ref(false)
    const tipLeft = ref(0)
    const minLeft = ref(0);
    const maxLeft = ref(0);

    const touchWidth = ref(25);

    let lineWidth = 0;
    let lineLeft = 0;

    const curValue = ref(0);
    const sMinValue = ref(0);
    const sMaxValue = ref(0);

    let percentage = 0;
    const multiple = 1;

    watch(() => props.minValue, (newVal, oldVal) => {
      sMinValue.value = props.minValue;
      minLeft.value = sMinValue.value / percentage;
    })
    watch(() => props.maxValue, (newVal, oldVal) => {
      sMaxValue.value = props.maxValue;
      maxLeft.value = sMaxValue.value / percentage;
    })

    onMounted(() => {
      nextTick(() => {
        // @ts-ignore
        touchWidth.value = document.querySelector('.fj-touch-left').getBoundingClientRect().width;
        // @ts-ignore
        const fjLine = document.querySelector('.fj-line').getBoundingClientRect()
        lineWidth = fjLine.width;
        lineLeft = fjLine.left
        maxLeft.value = lineWidth;
        percentage = (props.fillValue / lineWidth) * multiple;
        sMinValue.value = props.minValue;
        sMaxValue.value = props.maxValue;
        minLeft.value = sMinValue.value * multiple / percentage;
        maxLeft.value = sMaxValue.value * multiple / percentage;
      })
    })


    const touchstart = (e: TouchEvent, type: string) => {

      emit('down', {
        ...e,
        custom: {
          type,
          minValue: sMinValue.value,
          maxValue: sMaxValue.value
        }
      })
    }
    function touchmove(e: TouchEvent, type: string) {
      const disX = e.touches[0].clientX - lineLeft
      if (disX < 0 || disX > lineWidth) { return; }
      if (type === 'min') {
        minLeft.value = Math.floor(disX);
        if (minLeft.value < 0) { minLeft.value = 0; return; }
        if (maxLeft.value - minLeft.value <= touchWidth.value) { minLeft.value = maxLeft.value - touchWidth.value; return; }
        curValue.value = Math.floor(minLeft.value * percentage / multiple);
      }

      if (type === 'max') {
        maxLeft.value = Math.ceil(disX);
        if (maxLeft.value > lineWidth) { maxLeft.value = lineWidth; return; }
        if (maxLeft.value - minLeft.value <= touchWidth.value) { maxLeft.value = minLeft.value + touchWidth.value; return; }
        curValue.value = Math.round(maxLeft.value * percentage / multiple);
      }
      tipShow.value = true;
      tipLeft.value = Math.round(curValue.value * multiple / percentage - 15);
      emit('move', {
        ...e,
        custom: {
          type,
          minValue: sMinValue.value,
          maxValue: sMaxValue.value,
          curValue: curValue.value,
        }
      })
    }
    function touchend(e: TouchEvent, type: string) {
      if (type === 'min') {
        if (props.step === 1) {
          sMinValue.value = curValue.value;
        } else {
          const stepnum = Math.round((minLeft.value * percentage / multiple) / props.step);
          sMinValue.value = stepnum * props.step;
          minLeft.value = sMinValue.value * multiple / percentage;
        }
      }
      if (type === 'max') {
        if (props.step === 1) {
          sMaxValue.value = curValue.value;
        } else {
          const stepnum = Math.round((maxLeft.value * percentage / multiple) / props.step);
          sMaxValue.value = stepnum * props.step;
          if (props.fillValue - sMaxValue.value < props.step) { sMaxValue.value = props.fillValue }
          maxLeft.value = sMaxValue.value * multiple / percentage;
        }
      }
      tipShow.value = false;
      emit('up', {
        ...e,
        custom: {
          type,
          minValue: sMinValue.value,
          maxValue: sMaxValue.value
        }
      })
    }


    return () => {
      const s = {}
      return <div>

        <div class="fj-slider-box">
          <div class="fj-slider">
            <div class="fj-value">
              <div class="fj-v-l">¥{sMinValue.value}</div>
              <div class="fj-v-r">¥{sMaxValue.value}</div>
            </div>
            <div
              class="fj-touch-left"
              onTouchstart={(e: TouchEvent): void => { touchstart(e, 'min') }}
              onTouchmove={(e: TouchEvent) => { touchmove(e, 'min') }}
              onTouchend={(e: TouchEvent) => { touchend(e, 'min') }}
              onTouchcancel={(e: TouchEvent) => { touchend(e, 'min') }}
              style={{ left: `${minLeft.value}px` }}
            ></div>
            <div
              class="fj-touch-right"
              onTouchstart={(e: TouchEvent): void => { touchstart(e, 'max') }}
              onTouchmove={(e: TouchEvent) => { touchmove(e, 'max') }}
              onTouchend={(e: TouchEvent) => { touchend(e, 'max') }}
              onTouchcancel={(e: TouchEvent) => { touchend(e, 'max') }}
              style={{ left: `${maxLeft.value}px` }}
            ></div>
            <div class="tip" style="{left:`${tipLeft.value}px`,display: tipShow.value ? 'block' : 'none'}">{curValue.value}</div>
            <div class="fj-line-pull" style="{left: `${minLeft.value + touchWidth.value/2}px`, width:`${maxLeft.value - minLeft.value}px`}"></div>
            <div class="fj-line"></div>
          </div>
        </div>
      </div>
    }
  }
})
