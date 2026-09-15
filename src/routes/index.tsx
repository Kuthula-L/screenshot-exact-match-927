import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Shirt, Footprints, Watch, PanelBottom } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { productsQueryOptions } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aadmoz | Curated Clothing in Kempton Park, Gauteng" },
      {
        name: "description",
        content:
          "Aadmoz is a small South African clothing store in Kempton Park. Browse tops, bottoms, accessories and footwear, then enquire directly — no checkout.",
      },
      { property: "og:title", content: "Aadmoz | Curated South African Clothing" },
      {
        property: "og:description",
        content:
          "A solo-run boutique in Kempton Park, Gauteng. Prices in Rand, personal replies by email or WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "Home", hash: "top" },
  { label: "Shop", hash: "shop" },
  { label: "Our Story", hash: "story" },
  { label: "Contact", hash: "contact" },
];

const CATEGORY_STRIP = [
  { label: "Tops", Icon: Shirt },
  { label: "Bottoms", Icon: PanelBottom },
  { label: "Accessories", Icon: Watch },
  { label: "Footwear", Icon: Footprints },
];

function Home() {
  const { data: products = [] } = useQuery(productsQueryOptions);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const enquire = new URLSearchParams(window.location.search).get("enquire");
    if (!enquire) return;
    setMessage(`I'd like to find out more about the ${enquire}.`);
    window.setTimeout(
      () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }, []);

  const handleEnquire = (product: Product) => {
    setMessage(`I'd like to find out more about the ${product.name}.`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="top" className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl tracking-tight">Aadmoz</span>
          <nav className="flex items-center gap-5 text-sm font-medium">
            {NAV.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollTo(item.hash)}
                className="text-muted-foreground transition-colors hover:text-gold-500"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="hero-gradient relative overflow-hidden">
        <img
          src={heroImage}
          alt="Aadmoz model wearing a cream linen shirt and tailored trousers"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover object-right opacity-70"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
          <div className="max-w-lg">
            <span className="eyebrow">Kempton Park · Gauteng</span>
            <h1 className="mt-4 text-4xl leading-tight text-mist sm:text-6xl">
              Quietly considered clothing, chosen one piece at a time.
            </h1>
            <p className="mt-5 max-w-md text-mist/75">
              A small South African wardrobe of tops, bottoms, accessories and footwear. See
              something you love? Send an enquiry and we&apos;ll take it from there.
            </p>
            <button
              type="button"
              onClick={() => scrollTo("shop")}
              className="mt-8 rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-400"
            >
              Shop the collection
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-mist">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-10 sm:grid-cols-4">
          {CATEGORY_STRIP.map(({ label, Icon }) => (
            <Link
              key={label}
              to="/shop"
              className="group flex flex-col items-center gap-3 rounded-lg py-4 transition-colors hover:bg-background"
            >
              <Icon
                className="h-7 w-7 text-navy-700 transition-colors group-hover:text-gold-500"
                strokeWidth={1.25}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-900">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="max-w-xl">
          <span className="eyebrow">The collection</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Shop the Collection</h2>
          <p className="mt-3 text-muted-foreground">
            A handful of current favourites. Prices in South African Rand.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} onEnquire={handleEnquire} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex rounded-md border border-navy-900 px-7 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-mist"
          >
            Show All Products
          </Link>
        </div>
      </section>

      <section id="story" className="surface-dark scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-3 text-3xl text-mist sm:text-4xl">
              One person, one carefully edited rail.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-mist/75">
            <p>
              Aadmoz began in a spare room in Kempton Park with a simple frustration: too many
              online stores, too little care. Every item here is chosen by hand, worn, washed and
              judged before it earns a place in the collection.
            </p>
            <p>
              Because it&apos;s just one person behind the store, we keep quantities small and
              honest. If something is out of stock, we say so — and we tell you when it&apos;s
              coming back.
            </p>
            <p>
              There is no cart and no rush. You enquire, we reply personally by email or WhatsApp,
              and we sort out sizing, colour and delivery like people, not order numbers.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-mist">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Send an enquiry</h2>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Tell us what you&apos;re after and how you&apos;d like to be reached. We reply within
              one working day.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="text-muted-foreground">hello@aadmoz.co.za</dd>
              </div>
              <div>
                <dt className="font-semibold">WhatsApp</dt>
                <dd className="text-muted-foreground">+27 82 123 4567</dd>
              </div>
              <div>
                <dt className="font-semibold">Based in</dt>
                <dd className="text-muted-foreground">Kempton Park, Gauteng, South Africa</dd>
              </div>
            </dl>
          </div>
          <ContactForm message={message} onMessageChange={setMessage} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
