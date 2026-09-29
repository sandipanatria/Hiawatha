import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  InquireBand,
  Photo,
  SectionLabel,
  SiteLayout,
  TextLink,
} from "@/components/site-layout";

import { photos } from "@/lib/property";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "18334 Hiawatha | A Palmer & Krisel Modern",
  description:
    "Explore 18334 Hiawatha Street, a 1958 Palmer & Krisel modern home in Porter Ranch with a private pool and creative studio.",
};

function Home() {
  return (
    <SiteLayout>
      {/* =========================================================
          FULL SCREEN HERO
      ========================================================= */}
      <section className="relative h-[100svh] min-h-[700px] w-full overflow-hidden">
        {/* =====================================================
            HERO IMAGE

            IMPORTANT:
            Use direct <img> here instead of Photo.
        ===================================================== */}
        <img
          src={photos.hero}
          alt="Sunlit living room at 18334 Hiawatha with glass doors opening to the garden"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />

        {/* =====================================================
            IMAGE OVERLAY
        ===================================================== */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}
        <div className="relative z-10 flex h-full items-end">
          <div className="site-container w-full pb-24 pt-40 sm:pb-28 lg:pb-32">
            <div className="max-w-3xl text-white">
              {/* Location */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-200 sm:text-xs">
                Porter Ranch · Los Angeles
              </p>

              {/* Title */}
              <h1
                className="
                  mt-5
                  max-w-[10ch]
                  font-display
                  text-6xl
                  leading-[0.9]
                  tracking-tight
                  sm:text-7xl
                  md:text-8xl
                  lg:text-[8rem]
                  xl:text-[9rem]
                "
              >
                18334
                <br />
                Hiawatha.
              </h1>

              {/* Subtitle */}
              <p
                className="
                  mt-6
                  font-display
                  text-xl
                  italic
                  text-white/95
                  sm:text-2xl
                  md:text-3xl
                "
              >
                A 1958 modern, kept whole.
              </p>

              {/* Description */}
              <p
                className="
                  mt-6
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-white/85
                  sm:text-base
                  md:text-lg
                "
              >
                A rare Palmer & Krisel residence where walls of glass,
                sunlit rooms, and a private garden make modernism a way
                of living.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="editorial"
                  size="lg"
                  className="hover-lift"
                >
                  <a href="#inquire">
                    Request a viewing
                    <ArrowRight />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="editorialOutline"
                  size="lg"
                  className="
                    hover-lift
                    border-white/60
                    bg-white/10
                    text-white
                    backdrop-blur-md
                    hover:bg-white
                    hover:text-foreground
                  "
                >
                  <Link href="/architecture">
                    The architecture
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PRICE CARD
        ===================================================== */}
        <div
          className="
            absolute
            bottom-8
            right-6
            z-20
            rounded-md
            border
            border-white/40
            bg-white/90
            px-5
            py-4
            shadow-xl
            backdrop-blur-xl
            sm:bottom-10
            sm:right-10
            sm:px-6
            sm:py-5
            lg:bottom-12
            lg:right-12
          "
        >
          <p className="font-display text-2xl text-foreground sm:text-3xl">
            $1,595,000
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Offered at
          </p>
        </div>
      </section>

      {/* =========================================================
          PROPERTY FACTS
      ========================================================= */}
      <section className="site-container py-0">
        <div
          className="
            grid
            grid-cols-2
            overflow-hidden
            rounded-md
            border
            border-border
            bg-border/60
            sm:grid-cols-4
          "
        >
          {[
            ["3", "Bedrooms"],
            ["2", "Bathrooms"],
            ["1,890", "Approx. sq. ft. interior"],
            ["11,100", "Approx. sq. ft. lot"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="
                fact-cell
                border-r
                border-b
                border-border
                bg-card/70
                px-5
                py-5
                last:border-r-0
                sm:border-b-0
                sm:px-6
                sm:py-6
              "
            >
              <p className="font-display text-3xl sm:text-4xl">
                {value}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          ARCHITECTURE
      ========================================================= */}
      <section className="site-container grid gap-10 py-24 md:grid-cols-12 md:gap-8 lg:py-32">
        <div className="md:col-span-4">
          <SectionLabel>The Architecture</SectionLabel>

          <h2 className="mt-5 max-w-[12ch] font-display text-4xl leading-tight sm:text-5xl">
            Provenance, preserved.
          </h2>

          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            Designed by Dan Palmer and William Krisel in 1958, this
            home belongs to the Living-Conditioned Homes enclave —
            an enduring vision of California life.
          </p>

          <div className="mt-8">
            <TextLink href="/architecture">
              Explore the architecture
            </TextLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-8">
          <Photo
            src={photos.architects}
            alt="Archival photograph of architects Dan Palmer and William Krisel"
            className="aspect-[4/5]"
          />

          <Photo
            src={photos.front}
            alt="Street-facing exterior of the Palmer and Krisel home"
            className="aspect-[4/5]"
          />
        </div>
      </section>

      {/* =========================================================
          INSIDE / OUTSIDE
      ========================================================= */}
      <section className="border-y border-border bg-secondary/60 py-24 lg:py-32">
        <div className="site-container">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Inside / outside</SectionLabel>

              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                A life in the light.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              From open living spaces to a private pool and garden,
              the architecture lets everyday life flow beyond the
              walls.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Photo
              src={photos.hall}
              alt="Sunlit hallway and open interior of the home"
              className="aspect-[4/5]"
            />

            <Photo
              src={photos.garden}
              alt="Landscaped poolside garden and private outdoor space"
              className="aspect-[4/5]"
            />

            <Photo
              src={photos.pool}
              alt="Heated pool and patio framed by mature landscaping"
              className="aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          STUDIO
      ========================================================= */}
      <section className="bg-secondary/60 py-24 lg:py-32">
        <div className="site-container grid gap-10 md:grid-cols-12 md:items-center">
          <Photo
            src={photos.studioMain}
            alt="Light-filled creative studio with instruments and work space"
            className="aspect-[7/5] md:col-span-7"
          />

          <div className="md:col-span-5 md:pl-8">
            <SectionLabel>The Studio</SectionLabel>

            <h2 className="mt-5 max-w-[12ch] font-display text-4xl leading-tight sm:text-5xl">
              A room made for sound.
            </h2>

            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              The former garage became a sound-treated creative studio
              with a skylight, recording booth, and space to make
              things.
            </p>

            <div className="mt-8">
              <TextLink href="/studio">
                Discover the studio
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DETAILS
      ========================================================= */}
      <section className="site-container grid gap-12 py-24 md:grid-cols-12 lg:py-32">
        <div className="md:col-span-5">
          <SectionLabel>The Details</SectionLabel>

          <h2 className="mt-5 font-display text-4xl sm:text-5xl">
            The facts, precisely.
          </h2>

          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            A considered restoration, a generous lot, and room for
            what comes next.
          </p>

          <div className="mt-8">
            <TextLink href="/details">
              View all details
            </TextLink>
          </div>
        </div>

        <div className="md:col-span-7">
          <dl className="divide-y divide-border border-y border-border">
            {[
              ["Address", "18334 Hiawatha Street"],
              ["Year built", "1958"],
              ["Renovated", "2022"],
              ["Outdoor living", "Private heated pool & spa"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="
                  fact-row
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-2
                  py-5
                  text-sm
                "
              >
                <dt className="text-muted-foreground">
                  {label}
                </dt>

                <dd className="font-medium">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* =========================================================
          ENQUIRY
      ========================================================= */}
      <InquireBand />
    </SiteLayout>
  );
}

export default Home;