import { Product } from "./shopify/types";

// Mock dog treat products for development without Shopify credentials
export const mockProducts: Product[] = [
  {
    id: "gid://mock/Product/1",
    handle: "joint-recovery-chews",
    title: "BPC-157 Joint & Recovery Chews",
    description:
      "Premium BPC-157 dog treats designed to support joint health, mobility, and tissue recovery. Made with natural ingredients and scientifically formulated for canine wellness.",
    descriptionHtml:
      "<p>Premium BPC-157 dog treats designed to support joint health, mobility, and tissue recovery. Made with natural ingredients and scientifically formulated for canine wellness.</p>",
    availableForSale: true,
    options: [{ id: "opt-1", name: "Size", values: ["30-count", "60-count"] }],
    priceRange: {
      minVariantPrice: { amount: "39.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "69.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/1-1",
        title: "30-count",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "30-count" }],
        price: { amount: "39.99", currencyCode: "USD" },
      },
      {
        id: "gid://mock/ProductVariant/1-2",
        title: "60-count",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "60-count" }],
        price: { amount: "69.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/products/joint-recovery.png",
      altText: "BPC-157 Joint & Recovery Chews",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/products/joint-recovery.png",
        altText: "BPC-157 Joint & Recovery Chews",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "BPC-157 Joint & Recovery Chews | Puptides",
      description:
        "Premium BPC-157 dog treats for joint health, mobility, and tissue recovery. Natural ingredients for your dog's wellness.",
    },
    tags: ["bpc-157", "joint-health", "recovery", "mobility"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gid://mock/Product/2",
    handle: "daily-wellness-chews",
    title: "BPC-157 Daily Wellness Chews",
    description:
      "BPC-157 daily wellness chews formulated to support gut health, immune function, and daily vitality. Perfect for maintaining your dog's overall health and wellbeing.",
    descriptionHtml:
      "<p>BPC-157 daily wellness chews formulated to support gut health, immune function, and daily vitality. Perfect for maintaining your dog's overall health and wellbeing.</p>",
    availableForSale: true,
    options: [{ id: "opt-2", name: "Size", values: ["30-count", "60-count"] }],
    priceRange: {
      minVariantPrice: { amount: "34.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "59.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/2-1",
        title: "30-count",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "30-count" }],
        price: { amount: "34.99", currencyCode: "USD" },
      },
      {
        id: "gid://mock/ProductVariant/2-2",
        title: "60-count",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "60-count" }],
        price: { amount: "59.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/products/daily-wellness.png",
      altText: "BPC-157 Daily Wellness Chews",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/products/daily-wellness.png",
        altText: "BPC-157 Daily Wellness Chews",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "BPC-157 Daily Wellness Chews | Puptides",
      description:
        "BPC-157 daily wellness chews for gut health, immune function, and vitality in dogs.",
    },
    tags: ["bpc-157", "daily-wellness", "gut-health", "immune-support"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gid://mock/Product/3",
    handle: "senior-dog-formula",
    title: "BPC-157 Senior Dog Formula",
    description:
      "Premium BPC-157 formula specially designed for dogs 7 years and older. Supports joint health, cognitive function, and energy levels to help senior dogs thrive in their golden years.",
    descriptionHtml:
      "<p>Premium BPC-157 formula specially designed for dogs 7 years and older. Supports joint health, cognitive function, and energy levels to help senior dogs thrive in their golden years.</p>",
    availableForSale: true,
    options: [{ id: "opt-3", name: "Size", values: ["30-count", "60-count"] }],
    priceRange: {
      minVariantPrice: { amount: "44.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "79.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/3-1",
        title: "30-count",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "30-count" }],
        price: { amount: "44.99", currencyCode: "USD" },
      },
      {
        id: "gid://mock/ProductVariant/3-2",
        title: "60-count",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "60-count" }],
        price: { amount: "79.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/products/senior-dog-formula.png",
      altText: "BPC-157 Senior Dog Formula",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/products/senior-dog-formula.png",
        altText: "BPC-157 Senior Dog Formula",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "BPC-157 Senior Dog Formula | Puptides",
      description: "Premium BPC-157 formula for dogs 7+. Supports joints, cognition, and energy for senior dogs.",
    },
    tags: ["bpc-157", "senior-dogs", "cognitive-support", "joint-health", "energy"],
    updatedAt: new Date().toISOString(),
  },
];

// Helper function to get a mock product by handle
export function getMockProduct(handle: string): Product | undefined {
  return mockProducts.find((p) => p.handle === handle);
}

// Helper function to get mock product recommendations (returns other products)
export function getMockProductRecommendations(productId: string): Product[] {
  return mockProducts.filter((p) => p.id !== productId).slice(0, 4);
}
