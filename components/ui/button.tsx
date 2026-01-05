import Link from "next/link";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-stone-700 font-semibold text-stone-100 hover:bg-stone-700 active:bg-stone-700 active:text-stone-100/70 dark:bg-stone-700 dark:hover:bg-stone-700 dark:active:bg-stone-700 dark:active:text-stone-100/70",
  secondary:
    "bg-stone-100 font-medium text-stone-900 hover:bg-stone-200 active:bg-stone-200 active:text-stone-900/60 dark:bg-stone-700/50 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-stone-50 dark:active:bg-stone-700/50 dark:active:text-stone-50/70",
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
