import {
  defineComponent,
  Fragment, Ref, ref
} from "vue";
import { calNum, rateCom } from "../utils"
import { Touch } from "../utils/touch"

import Icon from '../icons'
const touch = new Touch();

/**
 * 整数的话会向上取整， 2.4就是3
 */


export const RateProps = {
  modelValue: { default: 0, type: Number }, //
  count: { default: 5, type: Number }, //图标个数
  size: { default: "20px", type: String }, // 图标大小
  space: { default: "5px", type: String }, // 间距
  initColor: { default: "#999", type: String }, // 颜色-未选中
  color: { default: "#ff6600", type: String }, // 颜色-选中
  disabledColor: { default: "#c8c9cc", type: String }, // 禁用颜色
  initIcon: { default: "", type: String }, // 图标-未选中
  icon: { default: "star-filled", type: String }, // 图标-选中
  disabled: { default: false, type: Boolean }, // 是否禁用
  readonly: { default: false, type: Boolean }, // 只读状态,可以设置小数
  ismove: { default: false, type: Boolean }, // 只读状态,可以设置小数
  allowHalf: { default: false, type: Boolean }, // 半星
  decimal: { default: false, type: Boolean }, // 小数
}


export default defineComponent({
  name: "lan-score",
  props: RateProps,
  emits: ['click', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const { disabled, disabledColor, color, initColor, readonly, icon, initIcon, size, ismove, decimal, allowHalf } = props;
    const isStar = icon.toUpperCase().indexOf('STAR') === 0;
    const isHeart = icon.toUpperCase().indexOf('heart') === 0;

    const untouch = disabled || readonly || !ismove;

    const _color = disabled ? disabledColor || color : color;

    let modelValue = props.modelValue;
    const count = [...Array(props.count).keys()]

    const RateRefs = count.map(item => ref<HTMLElement>());
    const RateSpanRefs = count.map(item => ref<HTMLElement>());

    const rateStyle = {
      marginRight: props.space,
    }

    let offsetXList: number[] = [];
    function updateRate(type?: string) {
      if (type === 'start') {
        offsetXList = [];
        const halfIconW = (RateSpanRefs[0].value as HTMLElement).getBoundingClientRect().width / 2

        RateRefs.reduce((preVal, curVal: Ref) => {
          const sum = preVal + curVal.value.getBoundingClientRect().width
          if (allowHalf) {

            offsetXList.push(preVal + halfIconW)
          }
          offsetXList.push(sum)
          return sum;
        }, 0)
      }

      const toParentX = (touch.initX - touch.parentOffsetX + touch.deltaX);

      for (let i = 0; i < offsetXList.length; i++) {
        const item = offsetXList[i]
        if (item > toParentX) {
          const nX = allowHalf ? (i + 1) / 2 : (i + 1)
          if (nX !== modelValue) {
            modelValue = nX
            emit('update:modelValue', modelValue)
          }
          break
        }
      }
    }

    // 整数
    function integerRender(index: number) {
      return <Fragment>
        {index < modelValue ?
          <Icon name={icon} color={_color} size={size} key={1} />
          :
          <Icon name={initIcon || icon} color={initColor} size={size} key={2} />
        }
      </Fragment>
    }

    // 半星
    function allowHalfRender(index: number) {
      const isdecima = /\./g.test(`${modelValue}`)

      const { isInteger } = calNum(modelValue);
      const cname = isStar ? 'star' : 'heart'
      const rateICON = `${cname}50`
      return <Fragment>
        {index < isInteger ?
          <Icon name={icon} color={_color} size={size} key={1} /> :
          index <= isInteger && isdecima ?
            <Icon name={rateICON} color={_color} size={size} key={2} /> :
            <Icon name={initIcon || icon} color={initColor} size={size} key={3} />
        }
      </Fragment>
    }

    // 小数
    function decimalRender(index: number) {
      const { decimal, isInteger } = calNum(modelValue);
      const cname = isStar ? 'star' : 'heart'
      const rateICON = `${cname}${rateCom(decimal)}`
      return <Fragment>
        {index < isInteger ?
          <Icon name={icon} color={_color} size={size} /> :
          index <= isInteger ?
            <Icon name={rateICON} color={_color} size={size} /> :
            <Icon name={initIcon || icon} color={initColor} size={size} />
        }
      </Fragment>
    }

    function renderType(index: number) {
      if (decimal) {
        return decimalRender(index)
      }
      if (allowHalf) {
        return allowHalfRender(index)
      }

      return integerRender(index)
    }

    const changeValue = (index: number) => {
      if (disabled || readonly || ismove) return;
      modelValue = index + 1;
      emit('update:modelValue', modelValue)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (untouch) return;
      touch.start(event);
      updateRate('start');
    }

    // TODO由于ICON组件更改导致onTouchMove移动过程中不运行，在css里面加个after防止鼠标滑动到icon上面
    function onTouchMove(event: any) {
      if (untouch) return;
      touch.move(event);

      if (!touch.isHorizontal()) return;
      updateRate();
    }


    return () => {
      return <div
        class={`lan-rate-box ${disabled ? 'lan-rate-disabled' : ''}  ${readonly ? 'lan-rate-readonly' : ''} ${ismove ? 'lan-rate-move' : ''}`}
        onTouchstart={onTouchStart}
        onTouchmove={onTouchMove}
      >
        {
          count.map((num, index) => <div class="lan-rate" target-index={index} onClick={() => { changeValue(index) }} key={index} ref={RateRefs[index]}>
            <div class="lan-rate-span" style={rateStyle} ref={RateSpanRefs[index]}> {renderType(index)}</div>
          </div>)
        }
      </div>
    }
  }
})

