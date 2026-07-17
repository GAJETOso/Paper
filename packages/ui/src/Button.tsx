import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-700",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-forest-600/30 px-6 py-3 text-sm font-semibold text-forest-700 transition hover:bg-forest-50",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:bg-paper-100",
};

export function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button className={styles[variant]} {...rest}>
      {children}
    </button>
  );
}
