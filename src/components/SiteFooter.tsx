import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="surface-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <span className="font-display text-2xl tracking-tight">Aadmoz</span>
          <p className="mt-3 text-sm text-mist/70">
            Kempton Park, Gauteng
            <br />
            South Africa
          </p>
        </div>
        <div className="text-sm text-mist/80">
          <h4 className="eyebrow">Get in touch</h4>
          <p className="mt-3">
            <a href="mailto:hello@aadmoz.co.za" className="hover:text-gold-500">
              hello@aadmoz.co.za
            </a>
          </p>
          <p className="mt-1">
            <a href="https://wa.me/27821234567" className="hover:text-gold-500">
              +27 82 123 4567
            </a>
          </p>
        </div>
        <div className="text-sm text-mist/80">
          <h4 className="eyebrow">Browse</h4>
          <ul className="mt-3 space-y-1">
            <li>
              <Link to="/" hash="top" className="hover:text-gold-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gold-500">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" hash="story" className="hover:text-gold-500">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/" hash="contact" className="hover:text-gold-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-mist/10 px-6 py-5 text-center text-xs text-mist/50">
        © {new Date().getFullYear()} Aadmoz. All rights reserved.
      </div>
    </footer>
  );
}
