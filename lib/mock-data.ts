import { Product } from "./shopify/types";

// Mock peptide products for development without Shopify credentials
export const mockProducts: Product[] = [
  {
    id: "gid://mock/Product/1",
    handle: "bpc-157",
    title: "BPC-157",
    description:
      "Body Protection Compound-157 (BPC-157) is a synthetic peptide derived from a protective protein found in the stomach. Research suggests it may support tissue repair and healing processes.",
    descriptionHtml:
      "<p>Body Protection Compound-157 (BPC-157) is a synthetic peptide derived from a protective protein found in the stomach. Research suggests it may support tissue repair and healing processes.</p>",
    availableForSale: true,
    options: [{ id: "opt-1", name: "Size", values: ["5mg", "10mg"] }],
    priceRange: {
      minVariantPrice: { amount: "49.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "89.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/1-1",
        title: "5mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "5mg" }],
        price: { amount: "49.99", currencyCode: "USD" },
      },
      {
        id: "gid://mock/ProductVariant/1-2",
        title: "10mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "10mg" }],
        price: { amount: "89.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/placeholder.svg",
      altText: "BPC-157",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/placeholder.svg",
        altText: "BPC-157",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "BPC-157 | Research Peptide",
      description:
        "BPC-157 research peptide for laboratory and research purposes.",
    },
    tags: ["peptide", "research"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gid://mock/Product/2",
    handle: "tb-500",
    title: "TB-500",
    description:
      "Thymosin Beta-4 (TB-500) is a naturally occurring peptide present in almost all animal and human cells. It plays a vital role in tissue repair, regeneration, and protection.",
    descriptionHtml:
      "<p>Thymosin Beta-4 (TB-500) is a naturally occurring peptide present in almost all animal and human cells. It plays a vital role in tissue repair, regeneration, and protection.</p>",
    availableForSale: true,
    options: [{ id: "opt-2", name: "Size", values: ["2mg", "5mg"] }],
    priceRange: {
      minVariantPrice: { amount: "39.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "79.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/2-1",
        title: "2mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "2mg" }],
        price: { amount: "39.99", currencyCode: "USD" },
      },
      {
        id: "gid://mock/ProductVariant/2-2",
        title: "5mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "5mg" }],
        price: { amount: "79.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/placeholder.svg",
      altText: "TB-500",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/placeholder.svg",
        altText: "TB-500",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "TB-500 | Research Peptide",
      description:
        "TB-500 (Thymosin Beta-4) research peptide for laboratory purposes.",
    },
    tags: ["peptide", "research"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gid://mock/Product/3",
    handle: "pt-141",
    title: "PT-141",
    description:
      "PT-141 (Bremelanotide) is a synthetic peptide analog of alpha-melanocyte-stimulating hormone. It was originally developed for treating sexual dysfunction.",
    descriptionHtml:
      "<p>PT-141 (Bremelanotide) is a synthetic peptide analog of alpha-melanocyte-stimulating hormone. It was originally developed for treating sexual dysfunction.</p>",
    availableForSale: true,
    options: [{ id: "opt-3", name: "Size", values: ["10mg"] }],
    priceRange: {
      minVariantPrice: { amount: "44.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "44.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/3-1",
        title: "10mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "10mg" }],
        price: { amount: "44.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/placeholder.svg",
      altText: "PT-141",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/placeholder.svg",
        altText: "PT-141",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "PT-141 | Research Peptide",
      description: "PT-141 (Bremelanotide) research peptide for laboratory use.",
    },
    tags: ["peptide", "research"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gid://mock/Product/4",
    handle: "ipamorelin",
    title: "Ipamorelin",
    description:
      "Ipamorelin is a selective growth hormone secretagogue and ghrelin receptor agonist. It stimulates the release of growth hormone from the pituitary gland.",
    descriptionHtml:
      "<p>Ipamorelin is a selective growth hormone secretagogue and ghrelin receptor agonist. It stimulates the release of growth hormone from the pituitary gland.</p>",
    availableForSale: true,
    options: [{ id: "opt-4", name: "Size", values: ["2mg", "5mg"] }],
    priceRange: {
      minVariantPrice: { amount: "29.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "59.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/4-1",
        title: "2mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "2mg" }],
        price: { amount: "29.99", currencyCode: "USD" },
      },
      {
        id: "gid://mock/ProductVariant/4-2",
        title: "5mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "5mg" }],
        price: { amount: "59.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/placeholder.svg",
      altText: "Ipamorelin",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/placeholder.svg",
        altText: "Ipamorelin",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "Ipamorelin | Research Peptide",
      description:
        "Ipamorelin growth hormone secretagogue for research purposes.",
    },
    tags: ["peptide", "research", "gh-secretagogue"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gid://mock/Product/5",
    handle: "cjc-1295",
    title: "CJC-1295",
    description:
      "CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH). It increases plasma growth hormone and IGF-1 levels in research settings.",
    descriptionHtml:
      "<p>CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH). It increases plasma growth hormone and IGF-1 levels in research settings.</p>",
    availableForSale: true,
    options: [{ id: "opt-5", name: "Size", values: ["2mg", "5mg"] }],
    priceRange: {
      minVariantPrice: { amount: "34.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "69.99", currencyCode: "USD" },
    },
    variants: [
      {
        id: "gid://mock/ProductVariant/5-1",
        title: "2mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "2mg" }],
        price: { amount: "34.99", currencyCode: "USD" },
      },
      {
        id: "gid://mock/ProductVariant/5-2",
        title: "5mg",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "5mg" }],
        price: { amount: "69.99", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/placeholder.svg",
      altText: "CJC-1295",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/placeholder.svg",
        altText: "CJC-1295",
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: "CJC-1295 | Research Peptide",
      description: "CJC-1295 GHRH analog for laboratory research purposes.",
    },
    tags: ["peptide", "research", "ghrh-analog"],
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
