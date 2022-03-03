import {
  defineComponent, onMounted, PropType, reactive, Transition
} from 'vue';
import { ToastAction } from "./types"
import { IconSelect, IconCloseBold } from '../icons';

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
  name: "lan-toast",
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
      const ren = props.allowHtml ? <div class="lan-toast-content" v-html={props.message}></div> : <div class="lan-toast-content">{props.message}</div>;
      return (
        <>
          <div class="lan-toast-icon">
            <svg class="toastcircular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
          </div>
          {ren}
        </>
      )
    }

    const successRender = () => {
      return <IconSelect class="successfail-svg" />
    }

    const failRender = () => {
      return <IconCloseBold class="successfail-svg" />
    }

    const renderTransition = () => {
      let Ren = props.allowHtml ? <div class="lan-toast-content" v-html={props.message}></div> : <div class="lan-toast-content">{props.message}</div>
      if (props.type === 'loading') {
        Ren = loadingRender()
      }

      const successRen = props.type === 'success' ? <div class="lan-toast-icon">{successRender()}</div> : ""
      const failRen = props.type === 'fail' ? <div class="lan-toast-icon">{failRender()}</div> : ""
      return (
        <Transition
          name="lan-fade"
          appear={true}
        >
          <div
            style={{ 'width': typeof props.width === 'string' ? props.width : `${props.width}px` }}
            class={`lan-toast-center ${props.className} ${props.position} lan-toast-${props.type}-wraper`} v-show={state.show}>
            {successRen}
            {failRen}
            {Ren}
          </div>
        </Transition>
      )
    }

    const renderToastMask = () => {
      return (
        <Transition name="lan-fade" appear={true}>
          <div v-show={state.show} class={`lan-toast-mask ${props.shadeClassName}`}> </div>
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
