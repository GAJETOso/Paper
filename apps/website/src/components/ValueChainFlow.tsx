"use client";

import { useState } from "react";
import { valueChain, type ChainStage } from "@/data/value-chain";

const phaseColors: Record<ChainStage["phase"], string> = {
  Forest: "bg-forest-600",
  Production: "bg-paper-600",
  Market: "bg-ink-600",
  Circular: "bg-forest-400",
};

/** Interactive 23-stage value chain: click any stage to read its story. */
export function ValueChainFlow() {
  const [selected, setSelected] = useState(0);
  const stage = valueChain[selected] ?? valueChain[0]!;

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Value chain stages"
      >
        {valueChain.map((s, i) => (
          <button
            key={s.name}
            role="tab"
            aria-selected={selected === i}
            onClick={() => setSelected(i)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
              selected === i
                ? `${phaseColors[s.phase]} scale-105 text-white shadow-glass`
                : "border border-paper-200 text-ink-600 hover:border-forest-400 dark:border-ink-800 dark:text-ink-400"
            }`}
          >
            <span className="mr-1 opacity-60">{i + 1}</span> {s.name}
          </button>
        ))}
      </div>
      <div className="card mx-auto mt-8 max-w-2xl text-center" role="tabpanel" aria-live="polite">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${phaseColors[stage.phase]}`}
        >
          {stage.phase} phase · stage {selected + 1} of {valueChain.length}
        </span>
        <h3 className="mt-3 text-2xl font-semibold">{stage.name}</h3>
        <p className="prose-muted mt-3">{stage.desc}</p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            className="btn-secondary !px-4 !py-2"
            onClick={() => setSelected((selected - 1 + valueChain.length) % valueChain.length)}
            aria-label="Previous stage"
          >
            ← Prev
          </button>
          <button
            className="btn-primary !px-4 !py-2"
            onClick={() => setSelected((selected + 1) % valueChain.length)}
            aria-label="Next stage"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
