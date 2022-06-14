const camelizeRE = /-(\w)/g;

// 将横线转成大写 例如 fan-button -> fanButton
export const camelize = (str: string): string =>
  str.replace(camelizeRE, (_, c) => c.toUpperCase());
