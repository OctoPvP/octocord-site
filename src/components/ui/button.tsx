"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  disableLoadingText?: boolean;
  loadingText?: string;
  onClickLoading?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<unknown>;
  loadingStateChange?: (loading: boolean) => void;
  toggle?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  tooltip?: React.ReactNode;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loadingText = "Loading...",
      ...props
    },
    ref,
  ) => {
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => setLoading(props.loading ?? false), [props.loading]);
    React.useEffect(
      () => props.loadingStateChange?.(loading),
      [loading, props],
    );

    // get the typeof the html button component

    const Comp = asChild ? Slot : (props.href ? "a" : "button");
    const disabled = props.disabled ?? loading;
    const children = loading ? ( // TODO: fix the width changing
      <div className={"flex flex-row items-center gap-1"}>
        <Spinner /> {!props.disableLoadingText && <span>{loadingText}</span>}
      </div>
    ) : (
      props.children
    );
    const onClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (props.onClickLoading) {
        setLoading(true);
        const promise = props.onClickLoading(event);
        if (promise instanceof Promise) {
          // sanity check
          void promise.finally(() => setLoading(false));
        }
      } else if (props.onClick) {
        props.onClick(event);
      } else if (props.toggle) {
        props.toggle[1]((prev) => !prev);
      }
    };

    const stopComplaining = { ref, onClick };
    const actualComponent = (
      <Comp
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        // fuck it
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...stopComplaining as unknown as any}
      >
        {children}
      </Comp>
    );

    if (props.tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{actualComponent}</TooltipTrigger>
            <TooltipContent>{props.tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return actualComponent;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };