// WooCommerce API Response Types

export type WooImage = {
  id: number;
  src: string;
  alt: string;
  name: string;
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image: WooImage | null;
  count: number;
};

export type WooAttribute = {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
};

export type WooProductVariation = {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  attributes: {
    id: number;
    name: string;
    option: string;
  }[];
  image: WooImage;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable" | "grouped" | "external";
  status: "publish" | "draft" | "pending" | "private";
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  manage_stock: boolean;
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  images: WooImage[];
  attributes: WooAttribute[];
  variations: number[];
  date_created: string;
  date_modified: string;
};

// Normalized types for the frontend (matching existing Shopify-style types)

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: ProductVariant[];
  featuredImage: Image;
  images: Image[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
  featured: boolean;
  dateCreated: string;
};

export type SEO = {
  title: string;
  description: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  path: string;
  updatedAt: string;
  image?: Image;
};

// Order types (for WooCommerce order creation)
export type OrderAddress = {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
};

export type OrderLineItem = {
  product_id: number;
  variation_id?: number;
  quantity: number;
};

export type CreateOrderRequest = {
  billing: OrderAddress;
  shipping: OrderAddress;
  line_items: OrderLineItem[];
  customer_note?: string;
  coupon_lines?: { code: string }[];
};

export type WooOrder = {
  id: number;
  status: string;
  currency: string;
  total: string;
  order_key: string;
  billing: OrderAddress;
  shipping: OrderAddress;
  line_items: {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    total: string;
  }[];
  payment_url: string;
  date_created: string;
};

// Cart types (client-side cart)
export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: Image;
    };
  };
};

export type Cart = {
  id: string | undefined;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartItem[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
};
