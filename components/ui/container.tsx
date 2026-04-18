import { forwardRef } from "react";
import clsx from "clsx";

type ContainerOuterProps = React.ComponentPropsWithoutRef<"div"> & {
  disableGutter?: boolean;
};

type ContainerInnerProps = React.ComponentPropsWithoutRef<"div"> & {
  disableGutter?: boolean;
};

type ContainerProps = React.ComponentPropsWithoutRef<typeof ContainerOuter> & {
  disableGutter?: boolean;
};

export const ContainerOuter = forwardRef<
  React.ElementRef<"div">,
  ContainerOuterProps
>(function OuterContainer({ className, children, disableGutter, ...props }, ref) {
  return (
    <div ref={ref} className={clsx(!disableGutter && "sm:px-8", className)} {...props}>
      <div className={clsx("mx-auto w-full max-w-7xl", !disableGutter && "lg:px-8")}>{children}</div>
    </div>
  );
});

export const ContainerInner = forwardRef<
  React.ElementRef<"div">,
  ContainerInnerProps
>(function InnerContainer({ className, children, disableGutter, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx("relative", !disableGutter && "px-4 sm:px-8 lg:px-12", className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
});

export const Container = forwardRef<
  React.ElementRef<typeof ContainerOuter>,
  ContainerProps
>(function Container({ children, disableGutter, ...props }, ref) {
  return (
    <ContainerOuter ref={ref} disableGutter={disableGutter} {...props}>
      <ContainerInner disableGutter={disableGutter}>{children}</ContainerInner>
    </ContainerOuter>
  );
});
