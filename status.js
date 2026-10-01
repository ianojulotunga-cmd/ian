const mpesa = require("./_mpesa"), airtel = require("./_airtel");
module.exports = async (req, res) => {
  if (require("./_cors")(req, res)) return;
  const {network, id} = req.query;
  try {
    if (network === "airtel") {
      const s = await airtel.query(id);
      if (s === "TS") return res.json({state: "paid"});
      if (s === "TF" || s === "TE") return res.json({state: "failed", message: "payment failed, was declined or expired"});
      return res.json({state: "pending"});
    }
    const d = await mpesa.query(id);
    if (d.ResultCode === undefined) return res.json({state: "pending"});   // customer has not answered yet
    res.json(Number(d.ResultCode) === 0 ? {state: "paid"} : {state: "failed", message: d.ResultDesc});
  } catch (e) { res.status(502).json({state: "failed", message: e.message}); }
};
