
const dutchMonths: Record<string, number> = {
  januari: 0,
  februari: 1,
  maart: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  augustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  december: 11,
};

function parseDutchDate(str: string): Date {
  // Example input: "woensdag 07 januari"
  const parts = str.split(" ");

  // parts[1] = "07"
  // parts[2] = "januari"
  const day = Number(parts[1]);
  const monthName = parts[2].toLowerCase();

  const month = dutchMonths[monthName];
  if (month === undefined) {
    throw new Error(`Unknown month: ${monthName}`);
  }

  // Choose a year — often the next upcoming date
  const currentYear = new Date().getFullYear();

  return new Date(currentYear, month, day, 0, 0, 0, 0);
}
export {
  parseDutchDate,
};