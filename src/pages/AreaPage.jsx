import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SEO from "../components/layout/SEO";
import PropertyCard from "../components/ui/PropertyCard";
import FilterBar from "../components/ui/FilterBar";
import CTASection from "../components/sections/CTASection";
import { getAreaBySlug } from "../data/areas";
import { getPropertiesByArea } from "../data/properties";
import { filterProperties } from "../lib/utils";

export default function AreaPage() {
  const { areaSlug } = useParams();
  const area = getAreaBySlug(areaSlug);
  const [filters, setFilters] = useState({});

  if (!area) {
    return (
      <div className="container-main py-24 text-center">
        <h1 className="text-2xl font-bold text-charcoal mb-4">
          Area Not Found
        </h1>
        <p className="text-gray-text mb-6">
          The area you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="text-primary font-medium no-underline hover:text-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const areaProperties = getPropertiesByArea(area.slug);
  const filtered = filterProperties(areaProperties, filters);

  return (
    <>
      <SEO
        title={`Properties in ${area.name}, Abuja`}
        description={`Find verified houses, flats, and land for rent and sale in ${area.name}, Abuja. ${area.description}`}
      />

      {/* Breadcrumb + Header */}
      <section className="bg-charcoal">
        <div className="container-main py-12 md:py-16">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm text-white/50 mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="no-underline text-white/50 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to="/areas"
              className="no-underline text-white/50 hover:text-primary transition-colors"
            >
              Areas
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary">{area.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Properties in {area.name}
            </h1>
            <p className="text-white/60 max-w-2xl leading-relaxed">
              {area.description}
            </p>
            <p className="text-white/40 text-sm mt-3">
              {areaProperties.length}{" "}
              {areaProperties.length === 1 ? "property" : "properties"}{" "}
              available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-10 md:py-16 bg-gray-light">
        <div className="container-main">
          {/* Filters */}
          <div className="mb-8">
            <FilterBar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-text text-lg mb-2">No properties found</p>
              <p className="text-gray-text text-sm">
                Try adjusting your filters or{" "}
                <button
                  onClick={() => setFilters({})}
                  className="text-primary font-medium cursor-pointer"
                >
                  clear all filters
                </button>
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
