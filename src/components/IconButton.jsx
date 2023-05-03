import clsx from "clsx";

export const IconButton = ({ type = "button", icon, onClick, disabled }) => {
  return (
    <button
      type={type}
      className={clsx(
        "p-2 rounded-full transition-colors",
        disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-secondary-500"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};
