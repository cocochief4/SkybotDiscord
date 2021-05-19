const fetch = require("node-fetch");
const testJson = { name: "John", age: 30, car: null };
const BAZAAR_URL = "https://api.hypixel.net/skyblock/bazaar";

async function getBazaar() {
  console.log("fetching bazaar");
  let response = await fetch("https://api.hypixel.net/skyblock/bazaar");
  let bzData = await response.json();
  console.log(bzData.products.ENCHANTED_IRON.quick_status.buyPrice);
  return bzData;
}
/*function getBazaar()
{
  console.log('test fetch');
  let response = testJson;
  return response.json();
}*/

module.exports = { getBazaar };
