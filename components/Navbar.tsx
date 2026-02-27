"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { DOWNLOAD_LINKS } from "@/data/site-content";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { NAV_TABS, NavTab } from "@/lib/navigation";

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d={open ? "M6 6L18 18M18 6L6 18" : "M4 7H20M4 12H20M4 17H20"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function DesktopMenuPanel({ tab, onNavigate }: { tab: NavTab; onNavigate: () => void }) {
  const hidePreviewFor = new Set<NavTab["id"]>(["fonctionnalites", "ressources", "a-propos"]);
  const showPreview = !hidePreviewFor.has(tab.id);

  return (
    <div className={cn("grid gap-10", showPreview && "lg:grid-cols-[1.05fr_0.95fr]")}>
      <div>
        <p className="micro-accent text-zepargn-orange">{tab.label}</p>
        <h3 className="type-h2 mt-2 text-zepargn-navy">
          {tab.panelTitle}
        </h3>
        <p className="type-body mt-3 max-w-2xl text-slate-600">{tab.panelDescription}</p>

        <ul className={cn("mt-8 grid gap-x-10", tab.columns === 2 ? "sm:grid-cols-2" : "max-w-[40rem]")} role="menu">
          {tab.items.map((item) => (
            <li className="border-b border-slate-200" key={item.href} role="none">
              <Link
                className="group -mx-2 block rounded-xl px-2 py-4 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                href={item.href}
                onClick={onNavigate}
                role="menuitem"
              >
                <span className="type-link block text-zepargn-navy transition-colors group-hover:text-zepargn-orange">
                  {item.label}
                </span>
                <span className="type-small mt-1 block text-slate-600">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {showPreview ? (
        <aside className="hidden rounded-3xl bg-[#F6F9FC] p-6 lg:flex lg:flex-col lg:justify-between" aria-label="Aperçu visuel">
          <div>
            <p className="type-kicker text-slate-500">Prévisualisation</p>
            <p className="type-h3 mt-2 text-zepargn-navy">{tab.visualTitle}</p>
            <p className="type-body mt-2 text-slate-600">{tab.visualBody}</p>
          </div>
          <div className="type-small mt-5 aspect-[16/10] rounded-2xl bg-white px-4 py-3 text-slate-500">
            Emplacement image / mockup
          </div>
        </aside>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [openDesktopTab, setOpenDesktopTab] = useState<NavTab["id"] | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileTab, setOpenMobileTab] = useState<NavTab["id"] | null>(NAV_TABS[0].id);
  const [isMobileDownloadOpen, setIsMobileDownloadOpen] = useState(false);
  const [desktopPanelLeft, setDesktopPanelLeft] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const desktopPanelRef = useRef<HTMLDivElement>(null);
  const desktopTabButtonRefs = useRef<Record<NavTab["id"], HTMLButtonElement | null>>({
    fonctionnalites: null,
    ressources: null,
    "a-propos": null
  });
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const navUid = useId();

  const activeTab = useMemo(() => NAV_TABS.find((tab) => tab.id === openDesktopTab) ?? null, [openDesktopTab]);
  const desktopPanelId = `${navUid}-desktop-panel`;
  const desktopPanelWidthClass =
    activeTab?.columns === 2 ? "lg:w-[min(92vw,64rem)] xl:w-[64rem]" : "lg:w-[min(92vw,48rem)] xl:w-[48rem]";

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) {
        return;
      }
      setOpenDesktopTab(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setOpenDesktopTab(null);
      setIsMobileOpen(false);
      setIsMobileDownloadOpen(false);
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen || !mobileSheetRef.current) {
      return;
    }

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = Array.from(mobileSheetRef.current.querySelectorAll<HTMLElement>(focusableSelectors));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusables.length === 0) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    mobileCloseButtonRef.current?.focus();
  }, [isMobileOpen]);

  useEffect(() => {
    if (isMobileOpen) {
      return;
    }

    setIsMobileDownloadOpen(false);
  }, [isMobileOpen]);

  useEffect(() => {
    if (!activeTab) {
      return;
    }

    const updateDesktopPanelPosition = () => {
      const root = rootRef.current;
      const panel = desktopPanelRef.current;
      const button = desktopTabButtonRefs.current[activeTab.id];

      if (!root || !panel || !button) {
        return;
      }

      const rootRect = root.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const panelWidth = panel.offsetWidth;
      const horizontalPadding = 12;
      const minLeft = horizontalPadding;
      const maxLeft = Math.max(horizontalPadding, rootRect.width - panelWidth - horizontalPadding);
      const buttonCenter = buttonRect.left - rootRect.left + buttonRect.width / 2;
      const nextLeft = Math.round(Math.min(Math.max(buttonCenter - panelWidth / 2, minLeft), maxLeft));

      setDesktopPanelLeft((current) => (current === nextLeft ? current : nextLeft));
    };

    updateDesktopPanelPosition();
    window.addEventListener("resize", updateDesktopPanelPosition);

    return () => {
      window.removeEventListener("resize", updateDesktopPanelPosition);
    };
  }, [activeTab, desktopPanelWidthClass]);

  const closeAllMenus = () => {
    setOpenDesktopTab(null);
    setIsMobileOpen(false);
    setIsMobileDownloadOpen(false);
  };

  const closeMobileSheet = () => {
    setIsMobileOpen(false);
    setIsMobileDownloadOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 lg:px-2 lg:pt-2 xl:px-4 xl:pt-3">
        <div className="relative mx-auto w-full lg:max-w-[100rem]" ref={rootRef}>
            <div
              className={cn(
                "border-b border-slate-200 bg-white shadow-[0_10px_26px_rgba(3,25,39,0.1)] lg:border lg:border-slate-200",
                "lg:rounded-full"
              )}
            >
              <div className="flex min-h-[72px] items-center justify-between gap-3 px-4 sm:min-h-[90px] sm:px-5">
                <Link
                  aria-label="Retour à l'accueil Zepargn"
                  className="inline-flex items-center gap-2 md:ml-3 lg:ml-6"
                  href="/"
                  onClick={closeAllMenus}
                >
                  <Image
                    alt="Logo Zepargn"
                    className="h-9 w-auto object-contain sm:h-12 lg:h-16"
                    height={92}
                    priority
                    src="/logo-zepargn.svg"
                    width={320}
                  />
                  <span className="sr-only">Zepargn</span>
                </Link>

                <div className="hidden items-center gap-3 lg:flex">
                  <nav aria-label="Navigation principale" className="flex items-center gap-1" ref={desktopNavRef}>
                    {NAV_TABS.map((tab) => {
                      const expanded = openDesktopTab === tab.id;

                      return (
                        <button
                          aria-controls={desktopPanelId}
                          aria-expanded={expanded}
                          aria-haspopup="menu"
                          className={cn(
                            "type-nav inline-flex min-h-12 items-center gap-1.5 rounded-full px-4 transition-colors",
                            expanded ? "bg-zepargn-navy text-white" : "text-slate-700 hover:bg-slate-100"
                          )}
                          key={tab.id}
                          onClick={() => setOpenDesktopTab((current) => (current === tab.id ? null : tab.id))}
                          ref={(element) => {
                            desktopTabButtonRefs.current[tab.id] = element;
                          }}
                          type="button"
                        >
                          <span>{tab.label}</span>
                          <ChevronIcon className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                        </button>
                      );
                    })}
                  </nav>

                  <Link
                    aria-label="Télécharger Zepargn"
                    className="type-button inline-flex min-h-12 items-center justify-center rounded-full bg-zepargn-orange px-7 text-white transition-colors hover:bg-[#d84200]"
                    href="/#cta-download"
                    onClick={() => trackEvent("download_cta_click", { source: "navbar" })}
                  >
                    Télécharger
                  </Link>
                </div>

                <button
                  aria-controls={`${navUid}-mobile-sheet`}
                  aria-expanded={isMobileOpen}
                  aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-zepargn-navy transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zepargn-navy/20 lg:hidden"
                  onClick={() => setIsMobileOpen((prev) => !prev)}
                  type="button"
                >
                  <BurgerIcon open={isMobileOpen} />
                </button>
              </div>
            </div>

            <div
              aria-hidden={!activeTab}
              className={cn(
                "pointer-events-none absolute top-[calc(100%+0.55rem)] z-[60] hidden -translate-y-2 opacity-0 transition duration-200 ease-out motion-reduce:transition-none lg:block",
                desktopPanelWidthClass,
                activeTab && "pointer-events-auto translate-y-0 opacity-100"
              )}
              id={desktopPanelId}
              ref={desktopPanelRef}
              role="menu"
              style={desktopPanelLeft !== null ? { left: desktopPanelLeft } : undefined}
            >
              <section className="rounded-[2rem] border border-slate-200 bg-white px-8 pb-8 pt-6 shadow-[0_22px_60px_rgba(3,25,39,0.16)]">
                {activeTab ? <DesktopMenuPanel onNavigate={() => setOpenDesktopTab(null)} tab={activeTab} /> : null}
              </section>
            </div>
          </div>
      </header>

      <div
        aria-hidden={!isMobileOpen}
        className={cn(
          "fixed inset-0 z-[75] bg-zepargn-navy/45 transition-opacity duration-200 lg:hidden",
          isMobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeMobileSheet}
      >
        <section
          aria-label="Navigation mobile"
          aria-modal="true"
          className={cn(
            "absolute inset-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-zepargn-navy text-white transition duration-200 motion-reduce:transition-none",
            isMobileOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          id={`${navUid}-mobile-sheet`}
          onClick={(event) => event.stopPropagation()}
          ref={mobileSheetRef}
          role="dialog"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-14 top-16 h-44 w-44 rounded-full bg-zepargn-sky/12 blur-3xl" />
            <div className="absolute -right-10 bottom-24 h-52 w-52 rounded-full bg-zepargn-orange/12 blur-3xl" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
            <Link aria-label="Accueil Zepargn" className="inline-flex items-center" href="/" onClick={closeAllMenus}>
              <Image alt="Logo Zepargn" className="h-8 w-auto object-contain" height={72} src="/logo-zepargn.svg" width={220} />
            </Link>

            <div className="flex items-center gap-2">
              <button
                aria-controls={`${navUid}-mobile-download-switcher`}
                aria-expanded={isMobileDownloadOpen}
                className="type-button inline-flex min-h-11 items-center justify-center rounded-full bg-zepargn-orange px-4 text-white transition-colors hover:bg-[#d84200] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                onClick={() => setIsMobileDownloadOpen((current) => !current)}
                type="button"
              >
                Télécharger
              </button>

              <button
                aria-label="Fermer la navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                onClick={closeMobileSheet}
                ref={mobileCloseButtonRef}
                type="button"
              >
                <BurgerIcon open />
              </button>
            </div>
          </div>

          <div
            aria-hidden={!isMobileDownloadOpen}
            className={cn(
              "relative z-10 overflow-hidden transition-[max-height,opacity,visibility] duration-200 motion-reduce:transition-none",
              isMobileDownloadOpen ? "visible max-h-40 opacity-100" : "invisible max-h-0 opacity-0 pointer-events-none"
            )}
            id={`${navUid}-mobile-download-switcher`}
          >
            <div className="px-4 pb-3">
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/5 p-1">
                <a
                  className="type-button inline-flex min-h-11 min-w-0 items-center justify-center rounded-full bg-white px-3 text-zepargn-navy transition hover:bg-slate-100"
                  href={DOWNLOAD_LINKS.ios}
                  onClick={() => {
                    trackEvent("download_click", { source: "mobile_menu_switcher", platform: "ios" });
                    closeMobileSheet();
                  }}
                  rel="noreferrer"
                  target="_blank"
                >
                  iOS
                </a>
                <a
                  className="type-button inline-flex min-h-11 min-w-0 items-center justify-center rounded-full bg-white px-3 text-zepargn-navy transition hover:bg-slate-100"
                  href={DOWNLOAD_LINKS.android}
                  onClick={() => {
                    trackEvent("download_click", { source: "mobile_menu_switcher", platform: "android" });
                    closeMobileSheet();
                  }}
                  rel="noreferrer"
                  target="_blank"
                >
                  Android
                </a>
              </div>
            </div>
          </div>

          <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+1.15rem)] pt-2">
            <nav aria-label="Navigation mobile principale" className="divide-y divide-white/10" role="navigation">
              {NAV_TABS.map((tab) => {
                const expanded = openMobileTab === tab.id;
                const panelId = `${navUid}-mobile-panel-${tab.id}`;

                return (
                  <section key={tab.id}>
                    <button
                      aria-controls={panelId}
                      aria-expanded={expanded}
                      className="type-nav-mobile flex min-h-[3.15rem] w-full items-center justify-between gap-3 py-3 text-left text-white"
                      onClick={() => setOpenMobileTab((current) => (current === tab.id ? null : tab.id))}
                      type="button"
                    >
                      <span>{tab.label}</span>
                      <ChevronIcon className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                    </button>

                    <div
                      className={cn("grid transition-all duration-200 motion-reduce:transition-none", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                      id={panelId}
                    >
                      <ul className="min-h-0 overflow-hidden pb-3">
                        {tab.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              className="-mx-1 block rounded-lg px-3 py-3 transition-colors hover:bg-white/5 focus-visible:bg-white/5"
                              href={item.href}
                              onClick={() => {
                                closeMobileSheet();
                                setOpenDesktopTab(null);
                              }}
                            >
                              <p className="type-link text-white">{item.label}</p>
                              <p className="type-small mt-1 text-slate-300">{item.description}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                );
              })}
            </nav>
          </div>
        </section>
      </div>
    </>
  );
}
