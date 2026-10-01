# Ian's Biashara Grid

A modern Kenyan online shop: home and kitchen, computer accessories, electronics and IT services, with search, category filters, cart, product details and a checkout for **Safaricom M-Pesa (STK Push)** and **Airtel Money**.

## Files
| Path | What it does |
|---|---|
| `index.html`, `checkout.html`, `styles.css` | Pages and design |
| `products.js` | **Edit this** to add or change products and prices |
| `assets/img/products/` | Product photos, see `IMAGES.md` (not included, you add them) |
| `cart.js`, `app.js`, `checkout.js` | Cart, shop and payment flow |
| `config.js` | Address of the payment server |
| `api/` | Payment server functions (Daraja and Airtel), deployed on Vercel |

## Host it
1. Create a public GitHub repo and upload everything from this folder (keep the folders).
2. **Frontend only:** Settings → Pages → Deploy from `main` / root. Your link is `https://USERNAME.github.io/REPO/`. Payments are **simulated** (demo mode, clearly labelled).
3. **Real test payments:** GitHub Pages cannot run a payment server. Import the same repo into vercel.com, add the variables from `.env.example`, and deploy. Either share the Vercel link directly, or keep GitHub Pages and put the Vercel link in `config.js`.

## Payment accounts
- **Safaricom:** developer.safaricom.co.ke → new app → Consumer Key, Secret, sandbox Passkey. Sandbox shortcode `174379`, test number `254708374149`.
- **Airtel:** developers.airtel.africa → app with Collection API → client ID and secret. Access depends on Airtel's approval, and their API details can change, so check their docs if a request fails.
- **Where money goes:** STK Push cannot pay into a personal number like 0705191795. Real money needs a Paybill or Buy Goods Till plus Daraja Go Live. Then set `MPESA_ENV=production`, `MPESA_SHORTCODE`, `MPESA_TXN_TYPE=CustomerBuyGoodsOnline` and `MPESA_PARTYB` (your Till). Until then, the checkout shows 0705191795 as a manual send-money option.
- Sandboxes do not ring real phones. Keep all keys in Vercel, never in the repo.
