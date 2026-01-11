import { DOMParser } from "./deps.ts";

import {parseDutchDate} from "./dateHelper.ts";

async function scrapePage(url: string) {
  // Fetch the page
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  return await res.text();
}

function parseHtml(html: string) {
  const result = [];

  // Parse HTML
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (!doc) {
    throw new Error("Failed to parse HTML");
  }

  // Extract data
  const monthsSection = doc.getElementById('month-sections')?.getElementsByTagName('p');
  for (const collectionDayDivs of monthsSection || []) {
    const spans = collectionDayDivs.getElementsByTagName('span');
    result.push({
      date: spans[0]?.innerText || '',
      type: spans[1]?.innerText || '',
      jsDate: parseDutchDate(spans[0]?.innerText || ''),
    })
  }

  return result;
}

export {
  scrapePage,
  parseHtml
}