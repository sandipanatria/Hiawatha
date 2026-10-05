import type { Metadata } from "next";

import {
  InquireBand,
  Photo,
  SectionLabel,
  SiteLayout,
  TextLink,
} from "@/components/site-layout";

import { photos } from "@/lib/property";

export const metadata: Metadata = {
  title: "The Architecture | 18334 Hiawatha",
  description:
    "Discover the 1958 Palmer & Krisel architecture, butterfly roofline, and Living-Conditioned Homes history at 18334 Hiawatha.",
};

export default function Architecture() {
  return (
    <SiteLayout>
      {/* =========================================================
          ARCHITECTURE HERO
      ========================================================== */}

      <section className="page-opening site-container grid gap-10 pt-36 pb-20 sm:pt-44 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <SectionLabel>
            01 / The Architecture
          </SectionLabel>

          <h1 className="mt-6 max-w-[12ch] font-display text-6xl leading-[0.92] sm:text-8xl">
            Built for living, not just looking.
          </h1>

          <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
            In 1958, Dan Palmer and William Krisel, AIA, brought a new kind of
            modernism to the San Fernando Valley. This home remains part of that
            story.
          </p>
        </div>

        <Photo
          src={photos.front}
          alt="Original butterfly roofline and street-facing entrance of 18334 Hiawatha"
          eager
          className="aspect-6/5 md:col-span-7 md:translate-y-12"
        />
      </section>

      {/* =========================================================
          LIVING-CONDITIONED HOMES
      ========================================================== */}

      <section className="border-y border-border bg-secondary py-24 sm:py-32">
        <div className="site-container grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>
              Living-Conditioned Homes
            </SectionLabel>

            <h2 className="mt-5 font-display text-5xl leading-[0.98] sm:text-6xl">
              A modern idea with a human heart.
            </h2>
          </div>

          <div className="space-y-5 leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
            <p>
              In the late 1950s, Palmer and Krisel set out to bring modernism
              out of the museum and into daily life. They called the result
              Living-Conditioned Homes: houses meant not simply to be admired,
              but inhabited.
            </p>

            <p>
              Built from five basic plans, the neighborhood was varied in
              orientation, setback, and finish. The effect is harmonious
              without repetition. This residence still wears the tract&apos;s
              defining butterfly roofline.
            </p>

            <p>
              Walls of glass soften the boundary between home and garden;
              exposed beams and clerestory light give everyday rooms a quiet
              drama.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          ARCHITECTURAL PROVENANCE
      ========================================================== */}

      <section className="site-container py-24 sm:py-32">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>
              Architectural provenance
            </SectionLabel>

            <h2 className="mt-4 font-display text-5xl sm:text-7xl">
              The details that endure.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Post-and-beam structure, original proportions, and an unmistakably
            Californian relationship to the outdoors.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          <Photo
            src={photos.exterior}
            alt="Street-facing exterior of 18334 Hiawatha"
            className="aspect-4/5 md:col-span-4"
          />

          <Photo
            src={photos.exteriorAlt}
            alt="Mid-century exterior and private pool"
            className="aspect-4/5 md:col-span-4 md:mt-20"
          />

          <Photo
            src={photos.entrance}
            alt="Original architectural entry at 18334 Hiawatha"
            className="aspect-4/5 md:col-span-4 md:mt-40"
          />
        </div>

        <div className="mt-8">
          <TextLink href="/details">
            View property details
          </TextLink>
        </div>
      </section>

      {/* =========================================================
          ORIGINAL VISION / AI RENDERING
      ========================================================== */}

      <section className="bg-secondary py-24 sm:py-32">
        <div className="site-container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Photo
              src={photos.architects}
              alt="Contemporary rendering inspired by the original Palmer and Krisel architectural character of 18334 Hiawatha"
              className="aspect-4/3"
            />

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Contemporary, AI-generated illustration inspired by the home&apos;s
              original design. Not an archival image or original Palmer & Krisel
              drawing.
            </p>
          </div>

          <div className="md:pl-10">
            <SectionLabel>
              Palmer & Krisel
            </SectionLabel>

            <h2 className="mt-5 font-display text-5xl sm:text-6xl">
              The original vision, reimagined.
            </h2>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              An expressive roofline, clerestory glass and textured stone give
              Hiawatha its distinctive presence. This contemporary rendering
              evokes the home&apos;s original architectural character,
              illustrating how light, proportion and natural materials come
              together in Palmer & Krisel&apos;s vision for everyday living.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INQUIRY
      ========================================================== */}

      <InquireBand />
    </SiteLayout>
  );
}