import moment, { Moment } from "moment"

export type DateItem = {
  date: Moment | null;
  pass?: string;
  future?: string;
}
export type DateMon = {
  month: Moment;
  date: Array<DateItem>
}

export type DateObj = {
  [propName in string | number]: DateMon;
}

// const startWeek = 1; // 从周一开始

export function getAllDate(start = moment(), end = moment().add(1, 'months'), startWeek = 1) { // 获取两个日期间的所有日期数据
  const startDate = start.clone();
  const endDate = end.clone();

  const dataObject: DateObj = {};
  const diff = Math.abs(startDate.startOf('month').diff(endDate.endOf('month'), 'days')); // 两个日期相差多少天(start的月初,到end的月末)

  for (let i = 0; i < diff; i++) {
    const date = startDate.clone().add(i, 'days')
    const isfirst = date.format('DD') == '01' // 月初第一天
    const firstX = date.clone().startOf('month').format('x')

    if (!dataObject[firstX]) { dataObject[firstX] = { month: date, date: [] } }

    if (isfirst) {
      const weekday = date.weekday() === 0 ? 7 : date.weekday()
      dataObject[firstX].date.push(...fillEmpty(weekday - startWeek))// 初始第一个月
    }

    dataObject[firstX].date.push({
      date: date,
      pass: start.diff(date) > 0 ? 'lan-calendar-pass' : '',
      future: end.diff(date) < 0 ? 'lan-calendar-future' : ''
    })
  }

  return dataObject
}

function fillEmpty(num: number) {
  const ret: DateItem[] = []
  for (let i = 0; i < num; i++) {
    ret.push({
      date: null,
      pass: 'pass'
    })
  }
  return ret
}
