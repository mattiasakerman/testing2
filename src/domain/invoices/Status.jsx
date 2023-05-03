import clsx from "clsx";

const VARIANTS = {
  draft: "text-white, bg-white/10",
  pending: "text-yellow-500 bg-yellow-500/10",
  paid: "text-green-400 bg-green-500/10",
};

const INDICATOR_VARIANTS = {
  draft: "bg-white",
  pending: "bg-yellow-500",
  paid: "bg-green-400",
};

export const Status = ({ status }) => {
  return (
    <span
      className={clsx(
        "inline-flex justify-center py-2 px-4 rounded-md items-center w-32 gap-2",
        VARIANTS[status]
      )}
    >
      <span
        className={clsx(
          "rounded-full w-2 aspect-square",
          INDICATOR_VARIANTS[status]
        )}
      />
      <span className="capitalize">{status}</span>
    </span>
  );
};
