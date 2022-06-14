import {
  defineComponent, PropType, reactive, Transition
} from 'vue';
import { getZIndex } from '../utils';
import { DialogAction } from "./types"



const DialogPropsOptions = {
  title: String,
  width: [String, Number],
  message: String,
  callback: Function as PropType<(action?: DialogAction) => void>,
  className: String,
  allowHtml: Boolean,
  lockScroll: Boolean,
  beforeClose: Function as PropType<(action?: DialogAction) => void | Boolean>,
  cancelButtonText: String,
  confirmButtonText: String,
  showCancelButton: Boolean,
  showConfirmButton: Boolean
}

export default defineComponent({
  name: "fan-dialog",
  emits: ['confirm', 'cancel', 'close'],
  props: DialogPropsOptions,

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
            name="fan-dialogbound"
            appear={true}
          >
            <div
              style={{ 'width': typeof props.width === 'string' ? props.width : `${props.width}px`,'z-index':getZIndex() + 2 }}
              class={`fan-dialog fan-dialog-center ${props.className}`}
              v-show={state.show}>
              <div class="fan-dialog-title" v-html={props.title}></div>
              <div class="fan-dialog-content" v-html={props.message}></div>
              <div class="fan-dialog-buttons" v-show={props.showConfirmButton || props.showCancelButton}>
                <span class="fan-dialog-btn"
                  v-show={props.showCancelButton}
                  onClick={cancelFn}
                  v-html={state.isloadcancel ? loadingRender('string') : props.cancelButtonText}></span>
                <span class="fan-dialog-btn"
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
          name="fan-dialogbound"
          appear={true}
        >
          <div
            style={{ 'width': typeof props.width === 'string' ? props.width : `${props.width}px`,'z-index':getZIndex() + 2 }}
            class={`fan-dialog fan-dialog-center ${props.className}`} v-show={state.show}>
            <div class="fan-dialog-title">{props.title}</div>
            <div class="fan-dialog-content">{props.message}</div>
            <div class="fan-dialog-buttons" v-show={props.showConfirmButton || props.showCancelButton}>
              <span class="fan-dialog-btn"
                v-show={props.showCancelButton}
                onClick={cancelFn}>{state.isloadcancel ? loadingRender() : props.cancelButtonText}</span>
              <span class="fan-dialog-btn"
                v-show={props.showConfirmButton}
                onClick={confirmFn}>{state.isloadconfirm ? loadingRender() : props.confirmButtonText}</span>
            </div>
          </div>
        </Transition>
      )
    }

    const renderDialogMask = () => {
      return (
        <Transition name="fan-fade" appear={true}>
          <div v-show={state.show} class="fan-mask-dialog" style={{'z-index':getZIndex() + 1}}> </div>
        </Transition>
      )
    }

    return () => {
      return (
        <>
          {renderTransition()}
          {renderDialogMask()}
        </>
      );
    };
  },
});
