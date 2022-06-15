const size = {
  xs: "320px",
  sm: "768px",
  lg: "1200px",
};

export const device: {
    xs: string,
    sm: string,
    lg: string,
} = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  lg: `(max-width: ${size.lg})`,
};