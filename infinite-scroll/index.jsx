import { defineComponent, Fragment, nextTick } from "vue"

export const scrollProps = {
  threshold: { default: 0, type: Number },
  hasMore: { default: false, type: Boolean },
  loadMoreFn: { default: () => { }, type: Function },
  el: { default: null, type: String },
}
export default defineComponent({
  name: 'infinite-scroll',
  props: scrollProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    let doing = null;

    if (props.el) {
      nextTick(() => {
        const el = document.querySelector(props.el)
        if (el) {
          el.addEventListener("scroll", (e) => {
            scroll()
          })
        }
      })
    } else {
      window.onscroll = scroll
    }
    async function scroll(e) {
      let el = document.body
      if (props.el) {
        el = document.querySelector(props.el)
      }
      const threshold = props.threshold || 10;
      let scrollTop = props.el ? el.scrollTop : (el.scrollTop || document.documentElement.scrollTop || window.pageXOffset);
      const docHeight = el.scrollHeight - (props.el ? el.offsetHeight : window.innerHeight)

      if ((docHeight <= (scrollTop + threshold)) && props.hasMore) {
        if (!doing) {
          doing = 'loading'
          const d = await props.loadMoreFn()
          setTimeout(() => {
            doing = d;
          }, 100);
        }
      }
    }

    return () => (
      <Fragment>
        {props.hasMore ?
          <div style={{ fontSize: '14px', textAlign: 'center', padding: '5px 0 10px 0' }}>加载中....</div> :
          <div style={{ fontSize: '14px', textAlign: 'center', padding: '5px 0 10px 0' }}>没有更多啦!</div>}
      </Fragment>
    )
  }
})