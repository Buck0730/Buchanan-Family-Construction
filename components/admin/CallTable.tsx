import type { CallRow } from "@/lib/supabase";

function formatWhen(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CallTable({ calls }: { calls: CallRow[] }) {
  if (calls.length === 0) {
    return (
      <div className="border border-steel bg-concrete p-10 text-center">
        <p className="font-display text-2xl uppercase text-bone">
          No calls yet
        </p>
        <p className="mt-2 text-sm text-fog">
          AI-handled calls will appear here with a summary and recording link.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-steel">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-steel bg-concrete text-xs uppercase tracking-[0.16em] text-fog">
            <th className="px-5 py-4 font-medium">When</th>
            <th className="px-5 py-4 font-medium">Caller</th>
            <th className="px-5 py-4 font-medium">Summary</th>
            <th className="px-5 py-4 font-medium">Rec.</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => (
            <tr
              key={call.id}
              className="border-b border-steel/60 align-top last:border-0"
            >
              <td className="whitespace-nowrap px-5 py-4 text-fog">
                {formatWhen(call.created_at)}
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-bone">
                {call.caller_number ?? "Unknown"}
                {call.handled_by === "forwarded" && (
                  <span className="ml-2 text-xs uppercase text-fog">
                    (forwarded)
                  </span>
                )}
              </td>
              <td className="max-w-md px-5 py-4 text-bone">
                {call.summary ?? (
                  <span className="text-fog">No summary</span>
                )}
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                {call.recording_url ? (
                  <a
                    href={call.recording_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-hazard hover:underline"
                  >
                    Play
                  </a>
                ) : (
                  <span className="text-fog">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
