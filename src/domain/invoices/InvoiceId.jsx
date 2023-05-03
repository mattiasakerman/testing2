import clsx from "clsx";

export const InvoiceId = ({ children, className }) => {
  return (
    <span
      className={clsx("before:content-['#'] before:text-accent-500", className)}
    >
      {children}
    </span>
  );
};
