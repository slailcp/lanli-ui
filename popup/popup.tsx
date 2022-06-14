import {
  defineComponent,
  Transition,
  watch, ref, PropType
} from 'vue';
import { getZIndex } from '../utils';

export type PopupPosition = "center" | "top" | "bottom" | "left" | "right"

export default defineComponent({
  name: "fan-popup",
  emits: [
    'opened',
    'closed',
    'open',
    'close',
    'update:show',
  ],
  props: {
    position: { Type: String as PropType<PopupPosition>, default: 'bottom' },
    transition: { Type: String, default: '' },
    transitionAppear: { type: Boolean, default: true },
    show: { type: Boolean, default: false },
    maskIsClick: { type: Boolean, default: true },
    style: { type: Object, default: () => { return {} } },
  },

  setup(props, { emit, attrs, slots }) {
    const popupRef = ref<HTMLElement>();
    watch(
      () => props.show,
      (show) => {
        if (show) {
          emit('open');
        }
        if (!show) {
          emit('close');
        }
      }
    );

    const onOpened = () => emit('opened');
    const onClosed = () => emit('closed');

    const onCloseMask = () => {
      if(!props.maskIsClick) return;
      emit('update:show', false)
    };

    const renderPopup = () => {
      const name =
        (position === 'center' || position === '') ? 'fan-popup-center' : `fan-popup-${position}`;

      return (
        <div v-show={props.show} class={name} style={{...props.style,'z-index':getZIndex() + 2}} ref={popupRef}>
          {slots.default?.()}
        </div>
      )
    }
    
    const renderPopupMask = () => {
      return (
        <Transition name="fan-fade" appear={true}>
          <div v-show={props.show} class="fan-mask-popup" style={{'z-index':getZIndex() + 1}} onClick={onCloseMask}> </div>
        </Transition>
      )
    }

    const { position, transition, transitionAppear } = props;

    const name =
      (position === 'center' || position === '') ? 'fan-fade' : `fan-slide-${position === 'top' ? 'down' : position === 'bottom' ? 'up' : position}`;


    const renderTransition = () => {
      return (
        <div>
          <Transition
            v-slots={{ default: renderPopup }}
            name={transition || name}
            appear={transitionAppear}
            onAfterEnter={onOpened}
            onAfterLeave={onClosed}
          />
        </div>
      )
    }

    return () => {
      return (
        <>
          {renderTransition()}
          {renderPopupMask()}
        </>
      );
    };
  },
});
