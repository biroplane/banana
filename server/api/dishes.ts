import Airtable from 'airtable';

interface DishField {
  enabled: boolean;
  order: number;
  section: string;
  [key: string]: any;
}

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig();
  const AIRTABLE_API_TOKEN = config.AIRTABLE_API_TOKEN;
  const AIRTABLE_BASE = config.AIRTABLE_BASE || config.public.AIRTABLE_BASE;
  const AIRTABLE_TABLE = 'tblq3WpQ23wvwvHQg';  
  const base = new Airtable({ apiKey: AIRTABLE_API_TOKEN }).base(AIRTABLE_BASE);
  const _data = await base(AIRTABLE_TABLE).select({ maxRecords: 999, view: "Grid view" }).all()

  const _fields = (_data.map(d => d.fields as unknown as DishField))
    .filter(d => d.enabled)
    .sort((a, b) => {
      const orderA = typeof a.order === 'number' ? a.order : 0;
      const orderB = typeof b.order === 'number' ? b.order : 0;
      return orderA - orderB;
    })

  const obj: Record<string, DishField[]> = {}

  _fields.forEach((value) => {
    const _idx = value.section || 'Unknown'
    if (!obj[_idx]) {
      obj[_idx] = []
    }
    obj[_idx].push(value)
  })

  return obj
});
