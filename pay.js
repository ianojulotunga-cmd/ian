const mpesa = require("./_mpesa"), airtel = require("./_airtel");
module.exports = async (req, res) => {
  if (require("./_cors")(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({error: "Use POST"});
  const {phone, amount, network, order} = req.body || {};
  if (!/^254[17]\d{8}$/.test(phone || "") || !(amount >= 1)) return res.status(400).json({error: "Invalid phone number or amount."});
  try {
    const id = network === "airtel"
      ? await airtel.collect(phone.slice(3), Math.round(amount), order)
      : await mpesa.stk(phone, Math.round(amount), order, req.headers.host);
    res.json({id});
  } catch (e) { res.status(502).json({error: e.message}); }
};
