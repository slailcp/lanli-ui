import {
  defineComponent,
  Fragment,
  inject, ref
} from "vue";
import Icon from "../icons";
import NodeWraper from './node-wraper'
import NodeContainer from './node-container'
import { deepclone } from "../utils";
import { Dialog } from "../dialog";


// deepclone
export default defineComponent({
  name: "col-box",
  props: {
    position: {
      type: String,
      default: ''
    },
    parentNode: {
      type: Object,
      default: () => { return {} }
    },
    conditions: {
      type: Array,
      default: () => { return [] }
    },
    cIndex: {
      type: [Number, String],
      default: 0
    },
  },
  setup(props, { emit, slots }) {
    const onChooseEmit: Function | undefined = inject('on-choose');
    const onAddEmit: Function | undefined = inject('on-add');

    const onChoose = (type: any) => {
      if (props.cIndex === props.conditions.length - 1) return
      if (onChooseEmit) {
        onChooseEmit(type, props.conditions[Number(props.cIndex)], props.conditions)
      }
    }
    const onDel = (type: any) => {
      Dialog.confirm({
        title: "提示",
        message: "该条件分支下的所有节点将被删除，确认继续？",
        lockScroll: true,
        cancelButtonText: "取消",
        confirmButtonText: "删除",
      })
        .then((ret) => {
          if (props.conditions.length > 2) {
            props.conditions.splice(Number(props.cIndex), 1)
          } else {
            delete props.parentNode.conditionNodes;
          }
          if (onAddEmit) {
            onAddEmit(type, props.conditions[Number(props.cIndex)])
          }
        })
    }
    const onCopy = (type: any) => {
      const condition = deepclone(props.conditions[Number(props.cIndex)])
      condition.name = condition.name + "(复制)"
      condition.nodeName = ""

      if (props.cIndex === props.conditions.length - 1) {
        props.conditions.splice(Number(props.cIndex), 0, condition)
      } else {
        props.conditions.splice(Number(props.cIndex) + 1, 0, condition)
      }

      if (onAddEmit) {
        onAddEmit(type, props.conditions[Number(props.cIndex) + 1])
      }
    }

    const onChangeNode = (ct: string) => {
      let index = Number(props.cIndex)
      if (ct === 'left') {
        index = index - 1;
      }
      if (ct === 'right') {
        index = index + 1;
      }
      const temp: any = props.conditions[Number(props.cIndex)];
      props.conditions[Number(props.cIndex)] = props.conditions[index];
      props.conditions[index] = temp
    }

    function Line() {
      if (props.cIndex === 0) {
        return <Fragment>
          <div class="top-left-cover-line"></div>
          <div class="bottom-left-cover-line"></div>
        </Fragment>
      } else if (props.cIndex === props.conditions.length - 1) {
        return <Fragment>
          <div class="top-right-cover-line"></div>
          <div class="bottom-right-cover-line"></div>
        </Fragment>
      } else {
        return null
      }
    }

    const nameclipshow = ref(false);
    const showInputBox = () => {
      nameclipshow.value = true;
      setTimeout(() => {
        (document.querySelector('.name-input-clip') as HTMLElement).focus()
      }, 300);
    }
    return () => {
      const condition: any = props.conditions[Number(props.cIndex)]
      const clipname = condition.name;
      condition.level = Number(props.cIndex) + 1;
      condition.isDefaultName = props.cIndex === props.conditions.length - 1
      condition.name = props.cIndex === props.conditions.length - 1 ? '默认条件' : condition.name
      condition.nodeName = props.cIndex === props.conditions.length - 1 ? '未满足其他条件分支的情况，将使用默认流程' : condition.nodeName

      return <Fragment>
        {props.cIndex === 0 && condition.validate === true ?
          <Fragment>
            <div class="top-left-cover-err-line"></div>
            <div class="bottom-left-cover-err-line"></div>
          </Fragment>
          : null}
        {props.cIndex === props.conditions.length - 1 && condition.validate === true ?
          <Fragment>
            <div class="top-right-cover-err-line"></div>
            <div class="bottom-right-cover-err-line"></div>
          </Fragment>
          : null}

        <div class={`col-box ${condition.validate === false ? 'col-box-path-err' : ''}`}>
          {Line()}
          <NodeContainer node={condition} >
            <div class="node-conditionbox">
              <div class={`node-box node-${condition.type} box-relative`}>
                {props.conditions.length > 2 && props.cIndex !== 0 ?
                  <div class="left-change" onClick={() => { onChangeNode('left') }}><Icon size="12px" color="#999" name="ArrowLeft" /></div> : null}

                <div class="content-box">
                  {condition.contentValid === false && !condition.nodeName ? <div class="warn-err"><Icon name="WarningFilled" color="#f00" /></div> : null}
                  <div class={`line-end-arrow ${condition.validate === false ? 'line-end-arrow-err' : ''}`}></div>
                  <div class="title">
                    {
                      props.cIndex !== props.conditions.length - 1 ?
                        !nameclipshow.value ?
                          <span class="node-title-name copybtn" data-clipboard-target=".name-input-clip" onClick={showInputBox}>
                            {condition.name}
                          </span> :
                          <span class="node-title-name">
                            <input onBlur={() => { nameclipshow.value = false; condition.name = clipname }} v-model={clipname} class="name-input-clip" type="text" />
                          </span> :
                        <span>{condition.name}</span>
                    }

                    {!nameclipshow.value ? <Icon name="Edit" size="15px" color="#999" class="node-title-edit" /> : null}

                    <span class="node-title-operate" style="flex-grow: 1;">
                      {props.cIndex !== props.conditions.length - 1 ? <span class="node-title-delete" onClick={() => { onDel(condition.type) }}><Icon name="Close" color="#999" /></span> : null}
                      <span class="node-title-copy"><Icon name="DocumentCopy" color="#999" onClick={() => { onCopy(condition.type) }} /></span>
                    </span>

                    <span class="node-title-priority" style="flex-grow: 1;">优先级{condition.level}</span>

                  </div>
                  <div class="content">
                    <div class="content-text" onClick={() => { onChoose(condition.type) }}>
                      {condition.nodeName ? condition.nodeName :
                        <div class="content-text-default">请设置条件</div>
                      }
                    </div>
                    {
                      props.cIndex !== props.conditions.length - 1 ?
                        <i><Icon name="ArrowRight" color="#ccc" /></i> : null
                    }
                  </div>
                </div>
                {props.conditions.length > 2 && props.cIndex < props.conditions.length - 1 ?
                  <div class="right-change" onClick={() => { onChangeNode('right') }}><Icon size="12px" color="#999" name="ArrowRight" /></div> : null}

              </div>
            </div>
          </NodeContainer >

          {
            condition.childNode ?
              <NodeWraper parent-node={condition} node={condition.childNode} />
              : null
          }
        </div >
        {/*  */}
      </Fragment>
    }
  }
})
