import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { reports } from "@/data/sustainability";

export const metadata = pageMetadata({
  title: "Downloads — Reports, Catalogs, Certificates & Brand Assets",
  description:
    "Download Sylvara product catalogs, technical datasheets, sustainability reports, certificates, and brand assets.",
  path: "/downloads",
});

const groups = [
  {
    heading: "Product catalogs",
    items: [
      { title: "Master Product Catalog 2026", type: "PDF", size: "42 MB" },
      { title: "Food Packaging Line Card", type: "PDF", size: "8.1 MB" },
      { title: "Eco Products & Plastic Replacement Guide", type: "PDF", size: "12.6 MB" },
      { title: "Tissue & Hygiene Range", type: "PDF", size: "6.9 MB" },
      { title: "Education Products Program Guide", type: "PDF", size: "5.4 MB" },
    ],
  },
  {
    heading: "Certificates",
    items: [
      { title: "FSC Chain of Custody Certificate", type: "PDF", size: "0.4 MB" },
      { title: "PEFC Certificate", type: "PDF", size: "0.4 MB" },
      { title: "ISO 9001 / 14001 / 45001 Certificates", type: "ZIP", size: "2.2 MB" },
      { title: "BRCGS Packaging Certificate", type: "PDF", size: "0.5 MB" },
      { title: "Food Contact Declarations of Compliance", type: "ZIP", size: "3.8 MB" },
    ],
  },
  {
    heading: "Sustainability & investor reports",
    items: reports.map((r) => ({ title: r.title, type: r.type, size: r.size })),
  },
  {
    heading: "Brand & media assets",
    items: [
      { title: "Sylvara Brand Guidelines", type: "PDF", size: "14 MB" },
      { title: "Logo Pack (SVG/PNG)", type: "ZIP", size: "3.1 MB" },
      { title: "Mill & Product Photography", type: "ZIP", size: "220 MB" },
      { title: "Executive Headshots", type: "ZIP", size: "48 MB" },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Downloads"
        title="Catalogs, certificates & reports"
        lead="Everything a buyer, auditor, journalist, or investor needs — in one place."
        crumbs={[{ label: "Downloads" }]}
      />
      <section className="container-site py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.heading} delay={gi * 80}>
              <div>
                <h2 className="eyebrow">{g.heading}</h2>
                <ul className="mt-4 space-y-3">
                  {g.items.map((item) => (
                    <li key={item.title}>
                      <a
                        href="/contact"
                        className="card card-hover flex items-center justify-between gap-4 !py-4"
                        aria-label={`Download ${item.title} (${item.type}, ${item.size})`}
                      >
                        <span className="flex items-center gap-3">
                          <span aria-hidden>⬇️</span>
                          <span className="font-medium">{item.title}</span>
                        </span>
                        <span className="shrink-0 text-xs text-ink-500">
                          {item.type} · {item.size}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
