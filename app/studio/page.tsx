import { InquireBand, Photo, SectionLabel, SiteLayout, TextLink } from "@/components/site-layout";
import { photos } from "@/lib/property";
import type { Metadata } from "next";
export const metadata: Metadata = { title:"The Studio | 18334 Hiawatha", description:"Explore the sound-treated creative studio, skylight, and built-in recording booth at 18334 Hiawatha." };


function Studio() {
  return <SiteLayout>
    <section className="site-container grid gap-10 pt-36 pb-18 sm:pt-44 md:grid-cols-12 md:items-center"><div className="md:col-span-5"><SectionLabel>02 / The Studio</SectionLabel><h1 className="mt-6 max-w-[12ch] font-display text-5xl leading-[1.07] sm:text-6xl">A space to make things.</h1><p className="mt-7 max-w-md leading-relaxed text-muted-foreground">A creative retreat tucked into an architectural home. Built for focus, finished for sound, and flooded with California light.</p></div><Photo src={photos.studioMain} alt="Creative studio with instruments, desk, and natural light" eager className="aspect-[6/5] md:col-span-7" /></section>
    <section className="border-y border-border bg-secondary/60 py-20"><div className="site-container grid gap-12 md:grid-cols-12"><div className="md:col-span-4"><SectionLabel>A quiet surprise</SectionLabel><h2 className="mt-5 font-display text-4xl leading-tight">The former garage, reimagined.</h2></div><div className="space-y-5 leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6"><p>Where an unfinished garage once stood, there is now a sound-treated studio with exposed wood beams, a skylight, and a built-in recording booth.</p><p>With its own AC unit and a sense of separation from the rest of the house, it is a place for musicians, filmmakers, podcasters, writers, editors, and anyone who works best with room to think.</p></div></div></section>
    <section className="site-container py-20"><div className="mb-10"><SectionLabel>Inside the studio</SectionLabel><h2 className="mt-4 font-display text-4xl sm:text-5xl">Room to create.</h2></div><div className="grid gap-4 md:grid-cols-2"><Photo src={photos.studioRoom} alt="Studio room with artwork and workstations" className="aspect-[4/3]" /><Photo src={photos.studioBooth} alt="Sound-treated recording booth with microphone" className="aspect-[4/3]" /></div><div className="mt-8"><TextLink href="/details">View property details</TextLink></div></section>
    <section className="bg-secondary/60 py-20"><div className="site-container grid gap-10 md:grid-cols-2 md:items-center"><Photo src={photos.gardenHome} alt="Landscaped garden surrounding the home" className="aspect-[4/3]" /><div className="md:pl-10"><SectionLabel>Beyond the studio</SectionLabel><h2 className="mt-5 font-display text-4xl">Space for every rhythm.</h2><p className="mt-6 leading-relaxed text-muted-foreground">The home moves from focused creative work to open living and a private garden with a heated pool and spa. Different spaces, one seamless way of life.</p><div className="mt-8"><TextLink href="/">Explore the home</TextLink></div></div></div></section>
    <InquireBand />
  </SiteLayout>;
}

export default Studio;
