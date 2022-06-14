import {
  defineComponent,
  provide
} from "vue";
import NodeWraper from './node-wraper'
import EndNode from './end-node'
import { removeValidate } from "./flowFn";


export const FlowProps = {
  node: { default: () => { return {} }, type: Object },
  addNodes: { default: () => { return [] }, type: Array },
}

export default defineComponent({
  name: "fan-office-flow",
  props: FlowProps,

  emits: ['click', 'on-add', 'on-choose'],
  setup(props, { emit, slots }) {
    provide('on-remove-validate', () => {
      removeValidate(props.node)
    })

    provide('on-add', (type: string, node: any) => {
      removeValidate(props.node)
      emit('on-add', { type, node })
    })
    provide('on-choose', (type: string, node: any, conditions: any[] = []) => {

      emit('on-choose', { type, node, conditions })
    })
    provide('addNodes', props.addNodes)


    return () => {
      return <div class="approvalFlow">
        <div class="approvalFlow-content" style="transform: scale(1); transform-origin: 496.5px 0px 0px;">
          <NodeWraper parent-node={null} node={props.node} />
          <EndNode node={props.node} />
          {/* 
          结构
          <NodeWraper parent-node={null} node={props.node}>
                <NodeContainer>
                  <BranchBox>
                    <NodeContainer>
                      <ColBox>
                        <NodeContainer>
                          ...
                        </NodeContainer>
                        <NodeWraper></NodeWraper>
                      </ColBox>
                    </NodeContainer>
                  </BranchBox>
                </NodeContainer>
                <NodeWraper>
                  ...
                </NodeWraper>
          </NodeWraper>
          <EndNode node={props.node} />
        */}
        </div>
      </div>
    }
  }
})
