import clsx from "clsx";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 48 24"
      {...props}
      className={clsx("h-4 w-auto fill-black dark:fill-white", props.className)}
    >
      <text
        x="0"
        y="19"
        fontFamily="Georgia, Times New Roman, serif"
        fontSize="22"
        fontWeight="400"
        letterSpacing="-0.5"
      >
        GP
      </text>
    </svg>
  );
}
