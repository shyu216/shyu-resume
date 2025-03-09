import Link from "next/link";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-mygray-600 font-semibold text-mygray-100 hover:bg-mygray-700 active:bg-mygray-600 active:text-mygray-100/70 dark:bg-mygray-700 dark:hover:bg-mygray-600 dark:active:bg-mygray-700 dark:active:text-mygray-100/70",
  secondary:
    "bg-mygray-100 font-medium text-mygray-900 hover:bg-mygray-200 active:bg-mygray-200 active:text-mygray-900/60 dark:bg-mygray-600/50 dark:text-mygray-300 dark:hover:bg-mygray-600 dark:hover:text-mygray-50 dark:active:bg-mygray-600/50 dark:active:text-mygray-50/70",
};

type ButtonProps = {
  variant?: keyof typeof variantStyles;
} & (
  | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
);

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  className = cn(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    variantStyles[variant],
    className
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
}
