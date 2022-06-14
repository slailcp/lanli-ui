import {
  defineComponent,
} from "vue";



export default defineComponent({
  name: "end-node",
  props: {
    node: { default: () => { return {} }, type: Object },
  },
  setup(props, { emit, slots }) {

    return () => {
      return <div class="node-container">
        <div class="node-box node-end">
          <div class={`line-end-arrow ${props.node.validate === false ? 'line-end-arrow-err' : ''}`}></div>
          流程结束
        </div>
      </div>
    }
  }
})
