interface Rule {
  keywords: string[];
  color: string;      // text color
  emoji: string;      // visual bin color
  label: string;      // normalized label
}

const rules: Rule[] = [
  {
    keywords: ["pmd", "plastic", "metalen", "drankkarton"],
    color: "ORANJE",
    emoji: "🟧",
    label: "PMD",
  },
  {
    keywords: ["gft", "groente", "fruit", "tuinafval", "etensresten"],
    color: "GROEN",
    emoji: "🟩",
    label: "GFT",
  },
  {
    keywords: ["rest", "restafval"],
    color: "GRAUW",
    emoji: "⬛️",
    label: "Restafval",
  },
  {
    keywords: ["papier", "karton"],
    color: "BLAUW",
    emoji: "🟦",
    label: "Papier",
  },
];

function standardizeType(original: string): string {
  const lower = original.toLowerCase();

  for (const rule of rules) {
    const match = rule.keywords.some(kw => lower.includes(kw));
    if (match) {
      return `${rule.emoji} ${rule.color} – ${rule.label}`;
    }
  }

  // fallback if not recognized
  return original;
}

export { standardizeType };