const shouldShowBadge = process.env.NEXT_PUBLIC_SHOW_BUILD_BADGE === "1" && process.env.NODE_ENV !== "production";
const buildId = process.env.NEXT_PUBLIC_BUILD_ID ?? "local";

export function BuildBadge() {
  if (!shouldShowBadge) {
    return null;
  }

  return (
    <div
      aria-label={`Version de build ${buildId}`}
      className="pointer-events-none fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-[max(0.5rem,env(safe-area-inset-left))] z-[80] rounded-full bg-[#031927] px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em] text-white/70 opacity-35"
    >
      Build: {buildId}
    </div>
  );
}
