// Lets the website (for example on GitHub Pages) call this server. Set ALLOWED_ORIGIN to your site address to restrict it.
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") { res.status(204).end(); return true; }
};
