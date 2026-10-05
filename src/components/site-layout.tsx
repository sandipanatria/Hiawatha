"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
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
   PROPERTY CTA
========================================================= */

const LISTING_PRICE = "$1,595,000";

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function MobileNavigation({
  pathname,
}: {
  pathname: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  /* =====================================================
     PREVENT BACKGROUND PAGE SCROLLING
  ===================================================== */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative z-80 xl:hidden"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </Button>

      {/* =====================================================
          MOBILE NAVIGATION

          Portal keeps the menu outside the header stacking
          context.
      ===================================================== */}

      {menuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <nav
            id="mobile-navigation"
            className="fixed inset-x-0 top-19 bottom-19 z-[150] overflow-y-auto bg-background xl:hidden"
            aria-label="Mobile navigation"
          >
            <div className="site-container min-h-full px-5 pb-8 pt-5 sm:px-6">

              {/* =================================================
                  MOBILE MENU HEADER
              ================================================= */}

              <div className="flex items-center justify-between border-b border-border pb-5">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="font-display text-2xl leading-none text-foreground"
                  aria-label="Hiawatha home"
                >
                  Hiawatha
                  <span className="text-primary">.</span>
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
                  aria-label="Close navigation menu"
                >
                  Close
                </button>
              </div>

              {/* =================================================
                  MOBILE NAVIGATION LINKS
              ================================================= */}

              <div className="mt-2">
                {navigation.map(({ label, href }) => {
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className={`flex min-h-18 items-center border-b border-border font-display text-[2rem] leading-none transition-colors sm:min-h-20.5 sm:text-[2.4rem] ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>

              {/* =================================================
                  MOBILE MENU SHOWING LINK
              ================================================= */}

              <a
                href="#inquire"
                onClick={closeMenu}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Schedule a showing
                <ArrowRight size={16} />
              </a>
            </div>
          </nav>,
          document.body,
        )}
    </>
  );
}

/* =========================================================
   MOBILE STICKY SHOWING CTA

   Only rendered after the page loader has completely exited.
========================================================= */

function MobileStickyCTA() {
  return (
    <div
      className="
        fixed
        inset-x-0
        bottom-0
        z-[100]
        border-t
        border-border
        bg-background/95
        px-3
        pt-3
        backdrop-blur-md
        md:hidden
      "
      style={{
        paddingBottom:
          "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-screen-sm
          items-center
          justify-between
          gap-3
        "
      >
        {/* =====================================================
            PRICE
        ===================================================== */}

        <div className="min-w-0">
          <p className="font-display text-2xl leading-none text-foreground sm:text-3xl">
            {LISTING_PRICE}
          </p>

          <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            Offered at
          </p>
        </div>

        {/* =====================================================
            CTA
        ===================================================== */}

        <a
          href="#inquire"
          className="
            inline-flex
            min-h-12
            shrink-0
            items-center
            justify-center
            gap-2
            bg-foreground
            px-4
            text-[10px]
            font-medium
            uppercase
            tracking-[0.08em]
            text-background
            transition-opacity
            active:opacity-80
            sm:px-5
            sm:text-xs
          "
        >
          <span>Schedule a showing</span>

          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

/* =========================================================
   SITE LAYOUT
========================================================= */

export function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  /*
   * Separate state controls when the mobile CTA is mounted.
   *
   * This prevents the CTA from appearing underneath/inside
   * the loader during the loader's exit animation.
   */
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  const pathname = usePathname();

  /* =========================================================
     INITIAL LOADER
  ========================================================== */

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const duration = reducedMotion ? 100 : 1850;

    /*
     * Main loader duration.
     */
    const loaderTimer = window.setTimeout(() => {
      setLoading(false);

      /*
       * Give the loader shutter animation time to finish
       * before mounting the fixed mobile CTA.
       *
       * This prevents the CTA from visually appearing
       * inside the loader.
       */
      const ctaTimer = window.setTimeout(() => {
        setShowMobileCTA(true);
      }, reducedMotion ? 0 : 400);

      /*
       * Store timer on the window object so cleanup can
       * access it from this effect.
       */
      (
        window as typeof window & {
          __hiawathaCtaTimer?: number;
        }
      ).__hiawathaCtaTimer = ctaTimer;
    }, duration);

    return () => {
      window.clearTimeout(loaderTimer);

      const extendedWindow = window as typeof window & {
        __hiawathaCtaTimer?: number;
      };

      if (extendedWindow.__hiawathaCtaTimer) {
        window.clearTimeout(
          extendedWindow.__hiawathaCtaTimer,
        );

        delete extendedWindow.__hiawathaCtaTimer;
      }
    };
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

    const elements =
      document.querySelectorAll(".scroll-reveal");

    elements.forEach((element) => {
      reveal.observe(element);
    });

    const updateProgress = () => {
      const distance =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        distance > 0
          ? (window.scrollY / distance) * 100
          : 0;

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

          Loader stays above all UI while active.
      ======================================================= */}

      <div
        className={`site-loader z-[200] ${
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

          {/* ===================================================
              LOGO
          =================================================== */}

          <Link
            href="/"
            className="brand-link font-display text-2xl leading-none text-foreground"
            aria-label="Hiawatha home"
          >
            Hiawatha
            <span className="text-primary">.</span>
          </Link>

          {/* ===================================================
              DESKTOP NAVIGATION
          =================================================== */}

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

          {/* ===================================================
              HEADER ACTIONS
          =================================================== */}

          <div className="flex items-center gap-2">

            {/* DESKTOP INQUIRE */}

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

            {/* MOBILE MENU */}

            <MobileNavigation
              pathname={pathname}
            />

          </div>
        </div>
      </header>

      {/* =======================================================
          MOBILE STICKY CTA

          IMPORTANT:
          This is NOT mounted while the loader is active.

          showMobileCTA becomes true only after:
          1. Loader duration completes
          2. Loader exit animation has finished
      ======================================================= */}

      {showMobileCTA && <MobileStickyCTA />}

      {/* =======================================================
          MAIN

          Bottom padding prevents the fixed CTA from covering
          the final content on mobile.
      ======================================================= */}

      <main className="pb-20 md:pb-0">
        {children}
      </main>

      {/* =======================================================
          FOOTER
      ======================================================= */}

      <footer className="border-t border-border bg-background pb-28 pt-12 md:pb-12">
        <div className="site-container flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

          {/* =================================================
              PROPERTY
          ================================================= */}

          <div>
            <p className="font-display text-3xl">
              18334 <em>Hiawatha</em>
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              A Palmer & Krisel Modern · 1958
            </p>
          </div>

          {/* =================================================
              ADDRESS + PHONE
          ================================================= */}

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
  return (
    <p className="eyebrow">
      {children}
    </p>
  );
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

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

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
            Prefer to talk{" "}
            <span aria-hidden="true">?</span>{" "}
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

        {/* =================================================
            ENQUIRY FORM
        ================================================= */}

        <div className="md:col-span-7">
          <EnquiryForm />
        </div>

      </div>
    </section>
  );
}