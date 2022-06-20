import {
  defineComponent,
  PropType
} from "vue";
import {setIcon} from "../utils"

import * as icons from '../icons'

export type ButtonType = "primary" | "success" | "warning" | "danger" | "default"
export type ButtonSize = "large" | "small" | "mini" | "normal"

const IconsTem: any = icons

export const ButtonProps = {
  type: { default: "default", type: String as PropType<ButtonType> },
  icon: { default: "", type: String },
  size: { default: "normal", type: String as PropType<ButtonSize> },
  text: { default: "", type: String },
  bgColor: { default: "", type: String },
  borderColor: { default: "", type: String },
  color: { default: "", type: String },
  disabled: { default: false, type: Boolean },
  radius: { default: "", type: String },
  width: { default: "", type: String },
  style: { default() { return {} }, type: Object },
}

export default defineComponent({
  name: "lan-button",
  props: ButtonProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const { type, size, disabled, radius, bgColor, borderColor, color, width, icon } = props

    const classname = `lan-button-${type} lan-button-size-${size} ${disabled ? "disabled" : ''}`
    const style: any = {
      ...props.style
    }
    if (radius) { style.borderRadius = radius }
    if (bgColor) {
      style["background"] = bgColor;

    }
    if (color) {
      style["color"] = color;
    }
    if (width) {
      style["width"] = width;
    }

    const afterStyle: any = {}
    if (type === 'default') {

      if (radius) {
        const unit = (radius.match(/[^0-9]/g) || []).join("")
        const num = (radius.match(/\d/g) || []).join("")
        afterStyle.borderRadius = `${Number(num) * 2}${unit}`
      }
      if (borderColor) {
        afterStyle.borderColor = borderColor
      }
    }

    let iconTag: any = null
    if (icon) {
      iconTag = setIcon(icons,icon)
    }

    const onClick = (event: MouseEvent) => {
      emit('click', event);
    }


    return () => {
      return (
        <div class={`lan-button-style ${classname}`} style={style} onClick={onClick}>
          {iconTag ? <iconTag class="lan-button-icon" /> : null}
          <span class="lan-button-text">{slots.default ? slots.default() : props.text}</span>
          {type === 'default' ? <i class="lan-button-after" style={afterStyle}></i> : null}
        </div>
      )
    }
  }
})
