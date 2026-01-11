import { standardizeType } from "./wasteClassification.ts";

function formatDateICS(date: Date): string {
  // All-day events require YYYYMMDD (no time)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

// -PT12H (12 hours before)
// -PT2H (2 hours before)
// -P2D (2 days before)
function buildAlarm(): string[] {
  return [
    "BEGIN:VALARM",
    "TRIGGER:-PT2H", // 2 hours before
    "ACTION:DISPLAY",
    "DESCRIPTION:Afvalkalender herinnering",
    "END:VALARM",
  ];
}


function createICSText(events: { type: string; jsDate: Date }[]): string {
    const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//YourApp//NL Waste Calendar//EN",
  ];

  for (const ev of events) {
    const dt = formatDateICS(ev.jsDate);
    const summary = standardizeType(ev.type);
    const uid = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${formatDateICS(new Date())}T000000Z`,
      `DTSTART;VALUE=DATE:${dt}`,
      `SUMMARY:${summary}`,
      ...buildAlarm(),  // inject reminder block
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export { createICSText as createICSFile };
