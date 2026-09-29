import { InquireBand, Photo, SectionLabel, SiteLayout, TextLink } from "@/components/site-layout";
import { photos, propertyFacts } from "@/lib/property";
import type { Metadata } from "next";
export const metadata: Metadata = { title:"Property Details | 18334 Hiawatha", description:"Property facts for 18334 Hiawatha: a 1958 Palmer & Krisel home with 3 bedrooms, 2 bathrooms, pool, and studio." };

type FactGroup = { title: string; items: readonly (readonly [string, string])[] };

const groups: readonly FactGroup[] = [
  {
    title: "Property",
    items: propertyFacts.filter(([label]) => ["Year built", "Bedrooms", "Bathrooms", "Living area", "Lot size"].includes(label)),
  },
  {
    title: "Architecture",
    items: propertyFacts.filter(([label]) => ["Architects", "Development", "Style"].includes(label)),
  },
];


function Details() {
  return <SiteLayout>
    <section className="site-container grid gap-10 pt-36 pb-20 sm:pt-44 md:grid-cols-12 md:items-center"><div className="md:col-span-5"><SectionLabel>03 / Property details</SectionLabel><h1 className="mt-6 font-display text-5xl leading-[1.07] sm:text-6xl">The facts, precisely.</h1><p className="mt-7 max-w-md leading-relaxed text-muted-foreground">18334 Hiawatha Street<br />Porter Ranch, California 91326</p><p className="mt-8 font-display text-3xl text-primary">$1,595,000</p><p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Offered at</p></div><Photo src={photos.poolWide} alt="Private heated swimming pool and garden at 18334 Hiawatha" eager className="aspect-[6/5] md:col-span-7" /></section>
    <section className="border-y border-border bg-secondary/60 py-9"><div className="site-container grid grid-cols-2 gap-6 sm:grid-cols-4">{[['3','Bedrooms'],['2','Bathrooms'],['1,890','Approx. sq. ft.'],['1958','Year built']].map(([value,label]) => <div key={label}><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p></div>)}</div></section>
     <section className="site-container py-20"><div className="mb-10"><SectionLabel>Property overview</SectionLabel><h2 className="mt-4 font-display text-4xl sm:text-5xl">At a glance.</h2></div><div className="grid gap-x-16 gap-y-14 md:grid-cols-2">{groups.map(group => <div key={group.title}><h3 className="border-b border-foreground pb-4 font-display text-2xl">{group.title}</h3><dl className="divide-y divide-border">{group.items.map(([label,value]) => <div key={label} className="fact-row grid grid-cols-[minmax(90px,38%)_1fr] gap-4 py-4 text-sm leading-relaxed"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>)}</dl></div>)}</div><p className="mt-16 border-t border-border pt-5 text-xs text-muted-foreground">All information is deemed reliable but not guaranteed and should be independently verified.</p></section>
    <section className="site-container grid gap-4 pb-20 md:grid-cols-3"><Photo src={photos.kitchen} alt="Updated kitchen" className="aspect-[4/3]" /><Photo src={photos.bedroom} alt="Bright bedroom" className="aspect-[4/3]" /><Photo src={photos.pool} alt="Heated pool and outdoor living area" className="aspect-[4/3]" /></section>
    <InquireBand />
  </SiteLayout>;
}

export default Details;
