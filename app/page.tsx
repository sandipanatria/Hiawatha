import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  InquireBand,
  Photo,
  SectionLabel,
  SiteLayout,
  TextLink,
} from "@/components/site-layout";

import { PropertyGallery } from "@/components/property-gallery";
import { photos } from "@/lib/property";

export const metadata: Metadata = {
  title: "18334 Hiawatha | A Palmer & Krisel Modern",
  description:
    "Explore 18334 Hiawatha Street, a 1958 Palmer & Krisel modern home in Porter Ranch with a private pool and creative studio.",
};

export default function Home() {
  return (
    <SiteLayout>
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="home-hero relative flex min-h-[78svh] flex-col justify-end overflow-hidden bg-foreground text-primary-foreground sm:min-h-[82svh]">
        <Image
          src={photos.hero}
          alt="Sunlit living room at 18334 Hiawatha opening to the garden"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />

        <div className="hero-shade absolute inset-0" />

        <div className="site-container relative z-10 pb-12 pt-36 sm:pb-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.2em]">
                Porter Ranch · Los Angeles · 1958
              </p>

              <h1 className="hero-title mt-5 font-display text-[clamp(4.1rem,10vw,10rem)] leading-[0.82]">
                18334
                <br />
                <em>Hiawatha.</em>
              </h1>

              <p className="mt-6 max-w-lg text-base sm:text-lg">
                A Palmer & Krisel modern, kept whole.
              </p>
            </div>

            <a
              href="#collection"
              className="hero-scroll hidden shrink-0 items-center gap-3 text-xs uppercase tracking-[0.16em] sm:flex"
            >
              Explore the home
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION / BUILT FOR LIVING
      ========================================================== */}

      <section
        id="collection"
        className="gallery-intro site-container scroll-mt-19 py-20 sm:py-28"
      >
        <div className="gallery-grid grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Primary image */}

          <div className="gallery-primary relative lg:col-span-7">
            <Photo
              src={photos.front}
              alt="Street-facing entrance and roofline of 18334 Hiawatha"
              eager
              className="is-visible aspect-4/3 lg:aspect-5/4"
            />

            <div className="gallery-plaque">
              <span className="eyebrow">
                01 / An architectural original
              </span>

              <p className="mt-2 font-display text-3xl italic sm:text-4xl">
                A house with a story to tell.
              </p>
            </div>
          </div>

          {/* Text */}

          <div className="gallery-identity lg:col-span-5 lg:pl-8">
            <SectionLabel>
              The residence / 1958
            </SectionLabel>

            <h2 className="mt-7 font-display text-6xl leading-[0.86] sm:text-7xl xl:text-8xl">
              Built for <em>living.</em>
            </h2>

            <div className="mt-9 h-px w-28 bg-foreground" />

            <p className="mt-8 max-w-sm leading-relaxed text-muted-foreground">
              Morning light across the living room. A table beside the garden.
              Space to gather, and room to retreat. At Hiawatha, everyday
              moments unfold in a home that feels warm, open and connected to
              its surroundings.
            </p>

            <p className="mt-7 font-display text-4xl">
              $1,595,000
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Offered at
            </p>

            <div className="mt-9">
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
            </div>
          </div>

          {/* Portrait */}

          <div className="gallery-portrait lg:col-span-4 lg:-mt-20">
            <Photo
              src={photos.living}
              alt="Living room with exposed beams and glass"
              className="aspect-3/4 border-12 border-card shadow-xl"
            />

            <span className="mt-3 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Exhibit A / The living room
            </span>
          </div>

          {/* Facts */}

          <div className="gallery-facts grid grid-cols-2 gap-x-8 gap-y-7 self-center lg:col-span-3 lg:-mt-16 lg:grid-cols-1 lg:pl-8">
            <div>
              <span className="eyebrow">Interior</span>

              <p className="mt-1 font-display text-3xl">
                1,890 <span className="text-lg">sq ft</span>
              </p>
            </div>

            <div>
              <span className="eyebrow">Grounds</span>

              <p className="mt-1 font-display text-3xl">
                11,100 <span className="text-lg">sq ft</span>
              </p>
            </div>

            <div>
              <span className="eyebrow">Residence</span>

              <p className="mt-1 font-display text-3xl">
                3 bed / 2 bath
              </p>
            </div>

            <TextLink href="/details">
              View all details
            </TextLink>
          </div>

          {/* Landscape */}

          <div className="gallery-landscape lg:col-span-5">
            <Photo
              src={photos.poolPatio}
              alt="Outdoor living area beside the private pool"
              className="aspect-5/3 shadow-xl"
            />

            <p className="mt-5 border-l border-border pl-5 font-display text-xl italic text-muted-foreground">
              Light, landscape, and life in between.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          OPEN HOUSES
      ========================================================== */}

      <section className="border-y border-border bg-foreground py-14 text-primary-foreground sm:py-16">
        <div className="site-container">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
                Request a viewing
              </p>

              <h2 className="mt-4 max-w-md font-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
                Come to the Upcoming Open Houses:
              </h2>
            </div>

            <div className="md:col-span-7">
              <div className="grid gap-px overflow-hidden border border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-3">
                <div className="bg-foreground p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] opacity-60">
                    Saturday
                  </p>

                  <p className="mt-3 font-display text-3xl">
                    10/10
                  </p>

                  <p className="mt-2 text-sm uppercase tracking-[0.12em]">
                    1–4 PM
                  </p>
                </div>

                <div className="bg-foreground p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] opacity-60">
                    Sunday
                  </p>

                  <p className="mt-3 font-display text-3xl">
                    10/11
                  </p>

                  <p className="mt-2 text-sm uppercase tracking-[0.12em]">
                    1–4 PM
                  </p>
                </div>

                <div className="bg-foreground p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] opacity-60">
                    Tuesday
                  </p>

                  <p className="mt-3 font-display text-3xl">
                    10/13
                  </p>

                  <p className="mt-2 text-sm uppercase tracking-[0.12em]">
                    11 AM–2 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROVENANCE
      ========================================================== */}

      <section className="chapter-band border-y border-border bg-secondary py-24 sm:py-32">
        <div className="site-container">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>
                01 / The architecture
              </SectionLabel>

              <h2 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.98] sm:text-7xl">
                Provenance, <em>preserved.</em>
              </h2>
            </div>

            <p className="max-w-sm leading-relaxed text-muted-foreground">
              Designed by Dan Palmer and William Krisel, AIA, and built in
              1958, Hiawatha belongs to the Living-Conditioned Homes
              neighborhood—a vision of modern living shaped around space,
              light, sound and safety. Here, that vision comes to life through
              clerestory windows, exposed beams and expansive glass that draws
              the garden into everyday life. Thoughtful updates carry the home
              into the present while preserving its distinctive architectural
              character.
            </p>
          </div>

          <div className="chapter-gallery grid gap-5 md:grid-cols-12">
            <Photo
              src={photos.exterior}
              alt="Street-facing exterior of 18334 Hiawatha"
              className="aspect-4/5 md:col-span-4"
            />

            <Photo
              src={photos.exteriorAlt}
              alt="Mid-century exterior and private pool"
              className="aspect-4/5 md:col-span-5 md:mt-20"
            />

            <div className="flex items-end md:col-span-3 md:pb-9">
              <TextLink href="/architecture">
                Explore the architecture
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          A LIFE IN THE LIGHT
      ========================================================== */}

      <section className="site-container py-24 sm:py-32">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>
              02 / Inside & outside
            </SectionLabel>

            <h2 className="mt-5 font-display text-5xl sm:text-7xl">
              A life in <em>the light.</em>
            </h2>
          </div>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Open the glass doors and let the day move outdoors—from coffee
            beside the garden to lunch on the patio and an afternoon swim.
            Mature planting surrounds places to gather or pause, with the
            outdoor fireplace inviting the evening to linger.
          </p>
        </div>

        <div className="inside-gallery grid gap-5 md:grid-cols-12">
          <Photo
            src={photos.livingAlt}
            alt="Open living area with garden views"
            className="aspect-4/5 md:col-span-4"
          />

          <Photo
            src={photos.poolPatioAlt}
            alt="Outdoor dining beside the pool"
            className="aspect-4/5 md:col-span-4 md:mt-20"
          />

          <Photo
            src={photos.pool}
            alt="Private swimming pool surrounded by palms"
            className="aspect-4/5 md:col-span-4 md:mt-40"
          />
        </div>
      </section>

      {/* =========================================================
          STUDIO
      ========================================================== */}

      <section className="chapter-band border-y border-border bg-secondary py-24 sm:py-32">
        <div className="site-container">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="grid gap-5 sm:grid-cols-2 md:col-span-7">
              <Photo
                src={photos.studioMain}
                alt="Creative studio converted from the former garage at 18334 Hiawatha"
                className="aspect-4/5"
              />

              <Photo
                src={photos.studioRoom}
                alt="Interior of the Hiawatha creative studio"
                className="aspect-4/5 sm:mt-12"
              />
            </div>

            <div className="md:col-span-5 md:pl-10">
              <SectionLabel>
                03 / The studio
              </SectionLabel>

              <h2 className="mt-5 font-display text-5xl leading-[0.98] sm:text-7xl">
                A room made for <em>sound.</em>
              </h2>

              <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
                The former garage became a sound-treated creative studio with
                a skylight, recording booth, and space to make things.
              </p>

              <div className="mt-9">
                <TextLink href="/studio">
                  Discover the studio
                </TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FULL GALLERY
      ========================================================== */}

      <PropertyGallery />

      {/* =========================================================
          INQUIRY
      ========================================================== */}

      <InquireBand />
    </SiteLayout>
  );
}