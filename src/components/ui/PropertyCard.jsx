import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Car, MapPin, ArrowUpRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatPrice } from "../../lib/utils";

export default function PropertyCard({ property, index = 0 }) {
  const isLand = property.propertyType === "Land";
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link
        to={`/property/${property.slug}`}
        className="group block bg-white rounded-xl border border-gray-mid/40 overflow-hidden no-underline card-lift hover:border-primary/30"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Skeleton */}
          {!imgLoaded && <div className="absolute inset-0 img-skeleton" />}
          <img
            src={property.images[0]}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
          {/* Dark bottom vignette for readability */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.4),transparent)] pointer-events-none" />

          <div className="absolute top-3 left-3">
            <StatusBadge status={property.status} />
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-charcoal/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10">
              {property.category}
            </span>
          </div>

          {/* Hover arrow icon */}
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <p className="text-primary-dark font-bold text-lg tracking-tight">
              {formatPrice(property.price)}
            </p>
            {property.category === "Rent" && (
              <span className="text-gray-text font-normal text-xs">/yr</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-charcoal font-semibold text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-text text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary/60" />
            <span>
              {property.area}, {property.city}
            </span>
          </div>

          {/* Specs */}
          {!isLand && (
            <div className="flex items-center gap-3 pt-3 border-t border-gray-mid/40">
              <div
                className="flex items-center gap-1.5 text-sm text-gray-text"
                title="Bedrooms"
              >
                <div className="w-7 h-7 rounded-md bg-gray-light flex items-center justify-center">
                  <Bed className="w-3.5 h-3.5 text-charcoal" />
                </div>
                <span className="font-medium text-charcoal">
                  {property.rooms}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 text-sm text-gray-text"
                title="Bathrooms"
              >
                <div className="w-7 h-7 rounded-md bg-gray-light flex items-center justify-center">
                  <Bath className="w-3.5 h-3.5 text-charcoal" />
                </div>
                <span className="font-medium text-charcoal">
                  {property.bathrooms}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 text-sm text-gray-text"
                title="Parking"
              >
                <div className="w-7 h-7 rounded-md bg-gray-light flex items-center justify-center">
                  <Car className="w-3.5 h-3.5 text-charcoal" />
                </div>
                <span className="font-medium text-charcoal">
                  {property.parking}
                </span>
              </div>
              <span className="ml-auto text-[11px] text-gray-text font-medium bg-gray-light px-2 py-1 rounded-md">
                {property.propertyType}
              </span>
            </div>
          )}

          {isLand && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-mid/40">
              <span className="text-sm text-gray-text">Land</span>
              <span className="text-[11px] text-gray-text font-medium bg-gray-light px-2 py-1 rounded-md">
                {property.propertyType}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
