const size = {
  xs: "320px",
  sm: "768px",
  lg: "1200px",
};

export const device: {
    mobile: string,
    ipad: string,
} = {
  mobile: `(max-width: ${size.sm})`,
  ipad: `(max-width: ${size.lg})`,
};