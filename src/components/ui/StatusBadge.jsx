import { cn } from "../../lib/utils";

export default function StatusBadge({ status }) {
  const isAvailable = status === "Available";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md uppercase tracking-wide backdrop-blur-sm",
        isAvailable
          ? "bg-success/15 text-success border border-success/20"
          : "bg-error/15 text-error border border-error/20",
      )}
    >
      <span className="relative flex items-center justify-center w-2 h-2">
        {/* Pulse ring for available */}
        {isAvailable && (
          <span className="absolute w-full h-full rounded-full bg-success animate-pulse-dot" />
        )}
        <span
          className={cn(
            "relative w-1.5 h-1.5 rounded-full",
            isAvailable ? "bg-success" : "bg-error",
          )}
        />
      </span>
      {status}
    </span>
  );
}
