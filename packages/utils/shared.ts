export const popupSharedProps = {
  show: Boolean,
  // z-index
  zIndex: [Number, String],
};

export type PopupSharedPropKeys = Array<keyof typeof popupSharedProps>;

export const popupSharedPropKeys = Object.keys(
  popupSharedProps
) as PopupSharedPropKeys;
