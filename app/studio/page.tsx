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
  title: "The Studio",
  description:
    "Explore the sound-treated creative studio, skylight, and built-in recording booth at 18334 Hiawatha.",
};

export default function Studio() {
  return (
    <SiteLayout>
      {/* =========================================================
          STUDIO HERO
      ========================================================== */}

      <section className="page-opening site-container grid gap-10 pt-36 pb-20 sm:pt-44 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <SectionLabel>
            02 / The Studio
          </SectionLabel>

          <h1 className="mt-6 max-w-[12ch] font-display text-6xl leading-[0.92] sm:text-8xl">
            A space to make things.
          </h1>

          <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
            A creative retreat tucked into an architectural home. Built for
            focus, finished for sound, and flooded with California light.
          </p>
        </div>

        <Photo
          src={photos.studioMain}
          alt="Creative studio converted from the former garage at 18334 Hiawatha"
          eager
          className="aspect-6/5 md:col-span-7 md:translate-y-12"
        />
      </section>

      {/* =========================================================
          FORMER GARAGE
      ========================================================== */}

      <section className="border-y border-border bg-secondary py-24 sm:py-32">
        <div className="site-container grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>
              A quiet surprise
            </SectionLabel>

            <h2 className="mt-5 font-display text-5xl leading-[0.98] sm:text-6xl">
              The former garage, reimagined.
            </h2>
          </div>

          <div className="space-y-5 leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
            <p>
              Where an unfinished garage once stood, there is now a
              sound-treated studio with exposed wood beams, a skylight, and a
              built-in recording booth.
            </p>

            <p>
              With its own AC unit and a sense of separation from the rest of
              the house, it is a place for musicians, filmmakers, podcasters,
              writers, editors, and anyone who works best with room to think.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          STUDIO IMAGE COLLECTION
      ========================================================== */}

      <section className="site-container py-24 sm:py-32">
        <div className="mb-10">
          <SectionLabel>
            Inside the studio
          </SectionLabel>

          <h2 className="mt-4 font-display text-5xl sm:text-7xl">
            Room to create.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Photo
            src={photos.studioRoom}
            alt="Creative studio interior with natural light and workspace"
            className="aspect-4/3"
          />

          <Photo
            src={photos.studioBooth}
            alt="Sound-treated recording booth inside the Hiawatha studio"
            className="aspect-4/3 md:mt-20"
          />
        </div>

        <div className="mt-8">
          <TextLink href="/details">
            View property details
          </TextLink>
        </div>
      </section>

      {/* =========================================================
          BEYOND THE STUDIO
      ========================================================== */}

      <section className="bg-secondary py-24 sm:py-32">
        <div className="site-container grid gap-10 md:grid-cols-2 md:items-center">
          <Photo
            src={photos.poolPatio}
            alt="Outdoor living area beside the private pool"
            className="aspect-4/3"
          />

          <div className="md:pl-10">
            <SectionLabel>
              Beyond the studio
            </SectionLabel>

            <h2 className="mt-5 font-display text-5xl">
              Space for every rhythm.
            </h2>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              The home moves from focused creative work to open living and a
              private garden with a heated pool and spa. Different spaces, one
              seamless way of life.
            </p>

            <div className="mt-8">
              <TextLink href="/">
                Explore the home
              </TextLink>
            </div>
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