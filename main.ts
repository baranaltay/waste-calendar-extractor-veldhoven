import { createICSFile } from "./src/icsHelper.ts";
import { scrapePage, parseHtml } from "./src/webHelper.ts";

const POST_CODE = 'your_post_code';
const DOOR_NUMBER = 'your_door_number';

const URL = `https://www.mijnafvalwijzer.nl/nl/${POST_CODE}/${DOOR_NUMBER}/`;
const OUTPUT = "dist/waste_calendar.ics"


if (import.meta.main) {
  const data = await scrapePage(URL);
  const parsedData = parseHtml(data);
  const ics = createICSFile(parsedData);
  await Deno.writeTextFile(OUTPUT, ics);
  console.log(ics);
}