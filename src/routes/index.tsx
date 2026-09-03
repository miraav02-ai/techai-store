import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Code,
  Gamepad2,
  GraduationCap,
  Laptop,
  Palette,
  Sparkles,
  ShieldCheck,
  Truck,
  Zap,
  LayoutDashboard,
  Boxes,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/store/ProductCard";
import { AdminCustomerGuard } from "@/components/store/AdminCustomerGuard";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LaptopAI Store — Intelligent Laptop Shopping Experience powered by AI" },
      {
        name: "description",
        content:
          "Intelligent Laptop Shopping Experience powered by AI. Browse 70 curated laptops across ASUS, Lenovo, Acer, HP, Dell, MSI, and Apple with our Agentic AI laptop advisor.",
      },
      { property: "og:title", content: "LaptopAI Store — Intelligent Laptop Shopping Experience powered by AI" },
      {
        property: "og:description",
        content: "Discover your ideal laptop for gaming, coding, creative work, business, or university with AI assistance.",
      },
    ],
  }),
  component: Home,
});

const collectionIcons: Record<string, typeof Laptop> = {
  Gamepad2,
  Code,
  Palette,
  Briefcase,
  GraduationCap,
  Laptop,
};

function Home() {
  const { products, categories, setAiOpen } = useStore();
  const { isAdmin, user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const topSelling = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const latest = [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  const handleAskAi = (customText?: string) => {
    if (!user) {
      toast.error("Sign In Required", {
        description: "Please sign in to ask AI Assistant.",
      });
      void navigate({ to: "/login" });
      return;
    }
    if (customText) {
      setPrompt(customText);
    }
    setAiOpen(true);
  };

  return (
    <AdminCustomerGuard routeName="Beranda Toko">
      <div>
        {/* Hero */}
        <section className="gradient-hero">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div className="space-y-6">
              <Badge className="rounded-full bg-card text-card-foreground">
                <Sparkles className="mr-1 size-3.5 text-secondary" /> Agentic AI Laptop Shopping Assistant
              </Badge>
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                Intelligent Laptop Shopping Experience powered by AI.
              </h1>
              <p className="max-w-lg text-base text-foreground/80">
                LaptopAI Store brings 70 high-performance laptops from ASUS, Lenovo, Acer, HP, Dell, MSI, and Apple together with an intelligent consultant that reasons over your budget, specs, and workflow.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary" className="rounded-xl">
                  <Link to="/shop">
                    Browse 70 Laptops <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl bg-card"
                  onClick={() => handleAskAi()}
                >
                  <Sparkles className="size-4" /> Ask AI Consultant
                </Button>
              </div>
              <div className="flex flex-wrap gap-5 pt-2 text-xs font-medium text-foreground/75">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-secondary" /> 100% Official Brand Warranty
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="size-4 text-secondary" /> Free Express Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="size-4 text-secondary" /> QRIS · Transfer · COD
                </span>
              </div>
            </div>

            {/* AI prompt card */}
            <div className="surface-card ai-glow space-y-4 p-6">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-xl gradient-ai text-secondary-foreground">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="font-semibold">AI Laptop Matchmaker</p>
                  <p className="text-xs text-muted-foreground">Grounded in 70 verified laptops & live stock</p>
                </div>
              </div>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAi(prompt);
                }}
              >
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Contoh: 'Laptop coding RAM 16GB budget 10 juta'..."
                  className="h-12 rounded-xl bg-surface"
                />
                <Button type="submit" className="h-11 w-full rounded-xl">
                  <Sparkles className="size-4" /> Find Matching Laptops with AI
                </Button>
              </form>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Coding RAM 16GB budget 10 jt",
                  "Gaming RTX budget 15 juta",
                  "Desain grafis RTX 4060",
                  "Laptop kuliah under 8 juta",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleAskAi(s)}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* Featured Collections */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Laptop Collections</h2>
            <p className="text-sm text-muted-foreground">Tailored for your specific use cases and daily workflows</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/shop">
              View all 70 laptops <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => {
            const Icon = collectionIcons[c.icon] ?? Laptop;
            const count = products.filter((p) => p.category === c.name).length;
            return (
              <button
                key={c.id}
                onClick={() => navigate({ to: "/shop", search: { category: c.name } })}
                className="surface-card hover-lift flex flex-col gap-3 p-5 text-left transition-all"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <div>
                  <span className="block font-semibold text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{count} models available</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Top selling */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Top Selling Laptops</h2>
            <p className="text-sm text-muted-foreground">Most popular verified choices by our users this month</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/shop">
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topSelling.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo banners */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 lg:grid-cols-3">
        <div className="gradient-panel surface-card space-y-2 p-6 lg:col-span-2">
          <Badge variant="secondary">Promo Code: LAPTOPAI10</Badge>
          <h3 className="text-xl font-bold">10% Off Your First AI-Assisted Laptop Order</h3>
          <p className="text-sm text-muted-foreground">
            Apply discount code <span className="font-mono font-semibold text-foreground">LAPTOPAI10</span> during checkout. Valid for all 70 laptop models including ASUS, Lenovo, Apple, and Dell.
          </p>
          <Button asChild variant="secondary" className="rounded-xl">
            <Link to="/shop">Shop Laptops with Promo</Link>
          </Button>
        </div>
        <div className="gradient-ai surface-card space-y-2 p-6 text-secondary-foreground">
          <Badge className="bg-card text-card-foreground">Need Consultation?</Badge>
          <h3 className="text-xl font-bold">Ask Our AI Consultant</h3>
          <p className="text-sm opacity-90">
            Tell the AI your budget and target software (VS Code, Blender, Premiere, Cyberpunk) for tailored advice.
          </p>
          <Button variant="outline" className="rounded-xl bg-card" onClick={() => handleAskAi()}>
            Chat with AI
          </Button>
        </div>
      </section>

      {/* Latest arrivals */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div>
          <h2 className="text-2xl font-bold">Latest Laptop Arrivals</h2>
          <p className="text-sm text-muted-foreground">Fresh 2026 releases with next-gen Intel Core Ultra, AMD Ryzen 8000 & Apple M4</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
    </AdminCustomerGuard>
  );
}
