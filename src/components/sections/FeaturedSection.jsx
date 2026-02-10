import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "../../data/properties";
import PropertyCard from "../ui/PropertyCard";

export default function FeaturedSection() {
  const featured = getFeaturedProperties();

  if (featured.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-light">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4"
        >
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
              Featured
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
              Hand-Picked Properties
            </h2>
            <p className="text-gray-text mt-2 max-w-lg">
              Our top verified listings — inspected, confirmed, and ready for
              you.
            </p>
          </div>
          <Link
            to="/listings"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark no-underline transition-colors shrink-0"
          >
            View all listings <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
