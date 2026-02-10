import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import SEO from "../components/layout/SEO";
import PropertyCard from "../components/ui/PropertyCard";
import FilterBar from "../components/ui/FilterBar";
import CTASection from "../components/sections/CTASection";
import { properties } from "../data/properties";
import { areas } from "../data/areas";
import { filterProperties, cn } from "../lib/utils";

export default function ListingsPage() {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState("grid");

  const filtered = filterProperties(properties, filters);

  return (
    <>
      <SEO
        title="All Property Listings in Abuja"
        description="Browse all verified property listings in Abuja — houses, flats, duplexes, and land for rent and sale."
      />

      {/* Header */}
      <section className="bg-charcoal">
        <div className="container-main py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              All Listings
            </h1>
            <p className="text-white/60 max-w-2xl">
              Browse verified properties across Abuja. Use filters to find
              exactly what you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-16 bg-gray-light">
        <div className="container-main">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              showAreaFilter
              areas={areas}
            />

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-white border border-gray-mid/50 rounded-lg p-1 shrink-0 self-start">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors cursor-pointer",
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "text-gray-text hover:text-charcoal",
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-colors cursor-pointer",
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "text-gray-text hover:text-charcoal",
                )}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-text mb-6">
            Showing {filtered.length} of {properties.length} properties
          </p>

          {/* Results */}
          {filtered.length > 0 ? (
            <div
              className={cn(
                "gap-5 md:gap-6",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid grid-cols-1 max-w-3xl",
              )}
            >
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-text text-lg mb-2">
                No properties match your filters
              </p>
              <p className="text-gray-text text-sm">
                Try different criteria or{" "}
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
