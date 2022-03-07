import {
  defineComponent, watch,
} from 'vue';
import moment from "moment";
import { getAllDate, DateObj, DateItem } from "./date"

export default defineComponent({
  name: "lan-calendar",
  props: {
    minDate: { Type: String, default: moment().format("YYYY-MM-DD") },
    maxDate: { Type: String, default: moment().add(1, 'months').format("YYYY-MM-DD") },
    defaultDate: { Type: [String, Array], default: moment().format("YYYY-MM-DD") },
    isShowSectionBg: { Type: Boolean, default: true },
    style: { type: Object, default: () => { return {} } },
    monthFormatter: { type: String, default: "YYYY年MM月" },
    dateFormatter: { type: String, default: "DD" },
    startWeek: { type: Number, default: 1 }, // 从周几开始1,2,3,4,5,6,0
    className: { type: String, default: "" },
  },
  emits: ['choose'],
  setup(props, { emit, attrs, slots }) {
    const calendarObj: DateObj = getAllDate(moment(props.minDate), moment(props.maxDate), props.startWeek)

    const dateChooseFn = (DateItem: DateItem) => {
      if (DateItem.pass || DateItem.future) { return; }
      emit('choose', moment(DateItem.date).format("YYYY-MM-DD"))
    }

    let chooseDatelist: string[] = [];

    watch(
      () => props.defaultDate,
      (val) => {
        chooseDatelist = [];
        const defaultDate = val;
        if (typeof defaultDate === 'object' && Array.isArray(defaultDate)) {
          if ((defaultDate as any[]).length === 2) {
            const diffnum = Math.abs(moment(defaultDate[0]).diff(moment(defaultDate[1]), 'days'))
            for (let i = 1; i < diffnum; i++) {
              const first = moment(defaultDate[0]).clone();
              chooseDatelist.push(first.add(i, 'days').format('YYYY-MM-DD'))
            }
          }
        }
      },
      { deep: true }
    )

    const renderDate = () => {
      const calendarRen = [];
      for (const key in calendarObj) {
        calendarRen.push(<div class="lan-calendar-month">{moment(calendarObj[key].month).format(props.monthFormatter)}</div>)

        if (calendarObj[key].date.length) {
          const cren: any = []

          calendarObj[key].date.forEach(item => {
            let hasDefault;

            if (typeof props.defaultDate === 'string') {
              hasDefault = moment(item.date).format("YYYY-MM-DD") === moment(props.defaultDate).format("YYYY-MM-DD")
            } else {
              hasDefault = (props.defaultDate as string[]).includes(moment(item.date).format("YYYY-MM-DD"))
            }

            let hasChoose = props.isShowSectionBg;
            if (props.isShowSectionBg) {
              hasChoose = (chooseDatelist as string[]).includes(moment(item.date).format("YYYY-MM-DD"))
            }

            cren.push(
              <div onClick={() => dateChooseFn(item)}
                class={`lan-calendar-con-date 
              ${hasDefault ? 'lan-calendar-date-active' : ''} 
              ${item.pass || ''} ${item.future || ''} 
              ${hasChoose ? 'lan-calendar-date-choose' : ''}`}>
                {item.date ? moment(item.date).format(props.dateFormatter) : ""}
              </div>
            )
          })
          calendarRen.push(<div class="lan-calendar-con">{...cren}</div>)
        }
      }
      return <>
        <div class="lan-calendar-con lan-calendar-week">
        <span class="lan-calendar-con-date" v-show={props.startWeek === 0}>日</span>
          <span class="lan-calendar-con-date">一</span>
          <span class="lan-calendar-con-date">二</span>
          <span class="lan-calendar-con-date">三</span>
          <span class="lan-calendar-con-date">四</span>
          <span class="lan-calendar-con-date">五</span>
          <span class="lan-calendar-con-date">六</span>
          <span class="lan-calendar-con-date" v-show={props.startWeek === 1}>日</span>

        </div>
        <div>{calendarRen}</div>
      </>
    }

    return () => {
      return (
        <>
          <div class={props.className} style={props.style}>{renderDate()}</div>
        </>
      );
    };
  },
});
