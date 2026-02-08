# Static Product Pages with Client-Side Inventory

## Overview

Pre-generate all product pages at build time for instant loading, with a lightweight client-side inventory check to ensure stock accuracy.

---

## Current State

- Product pages fetch from WooCommerce API on each request (~1-2s latency)
- Stock status is determined at fetch time via `stock_status` field
- `availableForSale` boolean controls "Add to Cart" vs "Out of Stock" button
- Cache recently changed from `hours` to `days`, but first request still slow

---

## Proposed Solution

### 1. Static Generation at Build Time
Pre-build all product pages using `generateStaticParams`:
- Fetch all products once during build
- Generate static HTML for each product page
- Visitors get instant page loads (no WooCommerce latency)

### 2. Client-Side Inventory Check
On page mount, fetch current stock status:
- Small API call to check `stock_status` for the product
- Update UI if stock has changed since build
- Disable "Add to Cart" if now out of stock

---

## Architecture

```
Build Time:
  getProducts() → generateStaticParams → Static HTML for all products

Runtime:
  User visits /products/bpc-157
        ↓
  Static HTML renders instantly
        ↓
  Client-side useEffect calls /api/inventory/[id]
        ↓
  If out of stock → disable Add to Cart button
```

---

## Files to Create

### 1. `app/api/inventory/[id]/route.ts`
Lightweight endpoint to check current stock:

```typescript
// GET /api/inventory/123
// Returns: { inStock: boolean, quantity: number | null }
```

- Fetches single product from WooCommerce
- Returns only stock info (minimal payload)
- Short cache (minutes) or no cache

### 2. `lib/woocommerce/index.ts` - Add function
```typescript
export async function getProductStock(id: string): Promise<{
  inStock: boolean;
  quantity: number | null;
}>;
```

---

## Files to Modify

### 1. `app/products/[slug]/page.tsx`
Add `generateStaticParams`:
```typescript
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.handle,
  }));
}
```

### 2. `app/products/[slug]/add-to-cart-button.tsx`
Add client-side stock check:
```typescript
// On mount, check current inventory
const [stockStatus, setStockStatus] = useState<'loading' | 'instock' | 'outofstock'>('loading');

useEffect(() => {
  fetch(`/api/inventory/${product.id}`)
    .then(res => res.json())
    .then(data => setStockStatus(data.inStock ? 'instock' : 'outofstock'));
}, [product.id]);

// Use stockStatus to override availableForSale if needed
const isAvailable = stockStatus === 'loading'
  ? product.availableForSale  // Trust build-time data while loading
  : stockStatus === 'instock';
```

---

## UI States

| State | Button Display |
|-------|----------------|
| Loading (checking stock) | "Add to Cart" (enabled, trust build data) |
| In Stock | "Add to Cart" (enabled) |
| Out of Stock | "Out of Stock" (disabled) |

Optional: Show subtle "Checking availability..." indicator while loading.

---

## API Endpoint Design

**Route:** `GET /api/inventory/[id]`

**Response:**
```json
{
  "inStock": true,
  "quantity": 25,
  "status": "instock"
}
```

**Caching:** `Cache-Control: max-age=60` (1 minute)

---

## Implementation Order

1. **Add `getProductStock` function** to WooCommerce lib
2. **Create inventory API route** at `/api/inventory/[id]`
3. **Add `generateStaticParams`** to product page
4. **Update AddToCartButton** with client-side stock check
5. **Test build** - verify all pages pre-generate
6. **Test runtime** - verify stock check works

---

## Verification

1. `pnpm build` - Should show all product pages being generated
2. Visit product page - Should load instantly (no spinner)
3. Check Network tab - Should see `/api/inventory/[id]` call
4. Manually set product to "out of stock" in WooCommerce
5. Refresh page - Button should update to "Out of Stock" after API call
6. Test variant-level stock if applicable

---

## Considerations

- **Build time increases:** Fetching all products during build adds time
- **Stale content:** Product info (title, description, price) stays static until rebuild
- **Inventory accuracy:** ~1 minute delay for stock updates (API cache)
- **Variant stock:** May need per-variant stock check for variable products

---

## Optional Enhancements (Future)

- [ ] Webhook from WooCommerce to trigger rebuild on product changes
- [ ] Per-variant stock checking for variable products
- [ ] Optimistic cart with server validation at checkout
- [ ] Stock quantity display ("Only 3 left!")
