import {
  defineComponent, PropType, reactive, Transition
} from 'vue';
import { LayerAction } from "./types"

const LayerPropsOptions = {
  title: String,
  width: [String, Number],
  message: String,
  callback: Function as PropType<(action?: LayerAction) => void>,
  className: String,
  allowHtml: Boolean,
  lockScroll: Boolean,
  beforeClose: Function as PropType<(action?: LayerAction) => void | Boolean>,
  cancelButtonText: String,
  confirmButtonText: String,
  showCancelButton: Boolean,
  showConfirmButton: Boolean
}

export default defineComponent({
  name: "lan-layer",
  emits: ['confirm', 'cancel', 'close'],
  props: LayerPropsOptions,

  setup(props, { emit, attrs, slots }) {
    console.log(props);

    const state = reactive({
      show: true,
      isloadconfirm: false,
      isloadcancel: false
    })

    const cancelFn = async () => {
      state.isloadcancel = true;
      const isclose = await props.beforeClose?.('cancel')
      state.isloadcancel = false;
      if (isclose !== false) {
        props.callback?.('cancel');
        emit('cancel')
        state.show = false;
      }
    }

    const confirmFn = async () => {
      state.isloadconfirm = true;
      const isclose = await props.beforeClose?.('confirm')
      state.isloadconfirm = false;


      if (isclose !== false) {
        props.callback?.('confirm');
        emit('confirm')
        state.show = false;
      }
    }

    const loadingRender = (type?: string) => {
      if(type) return `<svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg>`
      return <svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg>
    }

    const renderTransition = () => {
      if (props.allowHtml) {
        return (
          <Transition
            name="lan-dialogbound"
            appear={true}
          >
            <div
              style={{ 'width': typeof props.width === 'string' ? props.width : `${props.width}px` }}
              class={`lan-layer lan-layer-center ${props.className}`}
              v-show={state.show}>
              <div class="lan-layer-title" v-html={props.title}></div>
              <div class="lan-layer-content" v-html={props.message}></div>
              <div class="lan-layer-buttons" v-show={props.showConfirmButton || props.showCancelButton}>
                <span class="lan-layer-btn"
                  v-show={props.showCancelButton}
                  onClick={cancelFn}
                  v-html={state.isloadcancel ? loadingRender('string') : props.cancelButtonText}></span>
                <span class="lan-layer-btn"
                  v-show={props.showConfirmButton}
                  onClick={confirmFn}
                  v-html={state.isloadconfirm ? loadingRender('string') : props.confirmButtonText}></span>
              </div>
            </div>
          </Transition>
        )
      }
      return (
        <Transition
          name="lan-dialogbound"
          appear={true}
        >
          <div
            style={{ 'width': typeof props.width === 'string' ? props.width : `${props.width}px` }}
            class={`lan-layer lan-layer-center ${props.className}`} v-show={state.show}>
            <div class="lan-layer-title">{props.title}</div>
            <div class="lan-layer-content">{props.message}</div>
            <div class="lan-layer-buttons" v-show={props.showConfirmButton || props.showCancelButton}>
              <span class="lan-layer-btn"
                v-show={props.showCancelButton}
                onClick={cancelFn}>{state.isloadcancel ? loadingRender() : props.cancelButtonText}</span>
              <span class="lan-layer-btn"
                v-show={props.showConfirmButton}
                onClick={confirmFn}>{state.isloadconfirm ? loadingRender() : props.confirmButtonText}</span>
            </div>
          </div>
        </Transition>
      )
    }

    const renderLayerMask = () => {
      return (
        <Transition name="lan-fade" appear={true}>
          <div v-show={state.show} class="lan-layer-mask"> </div>
        </Transition>
      )
    }

    return () => {
      return (
        <>
          {renderTransition()}
          {renderLayerMask()}
        </>
      );
    };
  },
});
