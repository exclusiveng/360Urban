import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "All Listings", path: "/listings" },
  { label: "Jabi", path: "/areas/jabi" },
  { label: "Maitama", path: "/areas/maitama" },
  { label: "Gwarinpa", path: "/areas/gwarinpa" },
];

const areaLinks = [
  { label: "Katampe", path: "/areas/katampe" },
  { label: "Lugbe", path: "/areas/lugbe" },
  { label: "Wuse", path: "/areas/wuse" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-white" role="contentinfo">
      <div className="container-main pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white">
                360<span className="text-primary">Urban</span>
              </span>
            </Link>
            <p className="text-gray-text text-sm leading-relaxed max-w-xs">
              Abuja&apos;s trusted platform for verified property listings. No
              hidden fees, no agent stress — just real properties.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-mid hover:text-primary no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Areas */}
          <div>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              More Areas
            </h4>
            <ul className="space-y-2.5">
              {areaLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-mid hover:text-primary no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-mid">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-mid">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@360urban.ng</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-mid">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Abuja, FCT, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-6 border-t border-charcoal-light gap-4">
          <p className="text-xs text-gray-text">
            © {new Date().getFullYear()} 360Urban. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-gray-text hover:text-primary transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
