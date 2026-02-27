"use client";

import { useMemo, useState } from "react";

type DurationKey = "m6" | "m12" | "m24" | "m24plus";

type DurationOption = {
  key: DurationKey;
  label: string;
  months: number;
};

type RateBand = {
  key: string;
  trancheLabel: string;
  min: number;
  max: number | null;
  rates: Record<DurationKey, number>;
};

const DURATION_OPTIONS: DurationOption[] = [
  { key: "m6", label: "6 mois", months: 6 },
  { key: "m12", label: "12 mois", months: 12 },
  { key: "m24", label: "24 mois", months: 24 },
  { key: "m24plus", label: "Plus de 24 mois (référence 36 mois)", months: 36 }
];

const ZLOCK_RATE_BANDS: RateBand[] = [
  {
    key: "b1",
    trancheLabel: "50 000 - 99 999",
    min: 50_000,
    max: 99_999,
    rates: { m6: 3, m12: 3.25, m24: 3.5, m24plus: 4 }
  },
  {
    key: "b2",
    trancheLabel: "100 001 - 999 999",
    min: 100_001,
    max: 999_999,
    rates: { m6: 3.25, m12: 3.75, m24: 4, m24plus: 4.5 }
  },
  {
    key: "b3",
    trancheLabel: "1 000 001 - 2 999 999",
    min: 1_000_001,
    max: 2_999_999,
    rates: { m6: 3.5, m12: 4.25, m24: 4.5, m24plus: 4.75 }
  },
  {
    key: "b4",
    trancheLabel: "3 000 001 - 4 999 999",
    min: 3_000_001,
    max: 4_999_999,
    rates: { m6: 4.5, m12: 4.75, m24: 5, m24plus: 5.25 }
  },
  {
    key: "b5",
    trancheLabel: "≥ 5 000 001",
    min: 5_000_001,
    max: null,
    rates: { m6: 5, m12: 5, m24: 5.75, m24plus: 6 }
  }
];

const moneyFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

function resolveRateBand(amount: number) {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;

  const exactBand = ZLOCK_RATE_BANDS.find((band) => {
    const inLower = safeAmount >= band.min;
    const inUpper = band.max === null ? true : safeAmount <= band.max;
    return inLower && inUpper;
  });

  if (exactBand) {
    return exactBand;
  }

  return [...ZLOCK_RATE_BANDS].reverse().find((band) => safeAmount >= band.min) ?? ZLOCK_RATE_BANDS[0];
}

function formatRate(value: number) {
  if (Number.isInteger(value)) {
    return `${value}%`;
  }

  return `${value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}%`;
}

export function SimulatorCalculator() {
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>("m12");
  const [initial, setInitial] = useState<number>(250_000);
  const [monthly, setMonthly] = useState<number>(50_000);

  const duration = useMemo(
    () => DURATION_OPTIONS.find((item) => item.key === selectedDuration) ?? DURATION_OPTIONS[1],
    [selectedDuration]
  );

  const band = useMemo(() => resolveRateBand(initial), [initial]);
  const annualRate = band.rates[selectedDuration] / 100;

  const result = useMemo(() => {
    const safeInitial = Number.isFinite(initial) ? Math.max(0, initial) : 0;
    const safeMonthly = Number.isFinite(monthly) ? Math.max(0, monthly) : 0;

    const totalDeposits = safeInitial + safeMonthly * duration.months;

    const initialInterest = safeInitial * annualRate * (duration.months / 12);

    let recurringInterest = 0;
    for (let month = 1; month <= duration.months; month += 1) {
      const remainingMonths = duration.months - month;
      recurringInterest += safeMonthly * annualRate * (remainingMonths / 12);
    }

    const gains = initialInterest + recurringInterest;
    const estimatedTotal = totalDeposits + gains;

    return {
      totalDeposits,
      gains,
      estimatedTotal
    };
  }, [annualRate, duration.months, initial, monthly]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <form
          aria-label="Formulaire du simulateur"
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-7"
          data-reveal=""
          data-reveal-delay="40"
        >
          <p className="micro-accent text-zepargn-orange">Paramètres</p>
          <h2 className="type-h2 mt-3 text-zepargn-navy">Simulateur Z-Lock</h2>

          <label className="type-link mt-6 block text-zepargn-navy" htmlFor="duration">
            Durée
          </label>
          <select
            className="type-input mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-zepargn-navy"
            id="duration"
            onChange={(event) => setSelectedDuration(event.target.value as DurationKey)}
            value={selectedDuration}
          >
            {DURATION_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="type-link mt-5 block text-zepargn-navy" htmlFor="initial">
            Montant initial (FCFA)
          </label>
          <input
            className="type-input mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-zepargn-navy"
            id="initial"
            inputMode="numeric"
            min={0}
            onChange={(event) => setInitial(Number(event.target.value))}
            type="number"
            value={Number.isNaN(initial) ? 0 : initial}
          />

          <label className="type-link mt-5 block text-zepargn-navy" htmlFor="monthly">
            Dépôt mensuel (FCFA)
          </label>
          <input
            className="type-input mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-zepargn-navy"
            id="monthly"
            inputMode="numeric"
            min={0}
            onChange={(event) => setMonthly(Number(event.target.value))}
            type="number"
            value={Number.isNaN(monthly) ? 0 : monthly}
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-[#F6F9FC] p-4">
              <p className="type-label text-slate-500">Tranche appliquée</p>
              <p className="type-link mt-2 text-zepargn-navy">{band.trancheLabel} FCFA</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-[#F6F9FC] p-4">
              <p className="type-label text-slate-500">Taux annuel</p>
              <p className="type-link mt-2 text-zepargn-navy">{formatRate(band.rates[selectedDuration])}</p>
            </article>
          </div>

          <p className="type-small mt-4 text-slate-500">
            Estimation indicative sur la base de la grille de référence fournie. Les conditions finales peuvent varier au
            moment de la souscription.
          </p>
        </form>

        <aside className="rounded-3xl bg-zepargn-navy p-5 text-white shadow-soft sm:p-7" data-reveal="" data-reveal-delay="120">
          <p className="micro-accent text-zepargn-sky">Projection</p>
          <h3 className="type-h2 mt-3">Votre estimation</h3>
          <p className="type-body mt-2 text-slate-200">
            Hypothèse calculée sur {duration.months} mois avec le taux de la tranche sélectionnée.
          </p>

          <dl className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <dt className="type-label text-slate-200">Total déposé</dt>
              <dd className="type-metric mt-1">
                {moneyFormatter.format(result.totalDeposits)} FCFA
              </dd>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <dt className="type-label text-slate-200">Gains estimés</dt>
              <dd className="type-metric mt-1 text-zepargn-sky">
                {moneyFormatter.format(result.gains)} FCFA
              </dd>
            </div>

            <div className="rounded-2xl bg-white p-4 text-zepargn-navy">
              <dt className="type-label text-slate-500">Montant final estimé</dt>
              <dd className="type-metric mt-1">
                {moneyFormatter.format(result.estimatedTotal)} FCFA
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft" data-reveal="" data-reveal-delay="80">
        <div className="border-b border-slate-200 bg-[#F6F9FC] px-5 py-4 sm:px-6">
          <h3 className="type-h3 text-zepargn-navy">Tableau des taux de référence</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="type-table min-w-[820px] w-full border-collapse text-left">
            <thead className="bg-white">
              <tr>
                <th className="px-5 py-3 font-semibold text-slate-700 sm:px-6">Tranche (FCFA)</th>
                <th className="px-5 py-3 font-semibold text-slate-700">6 MOIS</th>
                <th className="px-5 py-3 font-semibold text-slate-700">12 MOIS</th>
                <th className="px-5 py-3 font-semibold text-slate-700">24 MOIS</th>
                <th className="px-5 py-3 font-semibold text-slate-700">PLUS DE 24 MOIS</th>
              </tr>
            </thead>
            <tbody>
              {ZLOCK_RATE_BANDS.map((row) => (
                <tr className="border-t border-slate-200" key={row.key}>
                  <td className="px-5 py-3 font-semibold text-zepargn-navy sm:px-6">{row.trancheLabel}</td>
                  <td className="px-5 py-3 text-slate-700">{formatRate(row.rates.m6)}</td>
                  <td className="px-5 py-3 text-slate-700">{formatRate(row.rates.m12)}</td>
                  <td className="px-5 py-3 text-slate-700">{formatRate(row.rates.m24)}</td>
                  <td className="px-5 py-3 text-slate-700">{formatRate(row.rates.m24plus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="type-small border-t border-slate-200 bg-white px-5 py-3 text-slate-500 sm:px-6">
          * Les taux sont exprimés en pourcentage annuel.
        </p>
      </section>
    </div>
  );
}
