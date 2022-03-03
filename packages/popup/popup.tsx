import {
  defineComponent,
  Transition,
  watch, ref
} from 'vue';
export default defineComponent({
  name: "lan-popup",
  emits: [
    'opened',
    'closed',
    'open',
    'close',
    'update:show',
  ],
  props: {
    position: { Type: String, default: 'center' },
    transition: { Type: String, default: '' },
    transitionAppear: { type: Boolean, default: true },
    show: { type: Boolean, default: false },
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
      emit('update:show', false)
    };

    const renderPopup = () => {
      const name =
        (position === 'center' || position === '') ? 'lan-popup-center' : `lan-popup-${position}`;

      return (
        <div v-show={props.show} class={name} style={props.style} ref={popupRef}>
          {slots.default?.()}
        </div>
      )
    }
    const renderPopupMask = () => {
      return (
        <Transition name="lan-fade" appear={true}>
          <div v-show={props.show} class="lan-popup-mask" onClick={onCloseMask}> </div>
        </Transition>
      )
    }

    const { position, transition, transitionAppear } = props;

    const name =
      (position === 'center' || position === '') ? 'lan-fade' : `lan-slide-${position}`;

    const renderTransition = () => {
      return (
        <Transition
          v-slots={{ default: renderPopup }}
          name={transition || name}
          appear={transitionAppear}
          onAfterEnter={onOpened}
          onAfterLeave={onClosed}
        />
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
