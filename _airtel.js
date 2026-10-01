// Airtel Money Open API (USSD push collection). Safaricom's Daraja cannot prompt Airtel lines, so they use this.
const BASE = process.env.AIRTEL_ENV === "production" ? "https://openapi.airtel.africa" : "https://openapiuat.airtel.africa";
async function headers() {
  const r = await fetch(BASE + "/auth/oauth2/token", {method: "POST", headers: {"Content-Type": "application/json"},
    body: JSON.stringify({client_id: process.env.AIRTEL_CLIENT_ID, client_secret: process.env.AIRTEL_CLIENT_SECRET, grant_type: "client_credentials"})});
  const {access_token} = await r.json();
  return {"Content-Type": "application/json", Accept: "*/*", "X-Country": "KE", "X-Currency": "KES", Authorization: "Bearer " + access_token};
}
async function collect(msisdn, amount, order) {   // msisdn without the 254 prefix
  const r = await fetch(BASE + "/merchant/v1/payments/", {method: "POST", headers: await headers(), body: JSON.stringify({
    reference: "Ians Biashara Grid", subscriber: {country: "KE", currency: "KES", msisdn},
    transaction: {amount, country: "KE", currency: "KES", id: order}})});
  const d = await r.json();
  if (!(d.status && d.status.success)) throw new Error((d.status && d.status.message) || "Airtel Money rejected the request.");
  return order;
}
async function query(id) {   // TS = success, TF = failed, TE = expired, TIP = in progress
  const r = await fetch(BASE + "/standard/v1/payments/" + encodeURIComponent(id), {headers: await headers()});
  const d = await r.json();
  return d.data && d.data.transaction && d.data.transaction.status;
}
module.exports = {collect, query};
