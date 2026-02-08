import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import {
  Collection,
  CreateOrderRequest,
  Image,
  Product,
  ProductOption,
  ProductVariant,
  WooCategory,
  WooOrder,
  WooProduct,
  WooProductVariation,
} from "./types";

// Re-export types for convenience
export * from "./types";

const TAGS = {
  products: "woo-products",
  categories: "woo-categories",
};

// Currency code - could be made configurable
const CURRENCY_CODE = "USD";

// Initialize WooCommerce REST API client
const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_STORE_URL || "",
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
  version: "wc/v3",
});

// Helper to check if WooCommerce is configured
function isConfigured(): boolean {
  return !!(
    process.env.WOOCOMMERCE_STORE_URL &&
    process.env.WOOCOMMERCE_CONSUMER_KEY &&
    process.env.WOOCOMMERCE_CONSUMER_SECRET
  );
}

// Transform WooCommerce image to normalized Image type
function transformImage(wooImage: { src: string; alt?: string; name?: string } | null): Image {
  if (!wooImage) {
    return {
      url: "/placeholder-product.jpg",
      altText: "Product image",
      width: 800,
      height: 800,
    };
  }
  return {
    url: wooImage.src,
    altText: wooImage.alt || wooImage.name || "Product image",
    width: 800,
    height: 800,
  };
}

// Transform WooCommerce product to normalized Product type
function transformProduct(wooProduct: WooProduct, variations?: WooProductVariation[]): Product {
  const images = wooProduct.images.map(transformImage);
  const featuredImage = images[0] || transformImage(null);

  // Build options from attributes
  const options: ProductOption[] = wooProduct.attributes
    .filter((attr) => attr.variation || attr.visible)
    .map((attr) => ({
      id: attr.id.toString(),
      name: attr.name,
      values: attr.options,
    }));

  // Build variants
  let variants: ProductVariant[] = [];

  if (wooProduct.type === "variable" && variations && variations.length > 0) {
    variants = variations.map((v) => ({
      id: v.id.toString(),
      title: v.attributes.map((a) => a.option).join(" / ") || "Default",
      availableForSale: v.stock_status === "instock",
      selectedOptions: v.attributes.map((a) => ({
        name: a.name,
        value: a.option,
      })),
      price: {
        amount: v.price || wooProduct.price,
        currencyCode: CURRENCY_CODE,
      },
    }));
  } else {
    // Simple product - create a single default variant
    variants = [
      {
        id: wooProduct.id.toString(),
        title: "Default",
        availableForSale: wooProduct.stock_status === "instock",
        selectedOptions: [],
        price: {
          amount: wooProduct.price,
          currencyCode: CURRENCY_CODE,
        },
      },
    ];
  }

  // Calculate price range
  const prices = variants.map((v) => parseFloat(v.price.amount) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    id: wooProduct.id.toString(),
    handle: wooProduct.slug,
    availableForSale: wooProduct.stock_status === "instock",
    title: wooProduct.name,
    description: stripHtml(wooProduct.description || wooProduct.short_description),
    descriptionHtml: wooProduct.description || wooProduct.short_description,
    options,
    priceRange: {
      minVariantPrice: {
        amount: minPrice.toString(),
        currencyCode: CURRENCY_CODE,
      },
      maxVariantPrice: {
        amount: maxPrice.toString(),
        currencyCode: CURRENCY_CODE,
      },
    },
    variants,
    featuredImage,
    images,
    seo: {
      title: wooProduct.name,
      description: stripHtml(wooProduct.short_description || wooProduct.description).slice(0, 160),
    },
    tags: wooProduct.tags.map((t) => t.name),
    updatedAt: wooProduct.date_modified,
    featured: wooProduct.featured,
    dateCreated: wooProduct.date_created,
  };
}

// Transform WooCommerce category to Collection type
function transformCategory(wooCategory: WooCategory): Collection {
  return {
    handle: wooCategory.slug,
    title: wooCategory.name,
    description: stripHtml(wooCategory.description),
    seo: {
      title: wooCategory.name,
      description: stripHtml(wooCategory.description).slice(0, 160),
    },
    path: `/products/category/${wooCategory.slug}`,
    updatedAt: new Date().toISOString(),
    image: wooCategory.image ? transformImage(wooCategory.image) : undefined,
  };
}

// Strip HTML tags from string
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// Fetch all products
export async function getProducts(params?: {
  category?: string;
  search?: string;
  per_page?: number;
  page?: number;
  orderby?: string;
  order?: "asc" | "desc";
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  if (!isConfigured()) {
    console.log("WooCommerce not configured, returning empty products");
    return [];
  }

  try {
    const response = await api.get("products", {
      per_page: params?.per_page || 100,
      page: params?.page || 1,
      status: "publish",
      ...(params?.category && { category: params.category }),
      ...(params?.search && { search: params.search }),
      ...(params?.orderby && { orderby: params.orderby }),
      ...(params?.order && { order: params.order }),
    });

    const products: WooProduct[] = response.data;
    // Don't fetch variations for listings - too slow. Only fetch on detail page.
    return products.map((p) => transformProduct(p));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Helper to fetch product with its variations
async function transformProductWithVariations(wooProduct: WooProduct): Promise<Product> {
  if (wooProduct.type === "variable" && wooProduct.variations.length > 0) {
    try {
      const variationsResponse = await api.get(
        `products/${wooProduct.id}/variations`,
        { per_page: 100 }
      );
      return transformProduct(wooProduct, variationsResponse.data);
    } catch (error) {
      console.error(`Error fetching variations for product ${wooProduct.id}:`, error);
      return transformProduct(wooProduct);
    }
  }
  return transformProduct(wooProduct);
}

// Fetch single product by slug
export async function getProduct(slug: string): Promise<Product | undefined> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot fetch product: ${slug}`);
    return undefined;
  }

  try {
    const response = await api.get("products", {
      slug,
      status: "publish",
    });

    const products: WooProduct[] = response.data;
    const product = products[0];
    if (!product) {
      return undefined;
    }

    return transformProductWithVariations(product);
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return undefined;
  }
}

// Fetch single product by ID
export async function getProductById(id: number | string): Promise<Product | undefined> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot fetch product ID: ${id}`);
    return undefined;
  }

  try {
    const response = await api.get(`products/${id}`);
    const wooProduct: WooProduct = response.data;
    return transformProductWithVariations(wooProduct);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return undefined;
  }
}

// Fetch all categories
export async function getCategories(): Promise<Collection[]> {
  "use cache";
  cacheTag(TAGS.categories);
  cacheLife("days");

  if (!isConfigured()) {
    console.log("WooCommerce not configured, returning empty categories");
    return [];
  }

  try {
    const response = await api.get("products/categories", {
      per_page: 100,
      hide_empty: true,
    });

    const categories: WooCategory[] = response.data;

    // Filter out unhelpful categories
    const filteredCategories = categories.filter((cat) => {
      const slug = cat.slug.toLowerCase();
      // Skip "uncategorized" and categories with very few products
      if (slug === "uncategorized") return false;
      if (cat.count < 2) return false;
      return true;
    });

    return filteredCategories.map(transformCategory);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch single category by slug
export async function getCategory(slug: string): Promise<Collection | undefined> {
  "use cache";
  cacheTag(TAGS.categories);
  cacheLife("days");

  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot fetch category: ${slug}`);
    return undefined;
  }

  try {
    const response = await api.get("products/categories", {
      slug,
    });

    const categories: WooCategory[] = response.data;
    const category = categories[0];
    if (!category) {
      return undefined;
    }

    return transformCategory(category);
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return undefined;
  }
}

// Fetch products by category slug
export async function getProductsByCategory(
  categorySlug: string,
  params?: {
    per_page?: number;
    page?: number;
    orderby?: string;
    order?: "asc" | "desc";
  }
): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products, TAGS.categories);
  cacheLife("days");

  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot fetch products for category: ${categorySlug}`);
    return [];
  }

  try {
    // First get the category ID
    const categoryResponse = await api.get("products/categories", {
      slug: categorySlug,
    });

    const categories: WooCategory[] = categoryResponse.data;
    const category = categories[0];
    if (!category) {
      return [];
    }

    const categoryId = category.id;

    // Then fetch products in that category
    const response = await api.get("products", {
      category: categoryId.toString(),
      per_page: params?.per_page || 100,
      page: params?.page || 1,
      status: "publish",
      ...(params?.orderby && { orderby: params.orderby }),
      ...(params?.order && { order: params.order }),
    });

    const products: WooProduct[] = response.data;
    // Don't fetch variations for listings - too slow
    return products.map((p) => transformProduct(p));
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot search: ${query}`);
    return [];
  }

  if (!query.trim()) {
    return [];
  }

  try {
    const response = await api.get("products", {
      search: query,
      per_page: 50,
      status: "publish",
    });

    const products: WooProduct[] = response.data;
    // Don't fetch variations for listings - too slow
    return products.map((p) => transformProduct(p));
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    return [];
  }
}

// Get product recommendations (related products)
export async function getProductRecommendations(productId: string): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  if (!isConfigured()) {
    return [];
  }

  try {
    // Get the current product to find its categories
    const productResponse = await api.get(`products/${productId}`);
    const product: WooProduct = productResponse.data;

    const firstCategory = product.categories[0];
    if (!firstCategory) {
      return [];
    }

    // Get products from the same category, excluding current product
    const categoryId = firstCategory.id;
    const response = await api.get("products", {
      category: categoryId.toString(),
      per_page: 5,
      status: "publish",
      exclude: [parseInt(productId)],
    });

    const products: WooProduct[] = response.data;
    // Don't fetch variations for recommendations - too slow
    return products.map((p) => transformProduct(p));
  } catch (error) {
    console.error(`Error fetching recommendations for product ${productId}:`, error);
    return [];
  }
}

// Build checkout URL with cart items
export function buildCheckoutUrl(
  items: { productId: string; quantity: number; variationId?: string }[]
): string {
  const baseUrl = process.env.WOOCOMMERCE_STORE_URL || "https://genesispeptides.com";

  const firstItem = items[0];
  if (!firstItem) {
    return `${baseUrl}/shop`;
  }

  // WooCommerce supports adding multiple items via URL parameters
  // Format: ?add-to-cart=ID&quantity=QTY for single item
  // For multiple items, we chain them or use the cart page
  if (items.length === 1) {
    const productId = firstItem.variationId || firstItem.productId;
    return `${baseUrl}/checkout/?add-to-cart=${productId}&quantity=${firstItem.quantity}`;
  }

  // For multiple items, redirect to cart page with first item, then they can continue
  // A more sophisticated approach would use WooCommerce's Store API
  const productId = firstItem.variationId || firstItem.productId;
  return `${baseUrl}/?add-to-cart=${productId}&quantity=${firstItem.quantity}`;
}

// Get collections (categories) for navigation - includes "All" collection
export async function getCollections(): Promise<Collection[]> {
  const categories = await getCategories();

  return [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All Products",
        description: "Browse all products",
      },
      path: "/products",
      updatedAt: new Date().toISOString(),
    },
    ...categories,
  ];
}

// Fetch current stock status for a product (no caching - always fresh)
export async function getProductStock(id: string): Promise<{
  inStock: boolean;
  quantity: number | null;
  status: string;
}> {
  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot fetch stock for: ${id}`);
    return { inStock: false, quantity: null, status: "unknown" };
  }

  try {
    const response = await api.get(`products/${id}`);
    const product: WooProduct = response.data;

    return {
      inStock: product.stock_status === "instock",
      quantity: product.stock_quantity,
      status: product.stock_status,
    };
  } catch (error) {
    console.error(`Error fetching stock for product ${id}:`, error);
    return { inStock: false, quantity: null, status: "error" };
  }
}

// Create a pending order in WooCommerce
export async function createOrder(orderData: CreateOrderRequest): Promise<{
  success: boolean;
  order?: WooOrder;
  paymentUrl?: string;
  error?: string;
}> {
  if (!isConfigured()) {
    console.log("WooCommerce not configured, cannot create order");
    return { success: false, error: "WooCommerce not configured" };
  }

  try {
    const response = await api.post("orders", {
      ...orderData,
      status: "pending", // Pending payment
      set_paid: false,
    });

    const order: WooOrder = response.data;
    const storeUrl = process.env.WOOCOMMERCE_STORE_URL || "https://genesispeptides.com";

    // Build the pay-for-order URL
    const paymentUrl = `${storeUrl}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`;

    return {
      success: true,
      order,
      paymentUrl,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create order";
    return { success: false, error: errorMessage };
  }
}

// Get order by ID
export async function getOrder(orderId: number): Promise<WooOrder | null> {
  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot fetch order: ${orderId}`);
    return null;
  }

  try {
    const response = await api.get(`orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
}

// Get orders by customer email
export async function getCustomerOrders(email: string): Promise<WooOrder[]> {
  if (!isConfigured()) {
    console.log(`WooCommerce not configured, cannot fetch orders for: ${email}`);
    return [];
  }

  try {
    // Search for orders by customer email
    const response = await api.get("orders", {
      search: email,
      per_page: 50,
      orderby: "date",
      order: "desc",
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for ${email}:`, error);
    return [];
  }
}
