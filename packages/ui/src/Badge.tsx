import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "forest",
}: {
  children: ReactNode;
  tone?: "forest" | "paper" | "ink";
}) {
  const tones = {
    forest: "bg-forest-100 text-forest-700",
    paper: "bg-paper-100 text-paper-800",
    ink: "bg-ink-100 text-ink-700",
  } as const;
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
