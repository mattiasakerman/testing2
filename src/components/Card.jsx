import clsx from "clsx";

export const Card = ({ className, children }) => {
  return (
    <div className={clsx("rounded-lg bg-secondary-700 p-8", className)}>
      {children}
    </div>
  );
};
