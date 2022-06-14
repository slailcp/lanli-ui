import {
  defineComponent, onMounted, PropType, reactive, Transition
} from 'vue';
import { ToastAction } from "./types"
import Icon from '../icons';
import { getZIndex } from '../utils';

const ToastPropsOptions = {
  type: String, // 'loading' 'success' 'fail' 'html'
  width: [String, Number],
  allowHtml: Boolean,
  message: String,
  duration: Number,
  shade: Boolean,
  shadeClassName: String,
  className: String,
  position: String, // 'top' 'bottom'
  onOpened: Function as PropType<(action?: ToastAction) => void | Boolean>,
  onClose: Function as PropType<(action?: ToastAction) => void | Boolean>,
}

export default defineComponent({
  name: "fan-toast",
  props: ToastPropsOptions,

  setup(props, { emit, attrs, slots }) {
    const state = reactive({
      show: true,
    })

    onMounted(() => {
      props.onOpened?.('open')
      if (props.type === 'text' || props.type === 'success' || props.type === 'fail') {
        setTimeout(() => {
          state.show = false;
          props.onClose?.('close')
        }, props.duration)
      }
    })

    const loadingRender = () => {
      const ren = props.allowHtml ? <div class="fan-toast-content" v-html={props.message}></div> : <div class="fan-toast-content">{props.message}</div>;
      return (
        <>
          <div class="fan-toast-icon">
            <svg class="toastcircular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
          </div>
          {ren}
        </>
      )
    }

    const successRender = () => {
      return <Icon name="Select" class="successfail-svg"/>
    }

    const failRender = () => {
      return <Icon name="CloseBold" class="successfail-svg" />
    }

    const renderTransition = () => {
      let Ren = props.allowHtml ? <div class="fan-toast-content" v-html={props.message}></div> : <div class="fan-toast-content">{props.message}</div>
      if (props.type === 'loading') {
        Ren = loadingRender()
      }

      const successRen = props.type === 'success' ? <div class="fan-toast-icon">{successRender()}</div> : ""
      const failRen = props.type === 'fail' ? <div class="fan-toast-icon">{failRender()}</div> : ""
      return (
        <Transition
          name="fan-fade"
          appear={true}
        >
          <div
            style={{ 'width': typeof props.width === 'string' ? props.width : `${props.width}px`,'z-index':getZIndex() + 2 }}
            class={`fan-toast-center ${props.className} ${props.position} fan-toast-${props.type}-wraper`} v-show={state.show}>
            {successRen}
            {failRen}
            {Ren}
          </div>
        </Transition>
      )
    }

    const renderToastMask = () => {
      return (
        <Transition name="fan-fade" appear={true}>
          <div v-show={state.show} class={`fan-mask-toast ${props.shadeClassName}`} style={{'z-index':getZIndex() + 1}}> </div>
        </Transition>
      )
    }

    return () => {
      return (
        <>
          {renderTransition()}
          {props.shade ? renderToastMask() : ''}
        </>
      );
    };
  },
});
