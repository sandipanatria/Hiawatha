"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/enquiry-form";

const navigation = [
  { label: "The Home", href: "/" },
  { label: "The Architecture", href: "/architecture" },
  { label: "The Studio", href: "/studio" },
  { label: "Details", href: "/details" },
] as const;

/* =========================================================
   MOBILE NAVIGATION

   Keeping the mobile menu state in its own component allows
   the component to remount when the pathname changes instead
   of synchronously setting state from an effect.
========================================================= */

function MobileNavigation({
  pathname,
}: {
  pathname: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="xl:hidden"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={
          menuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </Button>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-nav site-container px-5 pb-6 xl:hidden"
          aria-label="Mobile navigation"
        >
          {navigation.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`block border-b border-border py-4 font-display text-3xl ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}

          <a
            href="#inquire"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
            onClick={() => setMenuOpen(false)}
          >
            Inquire
            <ArrowRight size={16} />
          </a>
        </nav>
      )}
    </>
  );
}

export function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  /* =========================================================
     INITIAL LOADER
  ========================================================== */

  useEffect(() => {
    const duration = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? 100
      : 1850;

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => window.clearTimeout(timer);
  }, []);

  /* =========================================================
     SCROLL REVEAL + READING PROGRESS
  ========================================================== */

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px 5% 0px",
        threshold: 0.01,
      },
    );

    const elements = document.querySelectorAll(".scroll-reveal");

    elements.forEach((element) => {
      reveal.observe(element);
    });

    const updateProgress = () => {
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        distance > 0 ? (window.scrollY / distance) * 100 : 0;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${progress}%`,
      );
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      reveal.disconnect();

      window.removeEventListener(
        "scroll",
        updateProgress,
      );

      window.removeEventListener(
        "resize",
        updateProgress,
      );
    };
  }, [pathname]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/* =======================================================
          PAGE LOADER
      ======================================================= */}

      <div
        className={`site-loader ${
          loading ? "" : "site-loader--done"
        }`}
        aria-hidden="true"
      >
        <div className="loader-inner">
          <span className="loader-index">
            01 / 04
          </span>

          <span className="loader-address font-display">
            18334
            <br />
            <em>Hiawatha</em>
          </span>

          <span className="loader-caption">
            A Palmer & Krisel Modern <span>—</span> 1958
          </span>

          <div className="loader-track">
            <div className="loader-progress" />
          </div>
        </div>

        <div className="loader-shutter loader-shutter--one" />
        <div className="loader-shutter loader-shutter--two" />
      </div>

      {/* =======================================================
          READING PROGRESS
      ======================================================= */}

      <div
        className="reading-progress"
        aria-hidden="true"
      />

      {/* =======================================================
          HEADER
      ======================================================= */}

      <header className="site-header fixed inset-x-0 top-0 z-40">
        <div className="site-nav site-container flex h-19 items-center justify-between gap-5 px-4 sm:px-6">
          {/* LOGO */}

          <Link
            href="/"
            className="brand-link font-display text-2xl leading-none text-foreground"
            aria-label="Hiawatha home"
          >
            Hiawatha
            <span className="text-primary">.</span>
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav
            className="hidden items-center gap-8 xl:flex"
            aria-label="Main navigation"
          >
            {navigation.map(({ label, href }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link text-xs uppercase tracking-[0.12em] ${
                    isActive
                      ? "is-active text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="editorial"
              size="sm"
              className="hover-lift hidden md:inline-flex"
            >
              <a href="#inquire">
                Inquire
                <ArrowRight />
              </a>
            </Button>

            <MobileNavigation
              key={pathname}
              pathname={pathname}
            />
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main>{children}</main>

      {/* =======================================================
          FOOTER
      ======================================================= */}

      <footer className="border-t border-border bg-background py-12">
        <div className="site-container flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-3xl">
              18334 <em>Hiawatha</em>
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              A Palmer & Krisel Modern · 1958
            </p>
          </div>

          <div className="text-sm text-muted-foreground sm:text-right">
            <p>
              Porter Ranch, Los Angeles · CA 91326
            </p>

            <a
              className="nav-link mt-2 inline-block text-foreground"
              href="tel:3236127086"
              aria-label="Call Chris Gray at 323-612-7086"
            >
              323-612-7086
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===============================================================
   SECTION LABEL
================================================================ */

export function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return <p className="eyebrow">{children}</p>;
}

/* ===============================================================
   PHOTO
================================================================ */

export function Photo({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={`photo-frame relative overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={eager}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/* ===============================================================
   TEXT LINK
================================================================ */

export function TextLink({
  href,
  children,
}: {
  href: "/" | "/architecture" | "/studio" | "/details";
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="nav-link arrow-link inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground"
    >
      {children}

      <ArrowRight
        size={17}
        className="arrow-link-icon transition-transform duration-300"
      />
    </Link>
  );
}

/* ===============================================================
   ENQUIRY BAND
================================================================ */

export function InquireBand() {
  return (
    <section
      id="inquire"
      className="scroll-mt-19 border-t border-border bg-secondary py-24 sm:py-32"
    >
      <div className="site-container grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <SectionLabel>
            Private showings / 04
          </SectionLabel>

          <h2 className="mt-6 max-w-xl font-display text-6xl leading-[0.95] sm:text-7xl">
            Come see it <em>for yourself.</em>
          </h2>

          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            Ask a question or arrange a private viewing of
            18334 Hiawatha.
          </p>

          <p className="mt-8 text-sm text-muted-foreground">
            Prefer to talk?{" "}
            <a
              href="tel:3236127086"
              className="nav-link text-foreground"
              aria-label="Call Chris Gray at 323-612-7086"
            >
              323-612-7086
            </a>
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Or contact Chris at{" "}
            <a
              href="mailto:chris@graygrouprealty.com"
              className="nav-link text-foreground"
            >
              chris@graygrouprealty.com
            </a>
          </p>
        </div>

        <div className="md:col-span-7">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}