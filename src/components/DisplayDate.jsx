import { useMemo } from "react";
import { FALLBACK_LOCALE } from "utils/consts";

export const DisplayDate = ({ date, locale = FALLBACK_LOCALE }) => {
  const dateFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [locale]
  );

  return (
    <span className="before:content-['Due'] flex gap-2">
      <time dateTime={new Date(date).toISOString()}>
        {dateFormat.format(new Date(date))}
      </time>
    </span>
  );
};
