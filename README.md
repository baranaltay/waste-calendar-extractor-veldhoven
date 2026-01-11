# Waste Calendar Extractor

Small Deno utility that scrapes a Dutch municipal waste-collection page and exports collection dates as an iCalendar (.ics) file.

## Features
- Scrape calendar HTML ([`scrapePage`](src/webHelper.ts) / [`parseHtml`](src/webHelper.ts))
- Parse Dutch dates ([`parseDutchDate`](src/dateHelper.ts))
- Normalize waste types ([`standardizeType`](src/wasteClassification.ts))
- Generate .ics output ([`createICSFile`](src/icsHelper.ts))

## Quickstart

Run directly (needs network + write permissions):

```sh
deno run --allow-net --allow-write main.ts
```

Or use the provided dev task (watching, no write permission in task):

```sh
deno task dev
```

Output file: dist/waste_calendar.ics (sample: [waste_calendar.ics](waste_calendar.ics)).

## Notes
- The scraper targets: https://www.mijnafvalwijzer.nl (configured in [main.ts](main.ts)).
- Change your zip code and door number in [main.ts](main.ts).
- Adjust parsing rules or emojis in [src/wasteClassification.ts](src/wasteClassification.ts).