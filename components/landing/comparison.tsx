const rows = [
  {
    label: "Approach",
    nsaids: "Blocks pain & inflammation systemically",
    glucosamine: "Provides cartilage building blocks",
    seniorFood: "General nutritional support",
    lcl: "Supports tissue repair via multiple pathways",
  },
  {
    label: "Vet oversight",
    nsaids: "Prescription required",
    glucosamine: "None — available over the counter",
    seniorFood: "None",
    lcl: "Full telehealth consult + ongoing monitoring",
  },
  {
    label: "Long-term risks",
    nsaids: "Liver & kidney risk with prolonged use",
    glucosamine: "Minimal known risks",
    seniorFood: "None",
    lcl: "No adverse events in published safety studies",
  },
  {
    label: "Dosing",
    nsaids: "Weight-based, standardized",
    glucosamine: "One-size-fits-all",
    seniorFood: "Breed/age based",
    lcl: "Weight-based Rx using published PK data",
  },
  {
    label: "Quality control",
    nsaids: "FDA-approved manufacturing",
    glucosamine: "No required testing or verification",
    seniorFood: "AAFCO standards",
    lcl: "Licensed 503A pharmacy, verified potency",
  },
];

const columns = [
  { key: "nsaids" as const, name: "NSAIDs" },
  { key: "glucosamine" as const, name: "Glucosamine" },
  { key: "seniorFood" as const, name: "Senior Food" },
  { key: "lcl" as const, name: "Long Companion Labs", highlight: true },
];

export function Comparison() {
  return (
    <section className="bg-stone-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
            A Better Approach to Senior Dog Care
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            Each option has a role. We believe peptide therapy fills a gap that
            existing approaches leave open — targeted tissue repair under
            veterinary supervision.
          </p>
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
                        ? "bg-[#0D7377]/10 text-[#0D7377]"
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
                          ? "bg-[#0D7377]/10 font-medium text-stone-900"
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
                      col.highlight ? "bg-[#0D7377]/10" : ""
                    }`}
                  >
                    <span
                      className={`shrink-0 font-medium ${
                        col.highlight ? "text-[#0D7377]" : "text-stone-500"
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
