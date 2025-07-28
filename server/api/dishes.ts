import Airtable from 'airtable';

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig();
  const AIRTABLE_API_TOKEN = config.AIRTABLE_API_TOKEN;
  const AIRTABLE_BASE = config.AIRTABLE_BASE || config.public.AIRTABLE_BASE;
  const AIRTABLE_TABLE = 'Banana';

  const base = new Airtable({ apiKey: AIRTABLE_API_TOKEN }).base(AIRTABLE_BASE);

  const _data = await base(AIRTABLE_TABLE).select({ maxRecords: 999, view: "Grid view" }).all()
  const _fields = _data.map(d => d.fields).sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 0;
    const orderB = typeof b.order === 'number' ? b.order : 0;
    return orderA - orderB;
  })
  const obj = {}

  console.log("FIELDS", _fields)
  _fields.forEach((value) => {
    const _idx = value.section
    if (obj[_idx] == undefined) {
      obj[_idx] = []
    }
    obj[_idx].push(value)
  })

  return obj
  // return Object.groupBy(
  //   _data.map(d => d.fields),
  //   ({ section }) => (section ?? 'Unknown') as PropertyKey
  // );
});
