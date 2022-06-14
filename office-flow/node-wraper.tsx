import {
  defineComponent, Fragment, inject,  ref
} from "vue";
import Icon from "../icons";

import NodeWraper from './node-wraper'
import NodeContainer from './node-container'
import BranchBox from './branch-box'


export default defineComponent({
  name: "node-wraper",
  props: {
    node: { default: () => { return {} }, type: Object },
    parentNode: { default: () => { return {} }, type: Object },
  },
  setup(props, { slots }) {
    const onChooseEmit: Function | undefined = inject('on-choose');
    const onAddEmit: Function | undefined = inject('on-add');

    const onChoose = (type: any) => {
      if (onChooseEmit) {
        onChooseEmit(type, props.node)
      }
    }

    const onDel = (type: string) => {
      const childNode = props.parentNode?.childNode?.childNode

      if (props.parentNode) {
        delete props.parentNode.childNode;
      }
      if (childNode) {
        props.parentNode.childNode = childNode
      }

      if (onAddEmit) {
        onAddEmit(type, props.node)
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
      const node = props.node
      const clipname = node.name;
      const nodeFlag = node && (node.type !== 'condition' && node.type !== 'route')
      const childNode = props.node.childNode
      return <Fragment>
        {nodeFlag ?
          <NodeContainer node={node}>
            <div class={`node-box node-creator node-${node.type}`}>
              {node.contentValid === false && !node.nodeName ? <div class="warn-err"><Icon name="WarningFilled" color="#f00" /></div> : null}

              <div class={`line-end-arrow ${node.validate === false ? 'line-end-arrow-err' : ''}`}></div>
              <div class="title">
                {node.type === 'start' ?
                  <span class="node-title-name">申请人</span> :
                  <Fragment>
                    {!nameclipshow.value ? <span class="node-title-name copybtn" data-clipboard-target=".name-input-clip"
                      onClick={showInputBox}>
                      {node.name}</span> : null}
                    {nameclipshow.value ? <span class="node-title-name">
                      <input onBlur={() => { nameclipshow.value = false; node.name = clipname }} v-model={clipname} class="name-input-clip" type="text" />
                    </span> : null}

                    {!nameclipshow.value ? <Icon name="Edit" size="15px" color="#999" class="node-title-edit" /> : null}
                  </Fragment>
                }

                <span class="node-title-operate" style="flex-grow: 1;">
                  {node.type !== 'start' ? <span class="node-title-delete" onClick={() => { onDel(node.type) }}><Icon name="Close" color="#999" /></span> : null}
                </span>
              </div>
              <div class="content" onClick={() => { onChoose(node.type) }}>
                <div class="content-text">
                  {node.nodeName ? node.nodeName :
                    <span class="placeholder">请选择</span>
                  }
                </div>
                <i class="ww_commonImg"> <Icon name="ArrowRight" color="#ccc" /> </i>
              </div>
            </div>
          </NodeContainer> : null}

        {node.conditionNodes ? <BranchBox parent-node={props.parentNode} node={node} /> : null}
        {childNode ? <NodeWraper parent-node={node} node={childNode} /> : null}
      </Fragment>
    }
  }
})
