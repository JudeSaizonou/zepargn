import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zepargn" },
  { label: "Instagram", href: "https://www.instagram.com/zpargn" },
  { label: "X", href: "https://x.com/ZPargn" },
  { label: "TikTok", href: "https://www.tiktok.com/@zepargn_officiel" }
] as const;

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.98 3.5A2.49 2.49 0 0 0 2.5 6a2.5 2.5 0 1 0 5 0A2.49 2.49 0 0 0 4.98 3.5ZM3 8h4v13H3V8Zm7 0h3.8v1.8h.1c.53-1 1.82-2.1 3.75-2.1 4.01 0 4.75 2.64 4.75 6.06V21h-4v-6.38c0-1.52-.03-3.48-2.12-3.48-2.13 0-2.46 1.66-2.46 3.37V21h-4V8Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <rect height="14" rx="4" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" fill="currentColor" r="1" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.53 3H21l-7.57 8.66L22.33 21h-6.96l-5.45-6.88L3.9 21H.43l8.1-9.27L1.98 3h7.13l4.92 6.22L17.53 3Zm-1.22 15.9h1.92L7.98 5.02H5.9L16.3 18.9Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.75 3.5c.48 1.37 1.54 2.42 2.95 2.9V9a6.55 6.55 0 0 1-2.95-.7v6.05a5.25 5.25 0 1 1-4.15-5.13v2.83a2.5 2.5 0 1 0 1.4 2.3V3.5h2.75Z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return <LinkedInIcon />;
  }
  if (label === "Instagram") {
    return <InstagramIcon />;
  }
  if (label === "X") {
    return <XIcon />;
  }
  return <TikTokIcon />;
}

export function Footer() {
  return (
    <footer className="bg-zepargn-orange py-14 text-white">
      <Container>
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
            <Link aria-label="Retour à l'accueil Zepargn" className="inline-flex items-center" href="/">
              <Image
                alt="Logo Zepargn"
                className="h-14 w-auto object-contain drop-shadow-[0_8px_16px_rgba(3,25,39,0.28)] sm:h-16"
                height={84}
                src="/white-logo-zepargn.svg"
                width={290}
              />
            </Link>
            <Image
              alt="Logo partenaire AVM"
              className="h-14 w-auto object-contain drop-shadow-[0_8px_16px_rgba(3,25,39,0.28)] sm:h-16"
              height={199}
              src="/logo-partenaire-avm.png"
              width={337}
            />
          </div>

          <p className="type-kicker mt-4 text-white/90">Partenaire financier officiel</p>
          <p className="type-small mt-2 max-w-3xl text-white/90">
            AVM, SFD agréée (n°0094 – Arrêté 4583/MEFPD du 26/08/2015), services encadrés par la BCEAO, vérification
            d’identité requise, fonds sécurisés.
          </p>

          <div className="mt-7 w-full">
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:flex-nowrap sm:gap-x-10 sm:gap-y-0 sm:whitespace-nowrap">
              <Link
                className="type-link text-white transition hover:text-zepargn-navy"
                href="/conditions-utilisation"
              >
                Conditions d’utilisation
              </Link>
              <Link
                className="type-link text-white transition hover:text-zepargn-navy"
                href="/politique-confidentialite"
              >
                Politique de confidentialité
              </Link>
              <Link className="type-link text-white transition hover:text-zepargn-navy" href="/mentions-legales">
                Mentions légales
              </Link>
              <Link className="type-link text-white transition hover:text-zepargn-navy" href="/politique-cookies">
                Politique cookies
              </Link>
            </div>
          </div>

          <div aria-hidden="true" className="mt-7 h-px w-full bg-white/35" />

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <a
                aria-label={`Zepargn sur ${social.label}`}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/45 text-white transition-colors hover:border-zepargn-navy hover:bg-zepargn-navy"
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>

          <a
            className="type-button mt-7 inline-flex min-h-11 items-center justify-center rounded-xl border border-white/45 px-6 text-white transition-colors hover:bg-white hover:text-zepargn-navy sm:min-h-14 sm:px-8"
            href="mailto:support@zepargn.com"
          >
            Nous contacter
          </a>

          <p className="type-small mt-7 max-w-3xl text-white/90">
            © 2025 Zepargn – App operated by Digital Elevate SAS (capital: 1M FCFA – RCCM RB/COT/22B12345)
          </p>
        </div>
      </Container>
    </footer>
  );
}
