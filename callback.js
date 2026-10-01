// Safaricom (and Airtel, if you set this URL in their portal) post the final result here.
// Results appear in your host's function logs. To keep permanent order records, save req.body to a database here.
module.exports = (req, res) => {
  console.log("Payment callback:", JSON.stringify(req.body));
  res.json({ResultCode: 0, ResultDesc: "Accepted"});
};
