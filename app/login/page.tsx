"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type Tab = "login" | "register";

// Login schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// Register schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

// Reusable input component
function FormInput({
  label,
  error,
  watchValue,
  className,
  ...props
}: {
  label: string;
  error?: string;
  watchValue?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const hasError = !!error;
  const hasValue = watchValue && watchValue.length > 0;

  return (
    <div className={className}>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-stone-700"
      >
        {label}
        {props.required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative mt-1">
        <input
          {...props}
          className={clsx(
            "block w-full rounded-lg border px-3 py-2.5 text-stone-900 shadow-sm transition-all duration-200",
            "placeholder:text-stone-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            hasError
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-stone-300 focus:border-stone-900 focus:ring-stone-900/10",
            hasValue && !hasError && "border-green-300"
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
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";

  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Read return URL from search params (set by middleware redirect)
  const returnTo = searchParams.get("from") || "/products";

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    watch: watchLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginValues = watchLogin();

  // Register form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch: watchRegister,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const registerValues = watchRegister();

  async function onLogin(data: LoginFormData) {
    setLoginError("");
    setIsLoggingIn(true);

    try {
      // Add timeout to prevent hanging forever
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await res.json();

      if (res.ok) {
        router.push(returnTo);
      } else {
        setLoginError(responseData.error || "Login failed");
        setIsLoggingIn(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error && error.name === "AbortError") {
        setLoginError("Request timed out. Please try again.");
      } else {
        setLoginError("Network error. Please try again.");
      }
      setIsLoggingIn(false);
    }
  }

  async function onRegister(data: RegisterFormData) {
    setRegisterError("");
    setIsRegistering(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await res.json();

      if (res.ok) {
        // Auto-login happened server-side, redirect to products
        router.push(returnTo);
      } else {
        setRegisterError(responseData.error || "Registration failed");
        setIsRegistering(false);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setRegisterError("Request timed out. Please try again.");
      } else {
        setRegisterError("Network error. Please try again.");
      }
      setIsRegistering(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <span className="font-serif text-3xl text-stone-900">Genesis</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex rounded-lg border border-stone-200 bg-stone-100 p-1">
        <button
          onClick={() => setActiveTab("login")}
          className={clsx(
            "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
            activeTab === "login"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          )}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={clsx(
            "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
            activeTab === "register"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          )}
        >
          Create Account
        </button>
      </div>

      {/* Login Form */}
      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
          {loginError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {loginError}
            </div>
          )}

          <FormInput
            label="Email"
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            error={loginErrors.email?.message}
            watchValue={loginValues.email}
            {...registerLogin("email")}
          />

          <FormInput
            label="Password"
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            error={loginErrors.password?.message}
            watchValue={loginValues.password}
            {...registerLogin("password")}
          />

          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      )}

      {/* Register Form */}
      {activeTab === "register" && (
        <>
            <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
              {registerError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {registerError}
                </div>
              )}
              <FormInput
                label="Full Name"
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                required
                error={registerErrors.name?.message}
                watchValue={registerValues.name}
                {...registerRegister("name")}
              />

              <FormInput
                label="Email"
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                error={registerErrors.email?.message}
                watchValue={registerValues.email}
                {...registerRegister("email")}
              />

              <FormInput
                label="Phone Number"
                id="register-phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 555-5555"
                required
                error={registerErrors.phone?.message}
                watchValue={registerValues.phone}
                {...registerRegister("phone")}
              />

              <div>
                <FormInput
                  label="Password"
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  required
                  error={registerErrors.password?.message}
                  watchValue={registerValues.password}
                  {...registerRegister("password")}
                />
                <p className="mt-1.5 text-xs text-stone-500">
                  Must be 8+ characters with uppercase, lowercase, and number
                </p>
              </div>

              <Button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]"
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              <p className="text-center text-xs text-stone-500">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-stone-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-stone-700">
                  Privacy Policy
                </Link>
              </p>
            </form>
        </>
      )}

      <p className="mt-6 text-center text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-700">
          Back to home
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
      <Suspense fallback={<div className="w-full max-w-sm animate-pulse">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
