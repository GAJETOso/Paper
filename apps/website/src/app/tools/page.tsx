import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Calculators } from "@/components/Calculators";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tools — GSM, Box, Carbon & Packaging Calculators",
  description:
    "Free tools from Sylvara: paper GSM and weight calculator, box dimension calculator, carbon savings calculator, and an AI packaging recommendation engine.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Digital tools"
        title="Calculate before you buy"
        lead="Engineering-grade estimators used by our own sales team — free for everyone."
        crumbs={[{ label: "Tools" }]}
      />
      <section className="container-site py-20">
        <Reveal>
          <Calculators />
        </Reveal>
      </section>
      <Cta
        title="Need an exact spec?"
        lead="Send your calculation to our engineers with one click from any quotation form."
      />
    </>
  );
}
