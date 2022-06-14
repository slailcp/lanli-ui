import {
  defineComponent,
  Transition,
  ref,
  inject,
  nextTick
} from "vue";
import Icon from "../icons/icon";
import { scrollToDistance } from "../utils";



export default defineComponent({
  name: "node-container",
  props: {
    node: { default: () => { return {} }, type: Object },
  },
  emits: ['on-add'],
  setup(props, { emit, slots }) {
    const onAddEmit: Function | undefined = inject('on-add');
    const addNodes: any[] = inject('addNodes') || [];

    const chooseNodeShow = ref(false);
    const layerPositionX = ref(150);
    const layerPositionY = ref(20);

    const opendialog = (event: MouseEvent) => {
      if (event.clientX + 200 > window.innerWidth) {
        layerPositionX.value = -105;
      }
      if (event.clientY + 260 > window.innerHeight) {
        layerPositionY.value = -223;
      }

      if (!chooseNodeShow.value) {
        document.querySelector('html')?.click();
        event.stopPropagation()
      }
      chooseNodeShow.value = !chooseNodeShow.value;
    }

    const hide = () => {
      chooseNodeShow.value = false;
    }

    document.querySelector('html')?.removeEventListener('click', hide)
    document.querySelector('html')?.addEventListener('click', hide)
    const stopPropagation = (event: Event) => {
      event.stopPropagation()
    }

    const onAdd = (event: MouseEvent, type: string, value?: string) => {
      if (type === 'route') return;

      if (type === 'condition') {
        const conditionNodes: any = [
          { name: "条件1", type: "condition", nodeName: "", level: 0, properties: {}, },
          { name: "条件2", type: "condition", nodeName: "", level: 0, properties: {}, },
        ]
        if (props.node.childNode) { conditionNodes[0].childNode = props.node.childNode }

        props.node.childNode = {
          type: 'route',
          conditionNodes
        }
      }

      if (type !== 'route' && type !== 'condition') {
        const data: any = { name: value, type, nodeName: "", properties: {}, };
        if (props.node.childNode) { data.childNode = props.node.childNode }
        props.node.childNode = data
      }

      if (onAddEmit) {
        onAddEmit(type, props.node)
      }
      chooseNodeShow.value = false;

      nextTick(() => {
        scrollToDistance(event.pageX - 500, event.pageY - 500)
      })
    }

    return () => {
      const iscondition = addNodes.some(item => item.key === 'condition')
      return <div class="node-container">
        {slots.default ? slots.default() : null}

        <div class={`add-node-btn-box ${props.node.validate === false ? 'node-path-err' : ''}`} style="position:relative">
          <div class="add-node-btn">
            <div class="btn" onClick={opendialog}><span class="btn-icon"></span></div>
          </div>

          <Transition name="fan-slide-height" appear={true}>
            <div v-show={chooseNodeShow.value} class="choose-node-box" onClick={stopPropagation}
              style={{
                height: (addNodes.length + (iscondition ? 0 : 1)) * 52 + 'px',
                left: layerPositionX.value + 'px',
                top: layerPositionY.value + 'px'
              }}>
              {addNodes.map(f => (
                <div class="l-item" key={f.key} onClick={(e) => { onAdd(e, f.key, f.value) }}>
                  <Icon name={f.icon} color={f.color} />
                  {f.value}
                </div>
              ))}

              {!iscondition ?
                <div class="l-item" onClick={(e) => { onAdd(e, "condition") }}>
                  <Icon name="Branch" color="#ccc" />
                  条件分支
                </div> :
                null}

            </div>
          </Transition>
        </div>
      </div>
    }
  }
})
