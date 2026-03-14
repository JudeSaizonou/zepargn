"use client";

import { useMemo, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type Row        = { id: string; label: string; amount: number };
type SectionKey = "revenus" | "depenses" | "investissements";
type Currency   = { code: string; label: string; symbol: string; locale: string };

// ── Config ─────────────────────────────────────────────────────────────────

const CURRENCIES: Currency[] = [
  { code: "XOF", label: "FCFA — Franc CFA (UEMOA)", symbol: "FCFA", locale: "fr-FR" },
  { code: "XAF", label: "FCFA — Franc CFA (CEMAC)", symbol: "FCFA", locale: "fr-FR" },
  { code: "EUR", label: "Euro (€)",                  symbol: "€",    locale: "fr-FR" },
  { code: "USD", label: "Dollar américain ($)",       symbol: "$",    locale: "en-US" },
  { code: "GBP", label: "Livre sterling (£)",         symbol: "£",    locale: "en-GB" },
  { code: "NGN", label: "Naira nigérian (₦)",         symbol: "₦",    locale: "en-NG" },
  { code: "GHS", label: "Cedi ghanéen (₵)",           symbol: "₵",    locale: "en-GH" },
  { code: "MAD", label: "Dirham marocain (MAD)",      symbol: "MAD",  locale: "fr-MA" },
];

const SECTIONS: Array<{ key: SectionKey; label: string; color: string }> = [
  { key: "revenus",         label: "Revenus",         color: "#22c55e" },
  { key: "depenses",        label: "Dépenses",        color: "#F04A00" },
  { key: "investissements", label: "Investissements", color: "#6366f1" },
];

const SECTION_COLOR: Record<SectionKey, string> = {
  revenus:         "#22c55e",
  depenses:        "#F04A00",
  investissements: "#6366f1",
};

const DEFAULT_ROWS: Record<SectionKey, Array<Omit<Row, "id">>> = {
  revenus: [
    { label: "Salaire",                 amount: 300_000 },
    { label: "Revenus complémentaires", amount:  50_000 },
  ],
  depenses: [
    { label: "Logement",     amount:  80_000 },
    { label: "Transport",    amount:  25_000 },
    { label: "Alimentation", amount:  40_000 },
    { label: "Loisirs",      amount:  20_000 },
    { label: "Autres",       amount:  15_000 },
  ],
  investissements: [
    { label: "Épargne Z-Lock", amount: 50_000 },
  ],
};

// ── Helpers ────────────────────────────────────────────────────────────────

function sumRows(rows: Row[]) {
  return rows.reduce(
    (s, r) => s + (Number.isFinite(r.amount) ? Math.max(0, r.amount) : 0),
    0
  );
}

let _idCounter = 0;
function newId() { return `r${++_idCounter}`; }

function makeRows(defaults: Array<Omit<Row, "id">>): Row[] {
  return defaults.map(d => ({ ...d, id: newId() }));
}

// ── DonutChart ─────────────────────────────────────────────────────────────

function DonutChart({
  segments,
}: {
  segments: Array<{ color: string; value: number }>;
}) {
  const total = segments.reduce((s, d) => s + d.value, 0);

  if (total === 0) {
    return (
      <div className="mx-auto h-[140px] w-[140px] rounded-full border-[20px] border-slate-100" />
    );
  }

  const R = 60;
  const C = 2 * Math.PI * R;
  let cumLen = 0;

  const arcs = segments
    .filter(d => d.value > 0)
    .map(d => {
      const len = (d.value / total) * C;
      const arc = { color: d.color, len, dashoffset: C - cumLen };
      cumLen += len;
      return arc;
    });

  return (
    <div className="relative mx-auto h-[140px] w-[140px]">
      <svg
        aria-hidden="true"
        className="h-full w-full"
        style={{ transform: "rotate(-90deg)" }}
        viewBox="0 0 140 140"
      >
        <circle cx="70" cy="70" fill="none" r={R} stroke="#f1f5f9" strokeWidth="20" />
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx="70"
            cy="70"
            fill="none"
            r={R}
            stroke={arc.color}
            strokeDasharray={`${Math.max(0, arc.len - 2.5)} ${C}`}
            strokeDashoffset={arc.dashoffset}
            strokeWidth="20"
          />
        ))}
      </svg>
    </div>
  );
}

// ── Commentary ─────────────────────────────────────────────────────────────

type CommentaryProps = {
  numFmt: Intl.NumberFormat;
  solde: number;
  symbol: string;
  totalDepenses: number;
  totalInvestissements: number;
  totalRevenus: number;
};

function Commentary({
  totalRevenus,
  totalDepenses,
  totalInvestissements,
  solde,
  symbol,
  numFmt,
}: CommentaryProps) {
  if (totalRevenus === 0) return null;

  const f            = (n: number) => `${numFmt.format(n)} ${symbol}`;
  const savingsRate  = (totalInvestissements / totalRevenus) * 100;
  const maxRate      = Math.max(0, (totalInvestissements + solde) / totalRevenus) * 100;
  const isPositive   = solde >= 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#F6F9FC] px-5 py-5 sm:px-7">
      <p className="type-body text-slate-700" style={{ lineHeight: "1.75" }}>
        {isPositive ? (
          <>
            Votre taux d&apos;épargne est de{" "}
            <strong className="text-zepargn-navy">{savingsRate.toFixed(2)}%</strong>
            {maxRate > savingsRate && (
              <>
                {" "}(taux d&apos;épargne possible :{" "}
                <strong className="text-zepargn-navy">{maxRate.toFixed(2)}%</strong>)
              </>
            )}
            . Vous disposez d&apos;un revenu total de{" "}
            <strong className="text-zepargn-navy">{f(totalRevenus)}</strong>
            {totalDepenses > 0 && (
              <>
                , vos dépenses s&apos;élèvent à{" "}
                <strong className="text-zepargn-navy">{f(totalDepenses)}</strong>
              </>
            )}
            {totalInvestissements > 0 && (
              <>
                {totalDepenses > 0 ? " et" : ","} vous investissez{" "}
                <strong className="text-zepargn-navy">{f(totalInvestissements)}</strong> par mois
              </>
            )}
            . Il vous reste{" "}
            <strong className="text-green-600">{f(solde)}</strong> disponibles.
          </>
        ) : (
          <>
            Vos sorties totales (
            <strong className="text-zepargn-navy">{f(totalDepenses + totalInvestissements)}</strong>)
            {" "}dépassent vos revenus (
            <strong className="text-zepargn-navy">{f(totalRevenus)}</strong>) de{" "}
            <strong className="text-zepargn-orange">{f(Math.abs(solde))}</strong>.
            {" "}Réduisez vos dépenses ou augmentez vos revenus pour rétablir l&apos;équilibre.
          </>
        )}
      </p>
    </div>
  );
}

// ── BudgetCalculator ───────────────────────────────────────────────────────

export function BudgetCalculator() {
  const [activeTab,    setActiveTab]    = useState<SectionKey>("revenus");
  const [currencyCode, setCurrencyCode] = useState("XOF");

  const [sections, setSections] = useState<Record<SectionKey, Row[]>>({
    revenus:         makeRows(DEFAULT_ROWS.revenus),
    depenses:        makeRows(DEFAULT_ROWS.depenses),
    investissements: makeRows(DEFAULT_ROWS.investissements),
  });

  // ── Currency ────────────────────────────────────────────────────────────

  const currency = CURRENCIES.find(c => c.code === currencyCode) ?? CURRENCIES[0];
  const numFmt   = useMemo(
    () => new Intl.NumberFormat(currency.locale, { maximumFractionDigits: 0 }),
    [currency.locale]
  );
  const f = (n: number) => `${numFmt.format(n)} ${currency.symbol}`;

  // ── Totals ───────────────────────────────────────────────────────────────

  const totalRevenus         = useMemo(() => sumRows(sections.revenus),         [sections.revenus]);
  const totalDepenses        = useMemo(() => sumRows(sections.depenses),        [sections.depenses]);
  const totalInvestissements = useMemo(() => sumRows(sections.investissements), [sections.investissements]);
  const totalSorties         = totalDepenses + totalInvestissements;
  const solde                = totalRevenus - totalSorties;
  const isPositive           = solde >= 0;

  // ── Mutations ────────────────────────────────────────────────────────────

  function addRow(section: SectionKey) {
    setSections(prev => ({
      ...prev,
      [section]: [...prev[section], { id: newId(), label: "", amount: 0 }],
    }));
  }

  function removeRow(section: SectionKey, id: string) {
    setSections(prev => ({
      ...prev,
      [section]: prev[section].filter(r => r.id !== id),
    }));
  }

  function changeLabel(section: SectionKey, id: string, label: string) {
    setSections(prev => ({
      ...prev,
      [section]: prev[section].map(r => (r.id === id ? { ...r, label } : r)),
    }));
  }

  function changeAmount(section: SectionKey, id: string, raw: number) {
    const amount = Number.isFinite(raw) ? Math.max(0, raw) : 0;
    setSections(prev => ({
      ...prev,
      [section]: prev[section].map(r => (r.id === id ? { ...r, amount } : r)),
    }));
  }

  // ── Chart data ────────────────────────────────────────────────────────────

  const donutSegments = [
    { color: SECTION_COLOR.depenses,        value: totalDepenses },
    { color: SECTION_COLOR.investissements, value: totalInvestissements },
    { color: "#86efac",                     value: Math.max(0, solde) },
  ];

  const donutBase = totalDepenses + totalInvestissements + Math.max(0, solde);

  const legendItems = [
    { color: SECTION_COLOR.depenses,        label: "Dépenses",        value: totalDepenses },
    { color: SECTION_COLOR.investissements, label: "Investissements", value: totalInvestissements },
    { color: "#22c55e",                     label: "Solde disponible",value: Math.max(0, solde) },
  ].filter(s => s.value > 0);

  const activeRows = sections[activeTab];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">

      {/* ── TOP BAR: currency only ───────────────────────────────────────── */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2.5">
          <label className="type-label text-slate-400" htmlFor="currency">Devise</label>
          <select
            className="type-input min-h-9 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-zepargn-navy"
            id="currency"
            value={currencyCode}
            onChange={e => setCurrencyCode(e.target.value)}
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── SECTION SELECTOR ─────────────────────────────────────────────── */}
      <div className="flex gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1">
        {SECTIONS.map(sec => {
          const isActive = activeTab === sec.key;
          return (
            <button
              key={sec.key}
              aria-pressed={isActive}
              className={`flex-1 rounded-xl px-3 py-2.5 transition-all type-button ${
                isActive
                  ? "bg-white text-zepargn-navy shadow-soft"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              type="button"
              onClick={() => setActiveTab(sec.key)}
            >
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* ── MAIN GRID: editor left, chart right ──────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">

        {/* ── EDITOR ────────────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">

          {/* Column headers */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-2 sm:px-7">
            <span className="type-label flex-1 text-slate-400">Nom</span>
            <span className="type-label w-32 text-right text-slate-400">Montant</span>
            <span className="w-9 flex-shrink-0" />
          </div>

          {/* Row list */}
          <div className="divide-y divide-slate-50 px-5 sm:px-7">
            {activeRows.length === 0 && (
              <p className="type-small py-5 text-slate-400">
                Aucune ligne. Ajoutez-en une ci-dessous.
              </p>
            )}

            {activeRows.map(row => (
              <div key={row.id} className="flex items-center gap-3 py-3">
                <input
                  aria-label="Nom"
                  className="type-input flex-1 border-0 bg-transparent py-1 text-zepargn-navy outline-none placeholder:text-slate-300"
                  placeholder="Libellé"
                  type="text"
                  value={row.label}
                  onChange={e => changeLabel(activeTab, row.id, e.target.value)}
                />
                <input
                  aria-label="Montant"
                  className="type-input w-32 border-0 bg-transparent py-1 text-right text-zepargn-navy outline-none placeholder:text-slate-300"
                  inputMode="numeric"
                  min={0}
                  placeholder="0"
                  type="number"
                  value={row.amount || ""}
                  onChange={e => changeAmount(activeTab, row.id, Number(e.target.value))}
                />
                <button
                  aria-label={`Supprimer ${row.label || "cette ligne"}`}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-red-50 hover:text-red-400"
                  type="button"
                  onClick={() => removeRow(activeTab, row.id)}
                >
                  <svg aria-hidden="true" fill="none" height="13" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="13">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add row */}
          <div className="border-t border-slate-100 px-5 py-3 sm:px-7">
            <button
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 type-button"
              type="button"
              onClick={() => addRow(activeTab)}
            >
              <svg aria-hidden="true" fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" viewBox="0 0 24 24" width="12">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Ajouter une ligne
            </button>
          </div>
        </div>

        {/* ── CHART ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Summary card */}
          <div className="rounded-3xl bg-zepargn-navy p-5 text-white shadow-soft sm:p-6">
            <dl className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="type-label text-slate-400">Revenus</dt>
                <dd className="type-link font-semibold text-white">{f(totalRevenus)}</dd>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-baseline justify-between gap-3">
                <dt className="type-label text-slate-400">Dépenses</dt>
                <dd className="type-link font-semibold text-white">{f(totalDepenses)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="type-label text-slate-400">Investissements</dt>
                <dd className="type-link font-semibold text-white">{f(totalInvestissements)}</dd>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-baseline justify-between gap-3">
                <dt className="type-label text-slate-400">Solde</dt>
                <dd
                  className="type-link font-semibold"
                  style={{ color: isPositive ? "#86efac" : "#f97316" }}
                >
                  {isPositive ? "+" : ""}{f(solde)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Flux donut */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
            <h3 className="type-h3 text-zepargn-navy">Flux de budget</h3>

            <div className="mt-5">
              <DonutChart segments={donutSegments} />
            </div>

            {/* Legend */}
            <ul className="mt-5 space-y-3">
              {legendItems.map(item => {
                const pct = donutBase > 0 ? (item.value / donutBase) * 100 : 0;
                return (
                  <li key={item.label}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="type-small text-slate-500">{item.label}</span>
                      </div>
                      <span className="type-small font-semibold text-zepargn-navy">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Allocation bar */}
            {totalRevenus > 0 && (
              <div className="mt-5">
                <p className="type-label mb-2 text-slate-400">Allocation</p>
                <div
                  aria-label="Répartition des revenus"
                  className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100"
                  role="img"
                >
                  {totalDepenses > 0 && (
                    <div
                      style={{
                        width: `${Math.min((totalDepenses / totalRevenus) * 100, 100)}%`,
                        backgroundColor: SECTION_COLOR.depenses,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {totalInvestissements > 0 && (
                    <div
                      style={{
                        width: `${Math.min((totalInvestissements / totalRevenus) * 100, 100)}%`,
                        backgroundColor: SECTION_COLOR.investissements,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {isPositive && solde > 0 && (
                    <div
                      style={{
                        width: `${(solde / totalRevenus) * 100}%`,
                        backgroundColor: "#22c55e",
                        opacity: 0.35,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── COMMENTARY ───────────────────────────────────────────────────── */}
      <Commentary
        numFmt={numFmt}
        solde={solde}
        symbol={currency.symbol}
        totalDepenses={totalDepenses}
        totalInvestissements={totalInvestissements}
        totalRevenus={totalRevenus}
      />
    </div>
  );
}
