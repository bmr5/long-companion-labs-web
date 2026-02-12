const rows = [
  {
    label: "Root cause",
    nsaids: "Masks pain only",
    glucosamine: "Partial cartilage support",
    seniorFood: "General nutrition",
    puptides: "Supports tissue repair at the cellular level",
  },
  {
    label: "Side effects",
    nsaids: "Liver & kidney risk with long-term use",
    glucosamine: "Minimal",
    seniorFood: "None",
    puptides: "None reported",
  },
  {
    label: "Time to results",
    nsaids: "Hours (symptom relief only)",
    glucosamine: "2–4 months",
    seniorFood: "Minimal change",
    puptides: "2–4 weeks",
  },
  {
    label: "Ease of use",
    nsaids: "Pill (often refused)",
    glucosamine: "Pill or powder",
    seniorFood: "Mixed into meals",
    puptides: "A treat they love",
  },
];

const columns = [
  { key: "nsaids" as const, name: "NSAIDs" },
  { key: "glucosamine" as const, name: "Glucosamine" },
  { key: "seniorFood" as const, name: "Senior Food" },
  { key: "puptides" as const, name: "Puptides", highlight: true },
];

export function Comparison() {
  return (
    <section className="bg-stone-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            Why Dog Owners Are Switching to Puptides
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-stone-400">
                  &nbsp;
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-4 text-xs font-medium uppercase tracking-wider ${
                      col.highlight
                        ? "bg-[#C4A484]/10 text-[#A0845C]"
                        : "text-stone-500"
                    }`}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={
                    i < rows.length - 1 ? "border-b border-stone-100" : ""
                  }
                >
                  <td className="px-6 py-4 font-medium text-stone-900">
                    {row.label}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 ${
                        col.highlight
                          ? "bg-[#C4A484]/10 font-medium text-stone-900"
                          : "text-stone-600"
                      }`}
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {rows.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-stone-200 bg-white p-5"
            >
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-400">
                {row.label}
              </p>
              <div className="space-y-2 text-sm">
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={`flex items-start justify-between gap-4 rounded-lg px-3 py-2 ${
                      col.highlight ? "bg-[#C4A484]/10" : ""
                    }`}
                  >
                    <span
                      className={`shrink-0 font-medium ${
                        col.highlight ? "text-[#A0845C]" : "text-stone-500"
                      }`}
                    >
                      {col.name}
                    </span>
                    <span
                      className={`text-right ${
                        col.highlight
                          ? "font-medium text-stone-900"
                          : "text-stone-600"
                      }`}
                    >
                      {row[col.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
