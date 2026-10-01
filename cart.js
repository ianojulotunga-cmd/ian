const fmt = n => "KSh " + n.toLocaleString("en-KE");
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem("ibg_cart")) || {}; } catch { return {}; } },
  save(c) { try { localStorage.setItem("ibg_cart", JSON.stringify(c)); } catch {} },
  set(id, qty) {
    const c = this.get(), p = PRODUCTS.find(x => x.id == id);
    if (p.stock !== null) qty = Math.min(qty, p.stock);
    qty > 0 ? c[id] = qty : delete c[id]; this.save(c);
  },
  add(id) { this.set(id, (this.get()[id] || 0) + 1); },
  clear() { this.save({}); },
  lines() { const c = this.get(); return PRODUCTS.filter(p => c[p.id]).map(p => ({p, qty: c[p.id]})); },
  count() { return this.lines().reduce((n, l) => n + l.qty, 0); },
  subtotal() { return this.lines().reduce((t, l) => t + l.p.price * l.qty, 0); }
};
