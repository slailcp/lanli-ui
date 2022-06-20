import { ref, Ref } from 'vue';


export function setIcon(IconsTem: any, IconN: string) {
  const iconName = IconN.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  const IconName = iconName.charAt(0).toUpperCase() + iconName.substr(1, iconName.length - 1)
  return IconsTem[iconName] || IconsTem[IconName] || ""
}

export function isInteger(num: number) {
  return num % 1 === 0
}


export function calNum(num: number) {
  const BL = 1000
  let decimal = num * BL % BL;

  let isInteger = num * BL - decimal;

  decimal = decimal / BL;
  isInteger = isInteger / BL;
  return { decimal, isInteger }
}


export function rateCom(decimal: number) {
  decimal = decimal * 100;
  const n = Math.floor(decimal / 10) * 10;

  return n
}

export function deepclone(target: any) {
  target = target === undefined ? {} : target
  if (typeof target !== 'object' || typeof target == null) {
    return target
  }
  let ret: any | any[];
  if (target instanceof Array) {
    ret = []
  } else {
    ret = {}
  }

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      ret[key] = deepclone(target[key])
    }
  }
  return ret;
}

export function getZIndex() {
  const els: NodeListOf<Element> = document.querySelectorAll('[class^=lan-mask]')
  if (!els || !els.length) {
    return -1;
  }

  const zArr: number[] = [];
  els.forEach(item => {
    if (window.getComputedStyle(item).position != 'static') {
      zArr.push(parseInt(window.getComputedStyle(item).zIndex) || -1)
    }
  })
  const ret = Number(Math.max.apply(null, zArr) || 0)
  return ret > 500 ? ret : 501
}


export function scrollToDistance(toXDistance:number, toYDistance:number) {
  let disX = toXDistance - Number(document.documentElement && document.documentElement.scrollLeft);
  let disY = toYDistance - Number(document.documentElement && document.documentElement.scrollTop);

  animateScrollToTop()

  function animateScrollToTop() {

    disX = Math.abs(disX) > 1 ? disX - disX / 8 : 1;
    disY = Math.abs(disY) > 1 ? disY - disY / 8 : 1;

    const retX = toXDistance - disX
    const retY = toYDistance - disY

    if (Math.abs(disX) > 1 || Math.abs(disY) > 1) {
      window.requestAnimationFrame(animateScrollToTop);
      window.scrollTo(retX, retY);
    }
  }
}


















