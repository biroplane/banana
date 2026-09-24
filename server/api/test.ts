

export default defineEventHandler(async (_event) => {
  

  return {
    msg:"HELLO WORLD"
  }
  // return Object.groupBy(
  //   _data.map(d => d.fields),
  //   ({ section }) => (section ?? 'Unknown') as PropertyKey
  // );
});
