const EXPERIMENT_DEFINITIONS = {
  hero_title: ["a", "b"],
  section_order: ["a", "b"],
  proof_type: ["a", "b"]
} as const;

type ExperimentKey = keyof typeof EXPERIMENT_DEFINITIONS;
type ExperimentVariant<K extends ExperimentKey = ExperimentKey> = (typeof EXPERIMENT_DEFINITIONS)[K][number];

type EventPayload = Record<string, string | number | boolean | null | undefined>;

const STORAGE_PREFIX = "zepargn_exp_";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: "event", eventName: string, params?: Record<string, unknown>) => void;
    __zepargnExperiments?: Partial<Record<ExperimentKey, string>>;
  }
}

function isClient() {
  return typeof window !== "undefined";
}

function getStorageKey(experiment: ExperimentKey) {
  return `${STORAGE_PREFIX}${experiment}`;
}

function getQueryVariant(experiment: ExperimentKey): ExperimentVariant | null {
  if (!isClient()) {
    return null;
  }

  const candidate = new URLSearchParams(window.location.search).get(`exp_${experiment}`);
  const allowed = EXPERIMENT_DEFINITIONS[experiment] as readonly string[];

  if (!candidate || !allowed.includes(candidate)) {
    return null;
  }

  return candidate as ExperimentVariant;
}

function getStoredVariant(experiment: ExperimentKey): ExperimentVariant | null {
  if (!isClient()) {
    return null;
  }

  const stored = window.localStorage.getItem(getStorageKey(experiment));
  const allowed = EXPERIMENT_DEFINITIONS[experiment] as readonly string[];

  if (!stored || !allowed.includes(stored)) {
    return null;
  }

  return stored as ExperimentVariant;
}

function pickVariant(experiment: ExperimentKey): ExperimentVariant {
  const options = EXPERIMENT_DEFINITIONS[experiment];
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

export function getExperimentVariant(experiment: ExperimentKey): ExperimentVariant {
  if (!isClient()) {
    return "a";
  }

  const forced = getQueryVariant(experiment);
  const resolved = forced ?? getStoredVariant(experiment) ?? pickVariant(experiment);

  window.localStorage.setItem(getStorageKey(experiment), resolved);
  window.__zepargnExperiments = {
    ...(window.__zepargnExperiments ?? {}),
    [experiment]: resolved
  };

  return resolved;
}

export function getAllExperimentVariants() {
  return Object.keys(EXPERIMENT_DEFINITIONS).reduce(
    (accumulator, key) => {
      const experiment = key as ExperimentKey;
      accumulator[experiment] = getExperimentVariant(experiment);
      return accumulator;
    },
    {} as Record<ExperimentKey, ExperimentVariant>
  );
}

export function trackEvent(event: string, payload: EventPayload = {}) {
  if (!isClient()) {
    return;
  }

  const experiments = getAllExperimentVariants();
  const eventPayload = {
    event,
    ...payload,
    path: window.location.pathname,
    experiments
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(eventPayload);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, eventPayload);
  }
}

export function trackDownloadClick(source: string, platform: "ios" | "android") {
  trackEvent("download_click", {
    source,
    platform
  });
}

