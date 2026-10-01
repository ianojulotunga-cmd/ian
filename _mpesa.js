// Safaricom Daraja (M-Pesa Express / STK Push). Secrets come from environment variables only.
const BASE = process.env.MPESA_ENV === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";
const shortcode = process.env.MPESA_SHORTCODE || "174379";
async function token() {
  const auth = Buffer.from(process.env.MPESA_KEY + ":" + process.env.MPESA_SECRET).toString("base64");
  const r = await fetch(BASE + "/oauth/v1/generate?grant_type=client_credentials", {headers: {Authorization: "Basic " + auth}});
  return (await r.json()).access_token;
}
function stamp() {
  const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  return {timestamp, password: Buffer.from(shortcode + process.env.MPESA_PASSKEY + timestamp).toString("base64")};
}
async function post(path, body) {
  const r = await fetch(BASE + path, {method: "POST", headers: {"Content-Type": "application/json", Authorization: "Bearer " + await token()}, body: JSON.stringify(body)});
  return r.json();
}
async function stk(phone, amount, order, host) {
  const {timestamp, password} = stamp();
  const d = await post("/mpesa/stkpush/v1/processrequest", {
    BusinessShortCode: shortcode, Password: password, Timestamp: timestamp, TransactionType: process.env.MPESA_TXN_TYPE || "CustomerPayBillOnline",
    Amount: amount, PartyA: phone, PartyB: process.env.MPESA_PARTYB || shortcode, PhoneNumber: phone,
    CallBackURL: "https://" + host + "/api/callback", AccountReference: order, TransactionDesc: "Ians Biashara Grid"
  });
  if (d.ResponseCode !== "0") throw new Error(d.errorMessage || d.ResponseDescription || "M-Pesa rejected the request.");
  return d.CheckoutRequestID;
}
async function query(id) {
  const {timestamp, password} = stamp();
  return post("/mpesa/stkpushquery/v1/query", {BusinessShortCode: shortcode, Password: password, Timestamp: timestamp, CheckoutRequestID: id});
}
module.exports = {stk, query};
