// Run once: npx tsx scripts/setup-sheet.ts
// Adds header row to the waitlist sheet

import { appendToSheet } from "../lib/google-sheets";

async function main() {
  await appendToSheet([["Timestamp", "Email", "Size Selected", "Source"]]);
  console.log("Headers added to sheet!");
}

main().catch(console.error);
