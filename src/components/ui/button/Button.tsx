import * as React from "react";
import Link from "next/link";
import {VariantProps, cva} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-1",
        "font-medium",
        "transition-all",
        "border",
        "hover:gap-4",
        "disabled:bg-[#DFDEDE]",
        "disabled:border-[#DFDEDE]",
        "disabled:text-[#999999]",
        "disabled:cursor-not-allowed",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "hover:bg-transparent",
                ],
                secondary: [
                    "bg-transparent",
                ],
                tertiary: [
                    "border-0"
                ]
            },
            colors: {
                gold: [
                    "border-primary",
                ],
                white: [
                    "border-secondary",
                ],
                darkGold: [
                    "border-[#86752D]"
                ]
            },
            size: {
                default: "py-[12px] px-[16px] text-sm md:text-lg",
                md: "py-[8px] px-[12px] text-sm md:text-md",
                lg: "py-[12px] px-[16px] text-sm md:text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            colors: "gold",
            size: "default",
        },
        compoundVariants: [
            {
                variant: "primary",
                colors: "gold",
                className: `bg-primary hover:text-primary`,
            },
            {
                variant: "primary",
                colors: "white",
                className: `bg-white text-zinc-900 hover:text-secondary`,
            },
            {
                variant: "secondary",
                colors: "gold",
                className: `text-primary hover:bg-primary hover:text-secondary`,
            },
            {
                variant: "secondary",
                colors: "white",
                className: `text-white hover:bg-white hover:text-zinc-900`,
            },
            {
                variant: "tertiary",
                colors: "gold",
                className: "text-primary"
            },
            {
                variant: "tertiary",
                colors: "white",
                className: "text-white"
            },
            {
                variant: "tertiary",
                colors: "darkGold",
                className: "text-[#86752D]"
            },
            {
                variant: "primary",
                colors: "darkGold",
                className: "text-white bg-[#86752D] hover:text-[#86752D]"
            },
            {
                variant: "secondary",
                colors: "darkGold",
                className: "text-[#86752D] hover:text-white hover:bg-[#86752D]"
            }
        ],
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    href?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, children, href, variant, colors, size, leftIcon, rightIcon, iconClassName, ...props}, ref) => {
        const content = (
            <>
                {leftIcon && <span className={cn("inline-flex", iconClassName)}>{leftIcon}</span>}
                {children}
                {rightIcon && <span className={cn("inline-flex", iconClassName)}>{rightIcon}</span>}
            </>
        );

        if (href) {
            return (
                <Link
                    href={href}
                    className={cn(buttonVariants({variant, colors, size, className}))}
                >
                    {content}
                </Link>
            );
        }
        return (
            <button
                className={cn(buttonVariants({variant, colors, size, className}))}
                ref={ref}
                {...props}
            >
                {content}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;