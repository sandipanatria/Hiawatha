"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/enquiry-form";

const navigation = [
  { label:"The Home", href:"/" },
  { label:"The Architecture", href:"/architecture" },
  { label:"The Studio", href:"/studio" },
  { label:"Details", href:"/details" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [loading,setLoading] = useState(true);
  const [menuOpen,setMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const timer=window.setTimeout(()=>setLoading(false),1150);
    return ()=>window.clearTimeout(timer);
  },[]);
  useEffect(()=>setMenuOpen(false),[pathname]);

  return <div className="min-h-screen bg-background text-foreground">
    <div className={`site-loader ${loading ? "" : "site-loader--done"}`} aria-hidden="true">
      <div className="text-center"><div className="font-display text-3xl">Hiawatha</div><div className="loader-track"><div className="loader-progress"/></div><div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">A Palmer & Krisel Modern</div></div>
    </div>
    <header className="fixed inset-x-0 top-0 z-40">
  <div className="site-nav site-container mt-4 flex min-h-16 items-center justify-between px-4 py-2 sm:px-6">

    {/* Logo */}
    <Link
      href="/"
      className="brand-link shrink-0 font-display text-xl text-foreground sm:text-2xl"
      aria-label="Hiawatha home"
    >
      Hiawatha<span className="text-primary">.</span>
    </Link>

    {/* Desktop Navigation */}
    <nav
      className="hidden items-center gap-5 lg:flex xl:gap-8"
      aria-label="Main navigation"
    >
      {navigation.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`nav-link whitespace-nowrap text-sm ${
            pathname === href
              ? "text-foreground is-active"
              : "text-muted-foreground"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>

    {/* Actions */}
    <div className="flex shrink-0 items-center gap-2">
      <Button
        asChild
        variant="editorial"
        size="sm"
        className="hover-lift hidden sm:inline-flex"
      >
        <a href="#inquire">
          Inquire
          <ArrowRight />
        </a>
      </Button>

      {/* Mobile / Tablet menu */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </Button>
    </div>
  </div>

  {/* Mobile Navigation */}
  {menuOpen && (
    <nav
      className="mobile-nav site-container mt-2 p-4 lg:hidden"
      aria-label="Mobile navigation"
    >
      {navigation.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className="block border-b border-border py-3 font-display text-xl"
          onClick={() => setMenuOpen(false)}
        >
          {label}
        </Link>
      ))}

      <a
        href="#inquire"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
        onClick={() => setMenuOpen(false)}
      >
        Inquire
        <ArrowRight size={16} />
      </a>
    </nav>
  )}
</header>
    <main>{children}</main>
    <footer className="border-t border-border bg-background py-10">
      <div className="site-container flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="font-display text-xl">18334 Hiawatha</p><p className="mt-1 text-sm text-muted-foreground">A Palmer & Krisel Modern · 1958</p></div>
        <div className="text-sm text-muted-foreground sm:text-right"><p>Porter Ranch, Los Angeles · CA 91326</p><a className="nav-link mt-1 inline-block text-foreground" href="tel:+14242499557">424-249-9557</a></div>
      </div>
    </footer>
  </div>;
}

export function SectionLabel({children}:{children:ReactNode}){return <p className="eyebrow">{children}</p>}

export function Photo({src,alt,className="",eager=false}:{src:string;alt:string;className?:string;eager?:boolean}){
  return <div className={`photo-frame ${className}`}><img src={src} alt={alt} loading={eager?"eager":"lazy"} className="h-full w-full object-cover"/></div>
}
export function TextLink({href,children}:{href:"/"|"/architecture"|"/studio"|"/details";children:ReactNode}){
  return <Link href={href} className="nav-link arrow-link inline-flex items-center gap-3 text-sm font-medium text-foreground">{children}<ArrowRight size={16} className="arrow-link-icon transition-transform duration-300"/></Link>
}
export function InquireBand(){
  return <section id="inquire" className="scroll-mt-28 border-t border-border bg-secondary py-20 sm:py-28">
    <div className="site-container grid gap-12 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-5"><SectionLabel>Private showings</SectionLabel><h2 className="mt-5 max-w-xl font-display text-4xl leading-tight sm:text-5xl">Come see it for yourself.</h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Ask a question or arrange a private viewing of 18334 Hiawatha.</p><p className="mt-8 text-sm text-muted-foreground">Prefer to talk? <a href="tel:+14242499557" className="nav-link text-foreground">424-249-9557</a></p></div>
      <div className="md:col-span-7"><EnquiryForm/></div>
    </div>
  </section>
}
