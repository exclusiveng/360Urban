import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Car, MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatPrice } from "../../lib/utils";

export default function PropertyCard({ property, index = 0 }) {
  const isLand = property.propertyType === "Land";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/property/${property.slug}`}
        className="group block bg-white rounded-xl border border-gray-mid/40 overflow-hidden no-underline transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <StatusBadge status={property.status} />
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-charcoal/80 text-white text-xs font-medium px-2.5 py-1 rounded-md">
              {property.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          {/* Price */}
          <p className="text-primary-dark font-bold text-lg mb-1">
            {formatPrice(property.price)}
            {property.category === "Rent" && (
              <span className="text-gray-text font-normal text-sm">/yr</span>
            )}
          </p>

          {/* Title */}
          <h3 className="text-charcoal font-semibold text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-text text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {property.area}, {property.city}
            </span>
          </div>

          {/* Specs */}
          {!isLand && (
            <div className="flex items-center gap-4 pt-3 border-t border-gray-mid/40">
              <div className="flex items-center gap-1.5 text-sm text-gray-text">
                <Bed className="w-4 h-4" />
                <span>{property.rooms}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-text">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-text">
                <Car className="w-4 h-4" />
                <span>{property.parking}</span>
              </div>
              <span className="ml-auto text-xs text-gray-text bg-gray-light px-2 py-0.5 rounded">
                {property.propertyType}
              </span>
            </div>
          )}

          {isLand && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-mid/40">
              <span className="text-sm text-gray-text">Land</span>
              <span className="text-xs text-gray-text bg-gray-light px-2 py-0.5 rounded">
                {property.propertyType}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
