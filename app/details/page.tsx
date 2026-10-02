import type { Metadata } from "next";
import Image from "next/image";

import {
  InquireBand,
  Photo,
  SectionLabel,
  SiteLayout,
} from "@/components/site-layout";
import { PropertyGallery } from "@/components/property-gallery";
import { photos } from "@/lib/property";

export const metadata: Metadata = {
  title: "Property Details | 18334 Hiawatha",
  description:
    "Property details for 18334 Hiawatha Street, a 1958 Palmer & Krisel modern home in Porter Ranch, Los Angeles.",
};

const groups = [
  {
    title: "The residence",
    items: [
      ["Bedrooms", "3"],
      ["Bathrooms", "2"],
      ["Approx. interior", "1,890 sq ft"],
      ["Year built", "1958"],
      ["Architect", "Palmer & Krisel"],
      ["Style", "Mid-century modern"],
    ],
  },
  {
    title: "The grounds",
    items: [
      ["Lot size", "Approx. 11,100 sq ft"],
      ["Pool", "Private heated swimming pool"],
      ["Garden", "Landscaped private garden"],
      ["Outdoor living", "Poolside patio and garden areas"],
    ],
  },
  {
    title: "The studio",
    items: [
      ["Use", "Creative / recording studio"],
      ["Features", "Sound-treated room"],
      ["Recording booth", "Included"],
      ["Skylight", "Natural overhead light"],
    ],
  },
  {
    title: "Location",
    items: [
      ["Address", "18334 Hiawatha Street"],
      ["Neighborhood", "Porter Ranch"],
      ["City", "Los Angeles"],
      ["State", "California"],
      ["ZIP", "91326"],
    ],
  },
] as const;

export default function Details() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="page-opening site-container grid gap-10 pt-36 pb-20 sm:pt-44 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <SectionLabel>03 / Property details</SectionLabel>

          <h1 className="mt-6 font-display text-6xl leading-[0.92] sm:text-8xl">
            The facts, precisely.
          </h1>

          <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
            18334 Hiawatha Street
            <br />
            Porter Ranch, California 91326
          </p>

          <p className="mt-8 font-display text-3xl text-primary">
            $1,595,000
          </p>

          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Offered at
          </p>
        </div>

        <Photo
          src={photos.poolAerial}
          alt="Aerial view of the private swimming pool and property"
          eager
          className="aspect-6/5 md:col-span-7 md:translate-y-12"
        />
      </section>

      {/* Statistics */}
      <section className="border-y border-border bg-secondary py-12 sm:py-16">
        <div className="site-container grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["3", "Bedrooms"],
            ["2", "Bathrooms"],
            ["1,890", "Approx. sq. ft."],
            ["1958", "Year built"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-3xl">{value}</p>

              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Floor Plan */}
      <section className="border-b border-border bg-background py-20 sm:py-28">
        <div className="site-container">
          <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Floor plan</SectionLabel>

              <h2 className="mt-4 font-display text-4xl leading-[0.95] sm:text-6xl">
                The plan, <em>in detail.</em>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A measured floor plan showing the residence, swimming pool,
              patios, gardens, and garage.
            </p>
          </div>

          <div className="overflow-hidden border border-border bg-white">
            <Image
              src={photos.floorPlan}
              alt="Floor plan of 18334 Hiawatha Street showing the residence, swimming pool, patios, gardens, and garage"
              width={2048}
              height={1536}
              className="h-auto w-full"
              sizes="(max-width: 640px) 92vw, 90vw"
              priority
            />
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            First-floor plan · 18334 Hiawatha Street
          </p>
        </div>
      </section>

      {/* Property Overview */}
      <section className="site-container py-24 sm:py-32">
        <div className="mb-12">
          <SectionLabel>Property overview</SectionLabel>

          <h2 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl">
            At a glance.
          </h2>
        </div>

        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="border-b border-foreground pb-4 font-display text-2xl">
                {group.title}
              </h3>

              <dl className="divide-y divide-border">
                {group.items.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(90px,38%)_1fr] gap-4 py-4 text-sm leading-relaxed"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-16 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
          All information is deemed reliable but not guaranteed and should be
          independently verified.
        </p>
      </section>

      {/* Property Gallery */}
      <PropertyGallery />

      {/* Inquiry */}
      <InquireBand />
    </SiteLayout>
  );
}