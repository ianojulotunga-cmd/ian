const $ = s => document.querySelector(s);
const AREAS = {"Nairobi CBD": 250, "Westlands, Nairobi": 250, "Kasarani, Nairobi": 250, "Thika": 400, "Nakuru": 500, "Mombasa": 600, "Kisumu": 600, "Eldoret": 600, "Shop pickup (free)": 0};
const lines = Cart.lines(), hasGoods = lines.some(l => l.p.cat !== "service");
$("#area").innerHTML = Object.keys(AREAS).map(a => `<option>${a}</option>`).join("");
const fee = () => hasGoods ? AREAS[$("#area").value] : 0, total = () => Cart.subtotal() + fee();
function draw() {
  $("#lines").innerHTML = lines.map(l => `<div class="sl"><span>${l.p.name} × ${l.qty}</span><b>${fmt(l.p.price * l.qty)}</b></div>`).join("");
  $("#sub").textContent = fmt(Cart.subtotal());
  $("#fee").textContent = hasGoods ? (fee() ? fmt(fee()) : "Free") : "Not applicable";
  $("#tot").textContent = fmt(total());
}
if (!lines.length) $("#wrap").innerHTML = '<div class="panel empty"><h2>Your cart is empty</h2><p>Add something from the shop first.</p><a class="btn big" href="index.html#shop">Go to shop</a></div>';
else { draw(); $("#area").onchange = draw; }

const guess = v => /^(0|254)?(10\d|73\d|78\d|75[0-6])/.test(v.replace(/\D/g, "")) ? "airtel" : "mpesa";
$("#phone") && ($("#phone").oninput = e => { if (e.target.value.length >= 4) document.querySelector(`input[value=${guess(e.target.value)}]`).checked = true; });
const norm = v => { v = v.replace(/[\s+-]/g, ""); if (/^0[17]\d{8}$/.test(v)) v = "254" + v.slice(1); return /^254[17]\d{8}$/.test(v) ? v : null; };
const say = (t, c = "") => { $("#status").textContent = t; $("#status").className = c; };
const fail = t => { say(t, "err"); $("#go").disabled = false; };

$("#form") && ($("#form").onsubmit = async e => {
  e.preventDefault();
  const phone = norm($("#phone").value), net = document.querySelector("input[name=net]:checked").value;
  if (!phone) return say("Enter a valid Kenyan number, like 0712345678 or 0733123456.", "err");
  const order = "IBG" + Date.now().toString(36).slice(-6).toUpperCase(), amount = total();
  $("#go").disabled = true; say("Sending the payment prompt to your phone…");
  try {
    const r = await fetch(API_BASE + "/api/pay", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({phone, amount, network: net, order})});
    if ([404, 405].includes(r.status)) return demo(order);
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || "The payment request failed.");
    say("Check your phone and enter your PIN to approve the payment…"); poll(net, d.id, order);
  } catch (err) { err instanceof TypeError ? demo(order) : fail(err.message); }
});
function poll(net, id, order, n = 0) {
  setTimeout(async () => {
    try {
      const d = await (await fetch(`${API_BASE}/api/status?network=${net}&id=${encodeURIComponent(id)}`)).json();
      if (d.state === "pending") return n < 15 ? poll(net, id, order, n + 1) : fail("We did not receive your payment in time. Please try again.");
      d.state === "paid" ? done(order) : fail(d.message || "The payment was not completed.");
    } catch { fail("Could not check the payment status."); }
  }, 4000);
}
const demo = order => { say("Demo mode: no payment server is connected, so this payment is simulated…"); setTimeout(() => done(order, true), 3000); };
function done(order, isDemo) {
  const amount = total(), name = $("#name").value;
  Cart.clear();
  $("#wrap").innerHTML = `<div class="panel empty"><h1>Thank you, ${name.replace(/[<>&]/g, "")}!</h1><p>${isDemo ? "This was a demo payment, no money was charged. " : ""}Your order <b>${order}</b> for <b>${fmt(amount)}</b> is confirmed. We will call you to arrange delivery.</p><a class="btn big" href="index.html">Back to shop</a></div>`;
}
