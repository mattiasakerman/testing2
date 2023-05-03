export const Optional = ({ value, children, fallback = "-" }) => {
  return value ? children : fallback;
};
