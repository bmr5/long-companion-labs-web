import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute inset-x-0 bottom-0 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      {/* Scrim overlay for guaranteed text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative px-3 pb-3 pt-8 sm:px-4 sm:pb-4 sm:pt-12">
        <h3 className="line-clamp-2 font-serif text-sm leading-tight text-white drop-shadow-sm sm:text-base lg:text-lg">
          {title}
        </h3>
        <Price
          className="mt-1 text-xs text-white/80 sm:text-sm"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
