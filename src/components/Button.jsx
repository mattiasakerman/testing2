import clsx from "clsx";

const ButtonVariants = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  destructive: "destructive",
};

const VARIANT_STYLES = {
  [ButtonVariants.primary]: "bg-primary-500 hover:bg-primary-300 text-white",
  [ButtonVariants.secondary]: "bg-secondary-500 hover:bg-accent-700 text-white",
  [ButtonVariants.tertiary]:
    "bg-accent-300 hover:bg-accent-700 text-accent-950",
  [ButtonVariants.destructive]: "bg-error-500 hover:bg-error-300 text-white",
};

export const Button = ({
  type = "button",
  variant = ButtonVariants.primary,
  icon,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 py-2 px-2 rounded-full",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {icon && (
        <span className="flex justify-center p-2 items-center rounded-full bg-white">
          {icon}
        </span>
      )}
      <span className="px-2">{children}</span>
    </button>
  );
};

Button.Variants = ButtonVariants;
