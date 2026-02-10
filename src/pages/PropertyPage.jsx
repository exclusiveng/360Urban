import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Bed,
  Bath,
  Car,
  Droplets,
  Zap,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";
import SEO from "../components/layout/SEO";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import { getPropertyBySlug } from "../data/properties";
import { formatPrice, generateWhatsAppLink } from "../lib/utils";

export default function PropertyPage() {
  const { slug } = useParams();
  const property = getPropertyBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!property) {
    return (
      <div className="container-main py-24 text-center">
        <h1 className="text-2xl font-bold text-charcoal mb-4">
          Property Not Found
        </h1>
        <p className="text-gray-text mb-6">
          This property doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/listings"
          className="text-primary font-medium no-underline hover:text-primary-dark"
        >
          Browse all listings
        </Link>
      </div>
    );
  }

  const isLand = property.propertyType === "Land";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://360urban.ng/property/${property.slug}`,
    image: property.images,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "NGN",
      availability:
        property.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.area,
      addressRegion: property.state,
      addressCountry: "NG",
    },
  };

  const nextImage = () =>
    setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () =>
    setActiveImage(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );

  return (
    <>
      <SEO
        title={`${property.title} — ${formatPrice(property.price)}`}
        description={property.description}
        image={property.images[0]}
        jsonLd={jsonLd}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-light border-b border-gray-mid/30">
        <div className="container-main py-3">
          <nav
            className="flex items-center gap-1.5 text-sm text-gray-text"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="no-underline text-gray-text hover:text-primary transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/areas/${property.areaSlug}`}
              className="no-underline text-gray-text hover:text-primary transition-colors"
            >
              {property.area}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-charcoal truncate max-w-48">
              {property.title}
            </span>
          </nav>
        </div>
      </div>

      <section className="py-8 md:py-12 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left column: gallery + details */}
            <div className="lg:col-span-3">
              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                {/* Main Image */}
                <div
                  className="relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer mb-3"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={property.images[activeImage]}
                    alt={`${property.title} - Image ${activeImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 text-charcoal" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 text-charcoal" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-3 right-3 bg-charcoal/70 text-white text-xs px-2.5 py-1 rounded-md">
                    {activeImage + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {property.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {property.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                          i === activeImage
                            ? "border-primary"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className="text-lg font-semibold text-charcoal mb-3">
                  About This Property
                </h2>
                <p className="text-gray-text leading-relaxed">
                  {property.description}
                </p>
              </motion.div>
            </div>

            {/* Right column: info + CTA */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="lg:sticky lg:top-24"
              >
                {/* Info card */}
                <div className="bg-gray-light border border-gray-mid/30 rounded-xl p-6 md:p-7">
                  {/* Status + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <StatusBadge status={property.status} />
                    <span className="text-xs font-semibold text-gray-text bg-white px-3 py-1 rounded-md uppercase tracking-wide">
                      For {property.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-xl md:text-2xl font-bold text-charcoal mb-2">
                    {property.title}
                  </h1>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-gray-text text-sm mb-5">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>
                      {property.area}, {property.city}, {property.state}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="bg-white rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-text mb-1">Price</p>
                    <p className="text-2xl font-bold text-primary-dark">
                      {formatPrice(property.price)}
                      {property.category === "Rent" && (
                        <span className="text-gray-text font-normal text-sm">
                          {" "}
                          / year
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Specs */}
                  {!isLand && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center gap-2.5 bg-white rounded-lg p-3">
                        <Bed className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-gray-text">Bedrooms</p>
                          <p className="font-semibold text-charcoal">
                            {property.rooms}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white rounded-lg p-3">
                        <Bath className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-gray-text">Bathrooms</p>
                          <p className="font-semibold text-charcoal">
                            {property.bathrooms}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white rounded-lg p-3">
                        <Car className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-gray-text">Parking</p>
                          <p className="font-semibold text-charcoal">
                            {property.parking}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white rounded-lg p-3">
                        <Droplets className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-gray-text">Water</p>
                          <p className="font-semibold text-charcoal">
                            {property.water ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Utilities */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-mid/40">
                    <div className="flex items-center gap-2 text-sm">
                      <Zap
                        className={`w-4 h-4 ${property.electricity ? "text-success" : "text-error"}`}
                      />
                      <span className="text-gray-text">
                        Electricity:{" "}
                        <strong className="text-charcoal">
                          {property.electricity ? "Yes" : "No"}
                        </strong>
                      </span>
                    </div>
                    {!isLand && (
                      <div className="flex items-center gap-2 text-sm">
                        <Droplets
                          className={`w-4 h-4 ${property.water ? "text-success" : "text-error"}`}
                        />
                        <span className="text-gray-text">
                          Water:{" "}
                          <strong className="text-charcoal">
                            {property.water ? "Yes" : "No"}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="whatsapp"
                    size="lg"
                    href={generateWhatsAppLink(property.title, property.area)}
                    className="w-full"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Inquire / Inspect
                  </Button>

                  <p className="text-xs text-gray-text text-center mt-3">
                    Opens WhatsApp with a pre-filled message
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-4xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-contain"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
