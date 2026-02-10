import { cn } from "../../lib/utils";

export default function StatusBadge({ status }) {
  const isAvailable = status === "Available";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md uppercase tracking-wide",
        isAvailable ? "bg-success/10 text-success" : "bg-error/10 text-error",
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          isAvailable ? "bg-success" : "bg-error",
        )}
      />
      {status}
    </span>
  );
}
