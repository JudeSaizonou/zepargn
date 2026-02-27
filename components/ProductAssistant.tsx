"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { DOWNLOAD_LINKS, FAQ_FULL, RATE_PREVIEW } from "@/data/site-content";
import { cn } from "@/lib/cn";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const QUICK_QUESTIONS = [
  "Comment fonctionne Zepargn ?",
  "Quels sont les taux Z-Lock ?",
  "Puis-je retirer mon argent ?",
  "Comment télécharger l'app ?"
] as const;

const INITIAL_MESSAGE: ChatMessage = {
  id: "assistant-welcome",
  role: "assistant",
  text: "Bonjour. Je suis ZeChat. Je peux répondre à vos questions sur Zepargn, les taux, les retraits et les téléchargements."
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function findFAQAnswer(question: string) {
  const normalized = normalizeText(question);

  return FAQ_FULL.find((item) => {
    const source = normalizeText(item.question);
    const keywords = source.split(" ").filter((word) => word.length >= 5);

    return keywords.some((keyword) => normalized.includes(keyword));
  })?.answer;
}

function buildBotAnswer(question: string) {
  const normalized = normalizeText(question);
  const rates = RATE_PREVIEW.map((rate) => `${rate.duree}: ${rate.taux}`).join(" • ");

  if (!normalized) {
    return "Posez votre question en une phrase simple, je vous réponds immédiatement.";
  }

  if (normalized.includes("bonjour") || normalized.includes("salut")) {
    return "Bonjour. Je peux vous aider sur Épargne solo, Épargne en groupe, Z-Lock, Z-Flex, retraits et téléchargements.";
  }

  if (
    normalized.includes("taux") ||
    normalized.includes("7%") ||
    normalized.includes("z lock") ||
    normalized.includes("zlock")
  ) {
    return `Aperçu des taux Z-Lock: ${rates}. Selon le produit choisi et la durée.`;
  }

  if (
    normalized.includes("microcredit") ||
    normalized.includes("micro credit") ||
    normalized.includes("zflex") ||
    normalized.includes("z flex")
  ) {
    return "Microcrédit (Z-Flex): un crédit simple pour un besoin ponctuel, avec conditions affichées avant validation.";
  }

  if (
    normalized.includes("solo") ||
    normalized.includes("personnelle") ||
    normalized.includes("gardiens") ||
    normalized.includes("gardien")
  ) {
    return "Épargne solo: vous épargnez à votre rythme. Vous pouvez choisir deux gardiens pour protéger votre épargne avec leurs codes.";
  }

  if (
    normalized.includes("collective") ||
    normalized.includes("groupe") ||
    normalized.includes("public") ||
    normalized.includes("prive")
  ) {
    return "Épargne en groupe: vous créez un groupe public ou privé avec règles visibles pour tous, pour plus de confiance et de transparence.";
  }

  if (
    normalized.includes("telecharger") ||
    normalized.includes("download") ||
    normalized.includes("ios") ||
    normalized.includes("android")
  ) {
    return `Téléchargement direct: iOS ${DOWNLOAD_LINKS.ios} | Android ${DOWNLOAD_LINKS.android}`;
  }

  if (normalized.includes("simulateur")) {
    return "Le simulateur est disponible ici: /simulateur. Vous pouvez tester plusieurs montants et durées en quelques secondes.";
  }

  if (normalized.includes("faq")) {
    return "Vous pouvez consulter toute la FAQ ici: /faq";
  }

  const faqAnswer = findFAQAnswer(normalized);
  if (faqAnswer) {
    return faqAnswer;
  }

  return "Je peux vous aider sur: Épargne solo, Épargne en groupe, Z-Lock, Z-Flex, taux, retraits, simulateur et téléchargements.";
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M5 18.5 6.4 15H6a7 7 0 1 1 0-14h12a7 7 0 0 1 0 14h-7.5L5 18.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ProductAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  function ask(text: string) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const nextUser: ChatMessage = { id: uid(), role: "user", text: trimmed };
    const nextAssistant: ChatMessage = { id: uid(), role: "assistant", text: buildBotAnswer(trimmed) };

    setMessages((prev) => [...prev, nextUser, nextAssistant]);
    setMessage("");
    setIsOpen(true);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(message);
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-2 bottom-2 z-[70] flex flex-col items-end gap-3 sm:inset-x-auto sm:bottom-5 sm:right-5"
      id="zechat-root"
    >
      {isOpen ? (
        <section
          aria-label="ZeChat"
          id="zechat"
          className="pointer-events-auto fixed inset-0 z-[80] flex h-[100dvh] w-full flex-col overflow-hidden bg-white sm:static sm:inset-auto sm:z-auto sm:h-auto sm:max-h-[min(78dvh,40rem)] sm:w-[24rem] sm:rounded-[1.35rem] sm:border sm:border-slate-200/90 sm:bg-white/95 sm:shadow-[0_24px_65px_rgba(3,25,39,0.18)] sm:backdrop-blur-sm lg:w-[26rem]"
        >
          <header className="flex items-start justify-between gap-3 bg-zepargn-navy px-4 pb-3.5 pt-[max(0.875rem,env(safe-area-inset-top))] text-white sm:py-3.5 sm:pt-3.5">
            <div>
              <p className="type-link inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-zepargn-orange" />
                ZeChat
              </p>
              <p className="type-small mt-1 text-slate-200">Posez une question sur le produit.</p>
            </div>
            <button
              aria-label="Fermer ZeChat"
              className="type-button inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <span aria-hidden="true" className="text-2xl leading-none">×</span>
              <span className="sr-only">Fermer</span>
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#f8fafc] p-4" ref={listRef}>
            {messages.length > 0 ? (
              <div className="space-y-3">
                {messages.map((item) => (
                  <article className={cn("flex", item.role === "user" ? "justify-end" : "justify-start")} key={item.id}>
                    <p
                      className={cn(
                        "type-body max-w-[92%] whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-2xl px-3 py-2 [overflow-wrap:anywhere]",
                        item.role === "user"
                          ? "bg-zepargn-orange text-white"
                          : "border border-slate-200 bg-white text-slate-800"
                      )}
                    >
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  className="type-small inline-flex min-h-11 shrink-0 items-center justify-start rounded-xl border border-slate-300 px-3 text-left text-slate-700 whitespace-normal break-words [overflow-wrap:anywhere] transition-colors hover:bg-slate-100 sm:w-full sm:shrink"
                  key={question}
                  onClick={() => ask(question)}
                  type="button"
                >
                  {question}
                </button>
              ))}
            </div>

            <form className="flex items-stretch gap-2" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="zechat-question">
                Poser une question
              </label>
              <input
                aria-label="Votre question"
                className="type-input min-h-11 w-full rounded-xl border border-slate-300 px-3 text-zepargn-navy placeholder:text-slate-500 focus-visible:border-zepargn-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zepargn-orange/30"
                id="zechat-question"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ex: Comment marche Z-Lock ?"
                ref={inputRef}
                value={message}
              />
              <button
                aria-label="Envoyer la question"
                className="type-button inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-zepargn-orange px-4 text-white transition-colors hover:bg-[#d84200] sm:px-5"
                type="submit"
              >
                Envoyer
              </button>
            </form>
          </div>
        </section>
      ) : null}

      {!isOpen ? (
        <button
          aria-controls="zechat"
          aria-expanded={isOpen}
          aria-label="Ouvrir ZeChat"
          className="type-button pointer-events-auto inline-flex min-h-14 min-w-14 items-center justify-center rounded-full border border-zepargn-orange bg-zepargn-orange text-white shadow-[0_14px_34px_rgba(240,74,0,0.32)] transition-colors hover:bg-[#d84200] sm:min-h-14 sm:min-w-0 sm:justify-start sm:gap-2 sm:px-5"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <ChatIcon className="h-5 w-5 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">ZeChat</span>
        </button>
      ) : null}
    </div>
  );
}
