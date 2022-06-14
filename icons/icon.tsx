import * as icon from './com'
import * as star from './star'
import * as heart from './heart'
import { setIcon } from "../utils"

const icons = { ...icon, ...star, ...heart }


import { defineComponent, Fragment } from "vue"

export const IconProps = {
    name: { default: "user", type: String },
    size: { default: "20px", type: String },
    color: { default: "#333", type: String },
    dot: { default: false, type: Boolean },
    badge: { default: "", type: String },
    iconIndex: { default: "0", type: [String, Number] },
}
export default defineComponent({
    name: 'fan-icon',
    props: Object.assign({}, IconProps),
    emits: ['click'],
    setup(props, { emit, slots }) {
        const IsUrl = /\//g.test(props.name);
        const style = {
            width: props.size,
            color: props.color,
        }


        function iconRender() {
            const iconCom = setIcon(icons, props.name)
            return (
                <iconCom style={style} />
                // <span style="display:inline-block;min-width:40px;">{name}</span>
            )
        }
        function imageRender() {
            return (
                <img src={props.name} style={style} />
            )
        }

        function onClick(event: MouseEvent) {
            emit('click', event)
        }
        return () => (
            <div class="fan-icon-wraper" onClick={onClick}>
                {IsUrl ? imageRender() : iconRender()}
                {props.dot ? <i class={`fan-icon-dot`}></i> : null}
                {props.badge ? <i class={`fan-icon-badge ${!props.badge ? 'fan-icon-badge-empty' : ''}`}>{props.badge}</i> : null}
            </div>
        )
    }
})