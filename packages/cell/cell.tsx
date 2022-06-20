import {
  defineComponent,
  Fragment,
  PropType
} from "vue";
import {setIcon} from "../utils"
import * as icons from '../icons'

export type CelltitVerAlignType = "top" | "middle" | "bottom"
export type CelltypeType = "1" | "default"
export type CellvalueAlignType = "left" | "center" | "right"


export const CellProps = {
  type: { default: "default", type: String as PropType<CelltypeType> },
  title: { default: "", type: String },
  titleIcon: { default: "", type: String },
  titVerAlign: { default: "middle", type: String as PropType<CelltitVerAlignType> },
  titleWidth: { default: "", type: String },

  value: { default: "", type: String },
  valueIcon: { default: "", type: String },

  label: { default: "", type: String },

  alowHtml: { default: false, type: Boolean },
  border: { default: false, type: Boolean },
  isLink: { default: false, type: Boolean },
  required: { default: false, type: Boolean },
  style: { default() { return {} }, type: Object },
}


export default defineComponent({
  name: "lan-cell",
  props: CellProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const { type, titleIcon, valueIcon, titleWidth } = props

    const titleStyle: any = {}
    if (props.titleWidth) { titleStyle["width"] = titleWidth }

    function onClick() {
      emit('click')
    }

    function titleIconRender() {
      let titIconTag: any = null
      if (titleIcon) { titIconTag = setIcon(icons,titleIcon) }

      return (
        <Fragment>
          {titIconTag ?
            <div class="lan-cell-tit-icon"><titIconTag class="lan-cell-icon" /></div>
            : null}
        </Fragment>
      )
    }

    function valueIconRender() {
      let valIconTag: any = null
      if (valueIcon) { valIconTag = setIcon(icons,valueIcon) }

      return (
        <Fragment>
          {valIconTag ?
            <div class="lan-cell-right-icon"><valIconTag class="lan-cell-icon" /></div>
            : null}
        </Fragment>
      )
    }

    function titleRender() {
      return (
        <Fragment>
          {props.title ?
            <div class={`lan-cell-title lan-cell-tit-ver-${props.titVerAlign}`} style={titleStyle}>{props.title}</div> : null
          }
        </Fragment>
      )
    }
    function valueRender() {
      return (
        <Fragment>
          {props.value ?
            props.alowHtml ?
              <div class="lan-cell-h4" v-html={props.value}></div> :
              <div class="lan-cell-h4">{props.value}</div> :
            null
          }
        </Fragment>
      )
    }
    function labelRender() {
      return (
        <Fragment>
          {props.label ?
            props.alowHtml ?
              <div class="lan-cell-label" v-html={props.label}></div> :
              <div class="lan-cell-label">{props.label}</div>
            : null}
        </Fragment>
      )
    }


    return () => {
      return <div class={`lan-cell-style ${props.border ? 'border' : ''} ${type === 'default' ? 'lan-cell-default' : ''}`}
        style={props.style}
        onClick={onClick}>
        {titleIconRender()}
        {titleRender()}
        <div class="lan-cell-value">
          {valueRender()}

          {labelRender()}
        </div>
        {valueIconRender()}
      </div>
    }
  }
})
