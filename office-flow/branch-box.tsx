import {
  defineComponent,
  Fragment,
  PropType, inject
} from "vue";
import NodeContainer from './node-container'
import ColBox from './col-box'
import { FlowConditionNodesProp } from "./type";
import { removeValidate } from "./flowFn";



export default defineComponent({
  name: "branch-box",
  props: {
    node: { default: () => { return {} }, type: Object },
    parentNode: { default: () => { return {} }, type: Object },
  },
  setup(props, { emit, slots }) {
    const onRemoveValidate: Function | undefined = inject('on-remove-validate');

    const addCondition = () => {
      if (onRemoveValidate) {
        onRemoveValidate()
      }
      props.node.conditionNodes.splice(props.node.conditionNodes.length-1,0,{
        name: "条件" + (props.node.conditionNodes.length),
        type: "condition",
        level: 0,
        nodeName: "", properties: {},
      })
    }
    return () => {
      const node = props.node;
      return <NodeContainer node={props.node}>
        <div class="branch-box" style="position:relative">
          <div class="add-branch" onClick={addCondition}>添加条件</div>

          {props.node.validate === false ?
            <Fragment>
              <div class="top-left-cover-line-err"></div>
              <div class="top-right-cover-line-err"></div>
              <div class="bottom-left-cover-line-err"></div>
              <div class="bottom-right-cover-line-err"></div>
            </Fragment> : null}

          {
            node.conditionNodes ?
              node.conditionNodes.map((t: any, index: number) => (
                <Fragment>
                  <ColBox key={index} parent-node={node} conditions={node.conditionNodes} c-index={index} />
                </Fragment>
              )) : null
          }

        </div>
      </NodeContainer>
    }
  }
})
