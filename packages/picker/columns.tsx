import {
  computed,
  defineComponent,
  nextTick,
  ref, unref, Ref, PropType
} from "vue";
import { Touch } from "../utils/touch"
const touch = new Touch();

export type ColType = {
  [key: string]: any
}
export type columnsListType = { defaultIndex: number; list: ColType }
export const ColumnsProps = {
  columns: { type: Array as PropType<ColType[]>, default: [] },
  defaultIndex: { type: [Number, String], default: 2 },
  rangeKey: { type: String, default: "name" },

  onChange: {
    type: Function, default() {
      return 'Default function'
    }
  },
}

export default defineComponent({
  name: "lan-columns",
  props: ColumnsProps,
  setup(props, { emit, slots }) {
    const columnWraperRef = ref<HTMLElement>();
    const columnConRef = ref<HTMLElement>();
    const columnRef = ref<HTMLElement>();
    const columnWraperH = 175;
    const columnH = 35;
    const columnConH = columnH * props.columns.length;

    let disY = 0;
    let isTouchend = false;

    const deltaY = ref(0)

    const TODISTANCE = 30; // 距离上下的拉扯距离

    let moveMinValue = 0
    let moveMaxValue = 0

    let defaultIndex = props.defaultIndex;
    let zoomIndex = props.defaultIndex;

    let deltaYTime = 0;
    let deltaDistance = 0;
    let MoveY = 0;

    
    const initH = () => {
      // columnWraperH = columnWraperRef.value?.getBoundingClientRect().height || 0;
      // columnConH = columnConRef.value?.getBoundingClientRect().height || 0;
      // columnH = columnRef.value?.getBoundingClientRect().height || 0;
      moveMinValue = columnH * 2;
      moveMaxValue = -columnConH + columnWraperH - columnH * 2;
      deltaY.value = (2 - Number(props.defaultIndex)) * columnH;
    }


    const columnsList = computed(() => {
      nextTick(() => { initH() })

      return Array(props.columns.length).fill("").map((_, index) => {
        return {
          defaultIndex: index,
          list: props.columns[index]
        } as columnsListType
      })
    })

    const onTouchStart = (e: any) => {
      touch.start(e)
      disY = deltaY.value;

      isTouchend = false;
      deltaYTime = Date.now()
      deltaDistance = 0;
    }
    const onTouchMove = (e: any) => {
      if (deltaY.value > moveMinValue + TODISTANCE || deltaY.value < moveMaxValue - TODISTANCE) {
        return
      }
      touch.move(e)
      deltaY.value = disY + touch.deltaY;
      MoveY = e.touches[0].clientY
      const now = Date.now(); // 滑动的过程中,如果超过200毫秒就重置deltaDistance,deltaDistance越小,滑动的越快.
      if (now - deltaYTime > 200) {
        deltaYTime = now;
        deltaDistance = e.touches[0].clientY;
      }
      zoomIndex = Math.round(Math.abs(deltaY.value / columnH - 2))
    }
    function onTouchEnd(e: any) {
      const speed = Math.abs(MoveY - deltaDistance) / (Date.now() - deltaYTime) || 0
      deltaY.value = disY + (touch.deltaY) * (speed > 2 ? Math.floor(speed) : 1);

      if (deltaY.value > moveMinValue) {
        deltaY.value = moveMinValue;
        setIndex()
        changeEmit()
        return
      }
      if (deltaY.value < moveMaxValue) {
        deltaY.value = moveMaxValue;
        setIndex()
        changeEmit()
        return
      }

      isTouchend = true;

      deltaY.value = Math.round(deltaY.value / columnH) * columnH
      setIndex()
      changeEmit()
    }
    const changeEmit = () => {
      props.onChange(defaultIndex)
    }

    const setIndex = () => {
      defaultIndex = Math.round(Math.abs(deltaY.value / columnH - 2))
      zoomIndex = Math.round(Math.abs(deltaY.value / columnH - 2))
    }

    function columnRender() {
      const z = Number(zoomIndex)

      return columnsList.value.map((item: { defaultIndex: number; list: ColType }, index) => <div class={`lan-pciker-column-item`}
        key={index}
        target-index={index}
        ref={columnRef}>
        <span style={`transform: scale(${Number((1.2 - Math.abs(index - z) / 4).toFixed(2))});display:block;transition:.1s all`}>
          {item.list[props.rangeKey]}
        </span>
      </div >)
    }

    return () => {
      const columnstyle = {
        transform: `translate3d(0px, ${deltaY.value}px, 0px)`,
        transitionDuration: `${isTouchend ? 500 : 0}ms`,
        transitionProperty: `${isTouchend ? 'all' : 'none'}`,
        transitionTimingFunction: 'ease-out'
      }

      return (
        <div>
          <div class="lan-pciker-column"
            ref={columnWraperRef}
            onTouchstart={onTouchStart}
            onTouchmove={onTouchMove}
            onTouchend={onTouchEnd}
            onTouchcancel={onTouchEnd}
          >
            <div
              ref={columnConRef}
              style={columnstyle}>
              {columnRender()}
            </div>
          </div>
          <div class="van-picker-mask"></div>
        </div>
      );
    }
  }
})
