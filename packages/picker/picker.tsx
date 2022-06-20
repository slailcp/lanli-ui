import {
  defineComponent,
  PropType, watch
} from "vue";

import Columns, { ColType } from "./columns"

export type PickerColumnsViod = {
  value: string;
  defaultIndex: number | string;
}

export type PickerType = "selector" | "multiSelector" | "linkage";
export type PickerMode = "selector" | "multiSelector";

export const PcikerProps = {
  className: { type: String, default: "" },
  title: { type: String, default: "请选择" },
  type: { type: String as PropType<PickerType>, default: "base" },

  mode: { type: String as PropType<PickerMode>, default: 'selector' },
  value: { default: 2 },
  range: { type: Array as PropType<ColType[]>, default: () => { return [] } },
  rangeKey: { type: String, default: "name" },
}

export default defineComponent({
  name: "lan-picker",
  props: PcikerProps,
  emits: ['confirm', 'cancel', 'change'],
  setup(props, { emit, slots }) {
    let retBaseData: any = typeof props.value !== 'object' ? props.value : props.value;
    const retMultiData: any = typeof props.value !== 'object' ? props.value : props.value;

    const onEnter = () => {
      if (props.mode === 'selector') {
        emit('confirm', retBaseData)
      }
      if (props.mode === 'multiSelector') {
        emit('confirm', retMultiData)
      }
    }
    const onCancel = () => {
      if (props.mode === 'selector') {
        emit('cancel', retBaseData)
      }
      if (props.mode === 'multiSelector') {
        emit('cancel', retMultiData)
      }
    }


    const onChange = (e: number | string, index: number) => {
      if (props.mode === 'selector') {
        retBaseData = e;
        emit('change', e)
      } else if (props.mode === 'multiSelector') {
        retMultiData[index] = e;
        emit('change', retMultiData)
      }
    }

    return () => {
      return (
        <div class={`lan-pciker-container ${props.className}`}>
          <div class="lan-picker-title">
            <span class="lan-picker-title-cancel" onClick={onCancel}>取消</span>
            <span class="lan-picker-title-con">{props.title}</span>
            <span class="lan-picker-title-enter" onClick={onEnter}>确定</span>
          </div>
          <div class="lan-pciker-columns">

            {
              props.mode === 'selector' ?
                <Columns
                  columns={props.range}
                  defaultIndex={props.value}
                  rangeKey={props.rangeKey}
                  onChange={(e: number | string) => { onChange(e, 0) }} /> :

                null
            }
            {props.mode === 'multiSelector' ?
              (props.range as ColType[]).map((item: any, index: number) => (
                <Columns
                  columns={item}
                  defaultIndex={(props.value as any)[index]}
                  rangeKey={props.rangeKey}
                  key={index}
                  onChange={(e: number | string) => { onChange(e, index) }}
                />
              )) : null}
          </div>
        </div>
      );
    }
  }
})
