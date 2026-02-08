"use client";

import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ChevronLeft, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWooCart } from "lib/woocommerce/cart-context";
import clsx from "clsx";

// Validation schema
const addressSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  address_1: z.string().min(1, "Address is required"),
  address_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postcode: z.string().min(5, "Valid ZIP code is required").max(10),
  country: z.string().min(1, "Country is required"),
});

// Billing schema with optional fields (validated conditionally)
const optionalAddressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  address_1: z.string(),
  address_2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postcode: z.string(),
  country: z.string(),
});

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  shipping: addressSchema,
  billing: optionalAddressSchema.optional(),
  sameAsShipping: z.boolean(),
  customerNote: z.string().optional(),
}).superRefine((data, ctx) => {
  // Only validate billing if not same as shipping
  if (!data.sameAsShipping && data.billing) {
    const b = data.billing;
    if (!b.first_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "First name is required", path: ["billing", "first_name"] });
    }
    if (!b.last_name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Last name is required", path: ["billing", "last_name"] });
    }
    if (!b.address_1) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Address is required", path: ["billing", "address_1"] });
    }
    if (!b.city) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required", path: ["billing", "city"] });
    }
    if (!b.state) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "State is required", path: ["billing", "state"] });
    }
    if (!b.postcode || b.postcode.length < 5) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid ZIP code is required", path: ["billing", "postcode"] });
    }
    if (!b.country) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Country is required", path: ["billing", "country"] });
    }
  }
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const US_STATES = [
  { value: "", label: "Select state" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

// Reusable input component with validation styling
const FormInput = forwardRef<
  HTMLInputElement,
  {
    label: string;
    error?: string;
    watchValue?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, error, watchValue, className, ...props }, ref) => {
  const hasError = !!error;
  const hasValue = watchValue && watchValue.length > 0;

  return (
    <div className={className}>
      <label
        htmlFor={props.id}
        className="mb-1.5 block text-sm font-medium text-stone-700"
      >
        {label}
        {props.required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={clsx(
            "block w-full rounded-lg border bg-white px-4 py-3 text-stone-900 shadow-sm transition-all duration-200",
            "placeholder:text-stone-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            hasError
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-stone-200 focus:border-stone-900 focus:ring-stone-900/10",
            hasValue && !hasError && "border-green-200"
          )}
        />
        {hasValue && !hasError && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
});
FormInput.displayName = "FormInput";

// Reusable select component
const FormSelect = forwardRef<
  HTMLSelectElement,
  {
    label: string;
    error?: string;
    options: { value: string; label: string }[];
    watchValue?: string;
  } & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ label, error, options, watchValue, className, ...props }, ref) => {
  const hasError = !!error;
  const hasValue = watchValue && watchValue.length > 0;

  return (
    <div className={className}>
      <label
        htmlFor={props.id}
        className="mb-1.5 block text-sm font-medium text-stone-700"
      >
        {label}
        {props.required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <select
        ref={ref}
        {...props}
        className={clsx(
          "block w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-stone-900 shadow-sm transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10",
          hasError
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-stone-200 focus:border-stone-900 focus:ring-stone-900/10",
          hasValue && !hasError && "border-green-200"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
});
FormSelect.displayName = "FormSelect";

export default function CheckoutPage() {
  const { cart, clearCart } = useWooCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      phone: "",
      shipping: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "US",
      },
      billing: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "US",
      },
      sameAsShipping: true,
      customerNote: "",
    },
  });

  const sameAsShipping = watch("sameAsShipping");
  const formValues = watch();


  // Redirect to cart if empty
  if (cart.items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-stone-900">Your cart is empty</h1>
          <p className="mt-2 text-stone-600">Add some items to your cart to checkout.</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const billingAddress = data.sameAsShipping
        ? { ...data.shipping, email: data.email, phone: data.phone }
        : { ...data.billing, email: data.email, phone: data.phone };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipping: { ...data.shipping, email: data.email, phone: data.phone },
          billing: billingAddress,
          line_items: cart.items.map((item) => ({
            product_id: item.productId,
            variation_id: item.variantId !== item.productId ? item.variantId : undefined,
            quantity: item.quantity,
          })),
          customer_note: data.customerNote || undefined,
          coupon_code: cart.coupon?.code || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || "Failed to create order");
        setIsSubmitting(false);
        return;
      }

      // Clear local cart
      clearCart();

      // Redirect to WooCommerce payment page
      window.location.href = result.paymentUrl;
    } catch {
      setSubmitError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const formatPrice = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(amount));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-2xl text-stone-900">
              Genesis
            </Link>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Lock className="h-4 w-4" />
              Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center text-sm text-stone-600 transition-colors hover:text-stone-900"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to shop
        </Link>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {submitError}
                </div>
              )}

              {/* Contact Information */}
              <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">Contact Information</h2>
                <p className="mt-1 text-sm text-stone-500">We&apos;ll use this to send order updates.</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <FormInput
                    label="Email"
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="sm:col-span-2"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <FormInput
                    label="Phone"
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 555-5555"
                    className="sm:col-span-2"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">Shipping Address</h2>
                <p className="mt-1 text-sm text-stone-500">Where should we send your order?</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <FormInput
                    label="First Name"
                    id="shipping_first_name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="John"
                    required
                    error={errors.shipping?.first_name?.message}
                    watchValue={formValues.shipping?.first_name}
                    {...register("shipping.first_name")}
                  />
                  <FormInput
                    label="Last Name"
                    id="shipping_last_name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Doe"
                    required
                    error={errors.shipping?.last_name?.message}
                    watchValue={formValues.shipping?.last_name}
                    {...register("shipping.last_name")}
                  />
                  <FormInput
                    label="Street Address"
                    id="shipping_address_1"
                    type="text"
                    autoComplete="address-line1"
                    placeholder="123 Main St"
                    required
                    className="sm:col-span-2"
                    error={errors.shipping?.address_1?.message}
                    watchValue={formValues.shipping?.address_1}
                    {...register("shipping.address_1")}
                  />
                  <FormInput
                    label="Apartment, suite, etc."
                    id="shipping_address_2"
                    type="text"
                    autoComplete="address-line2"
                    placeholder="Apt 4B (optional)"
                    className="sm:col-span-2"
                    error={errors.shipping?.address_2?.message}
                    watchValue={formValues.shipping?.address_2}
                    {...register("shipping.address_2")}
                  />
                  <FormInput
                    label="City"
                    id="shipping_city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="New York"
                    required
                    error={errors.shipping?.city?.message}
                    watchValue={formValues.shipping?.city}
                    {...register("shipping.city")}
                  />
                  <FormSelect
                    label="State"
                    id="shipping_state"
                    required
                    options={US_STATES}
                    error={errors.shipping?.state?.message}
                    watchValue={formValues.shipping?.state}
                    {...register("shipping.state")}
                  />
                  <FormInput
                    label="ZIP Code"
                    id="shipping_postcode"
                    type="text"
                    autoComplete="postal-code"
                    placeholder="10001"
                    required
                    error={errors.shipping?.postcode?.message}
                    watchValue={formValues.shipping?.postcode}
                    {...register("shipping.postcode")}
                  />
                  <FormSelect
                    label="Country"
                    id="shipping_country"
                    required
                    options={[{ value: "US", label: "United States" }]}
                    error={errors.shipping?.country?.message}
                    watchValue={formValues.shipping?.country}
                    {...register("shipping.country")}
                  />
                </div>
              </section>

              {/* Billing Address */}
              <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">Billing Address</h2>

                <div className="mt-4">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 cursor-pointer rounded border-stone-300 text-stone-900 focus:ring-stone-500 focus:ring-offset-0"
                      {...register("sameAsShipping")}
                    />
                    <span className="text-sm text-stone-700">Same as shipping address</span>
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <FormInput
                      label="First Name"
                      id="billing_first_name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      required
                      error={errors.billing?.first_name?.message}
                      watchValue={formValues.billing?.first_name}
                      {...register("billing.first_name")}
                    />
                    <FormInput
                      label="Last Name"
                      id="billing_last_name"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      required
                      error={errors.billing?.last_name?.message}
                      watchValue={formValues.billing?.last_name}
                      {...register("billing.last_name")}
                    />
                    <FormInput
                      label="Street Address"
                      id="billing_address_1"
                      type="text"
                      autoComplete="address-line1"
                      placeholder="123 Main St"
                      required
                      className="sm:col-span-2"
                      error={errors.billing?.address_1?.message}
                      watchValue={formValues.billing?.address_1}
                      {...register("billing.address_1")}
                    />
                    <FormInput
                      label="Apartment, suite, etc."
                      id="billing_address_2"
                      type="text"
                      autoComplete="address-line2"
                      placeholder="Apt 4B (optional)"
                      className="sm:col-span-2"
                      error={errors.billing?.address_2?.message}
                      watchValue={formValues.billing?.address_2}
                      {...register("billing.address_2")}
                    />
                    <FormInput
                      label="City"
                      id="billing_city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="New York"
                      required
                      error={errors.billing?.city?.message}
                      watchValue={formValues.billing?.city}
                      {...register("billing.city")}
                    />
                    <FormSelect
                      label="State"
                      id="billing_state"
                      required
                      options={US_STATES}
                      error={errors.billing?.state?.message}
                      watchValue={formValues.billing?.state}
                      {...register("billing.state")}
                    />
                    <FormInput
                      label="ZIP Code"
                      id="billing_postcode"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="10001"
                      required
                      error={errors.billing?.postcode?.message}
                      watchValue={formValues.billing?.postcode}
                      {...register("billing.postcode")}
                    />
                    <FormSelect
                      label="Country"
                      id="billing_country"
                      required
                      options={[{ value: "US", label: "United States" }]}
                      error={errors.billing?.country?.message}
                      watchValue={formValues.billing?.country}
                      {...register("billing.country")}
                    />
                  </div>
                )}
              </section>

              {/* Order Notes */}
              <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">Order Notes</h2>
                <p className="mt-1 text-sm text-stone-500">Any special instructions for your order?</p>

                <div className="mt-4">
                  <textarea
                    id="customer_note"
                    rows={3}
                    placeholder="E.g., delivery instructions, gift message..."
                    className="block w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm transition-all duration-200 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10"
                    {...register("customerNote")}
                  />
                </div>
              </section>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-stone-900 py-6 text-base font-medium text-white shadow-lg transition-all duration-150 hover:bg-stone-800 hover:shadow-xl active:scale-[0.98] active:shadow-md disabled:opacity-70 disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Continue to Payment — {formatPrice(cart.totalAmount.amount)}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <div className="sticky top-8 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
              <div className="border-b border-stone-100 bg-stone-50/50 px-6 py-4">
                <h2 className="text-lg font-semibold text-stone-900">Order Summary</h2>
              </div>

              <ul className="divide-y divide-stone-100 px-6">
                {cart.items.map((item) => (
                  <li key={item.variantId} className="flex gap-4 py-5">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                      {item.image?.url && (
                        <Image
                          src={item.image.url}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-xs font-medium text-white shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="font-medium text-stone-900">{item.title}</h3>
                      {item.variantTitle && item.variantTitle !== "Default" && (
                        <p className="mt-0.5 text-sm text-stone-500">{item.variantTitle}</p>
                      )}
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        {formatPrice((parseFloat(item.price.amount) * item.quantity).toString())}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-3 border-t border-stone-100 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-stone-600">Subtotal</dt>
                  <dd className="font-medium text-stone-900">
                    {formatPrice(cart.totalAmount.amount)}
                  </dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-stone-600">Shipping</dt>
                  <dd className="text-stone-500">Calculated at next step</dd>
                </div>
              </dl>

              <div className="border-t border-stone-200 bg-stone-50/50 px-6 py-5">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-semibold text-stone-900">Total</dt>
                  <dd className="text-xl font-bold text-stone-900">
                    {formatPrice(cart.totalAmount.amount)}
                  </dd>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <div className="hidden border-t border-stone-100 p-6 lg:block">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                  className="w-full rounded-full bg-stone-900 py-6 text-base font-medium text-white shadow-lg transition-all duration-150 hover:bg-stone-800 hover:shadow-xl active:scale-[0.98] active:shadow-md disabled:opacity-70 disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Continue to Payment
                    </>
                  )}
                </Button>
                <p className="mt-4 text-center text-xs text-stone-500">
                  You&apos;ll be redirected to complete payment securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
