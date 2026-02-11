import { SlidersHorizontal, X as XIcon } from "lucide-react";
import { categories, propertyTypes, priceRanges } from "../../lib/utils";

export default function FilterBar({
  filters,
  onFilterChange,
  showAreaFilter = false,
  areas = [],
}) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const handlePriceChange = (value) => {
    const range = priceRanges[parseInt(value)];
    onFilterChange({
      ...filters,
      minPrice: range.min,
      maxPrice: range.max,
    });
  };

  const currentPriceIndex = priceRanges.findIndex(
    (r) =>
      r.min === (filters.minPrice || null) &&
      r.max === (filters.maxPrice || null),
  );

  const activeCount = Object.values(filters).filter(Boolean).length;

  const selectClasses =
    "select-styled bg-white border border-gray-mid/60 rounded-lg px-3.5 py-2.5 text-sm text-charcoal cursor-pointer focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 appearance-none hover:border-charcoal/30";

  return (
    <div className="bg-white border border-gray-mid/40 rounded-xl p-4 md:p-5">
      {/* Filter label */}
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-charcoal">Filters</span>
        {activeCount > 0 && (
          <span className="ml-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </div>

      {/* Filter selects */}
      <div className="flex flex-wrap items-center gap-3">
        {showAreaFilter && areas.length > 0 && (
          <select
            value={filters.area || ""}
            onChange={(e) => handleChange("area", e.target.value)}
            className={selectClasses}
            aria-label="Filter by area"
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className={selectClasses}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filters.propertyType || ""}
          onChange={(e) => handleChange("propertyType", e.target.value)}
          className={selectClasses}
          aria-label="Filter by property type"
        >
          <option value="">All Types</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={currentPriceIndex >= 0 ? currentPriceIndex : 0}
          onChange={(e) => handlePriceChange(e.target.value)}
          className={selectClasses}
          aria-label="Filter by price range"
        >
          {priceRanges.map((range, i) => (
            <option key={i} value={i}>
              {range.label}
            </option>
          ))}
        </select>

        {/* Clear button */}
        {activeCount > 0 && (
          <button
            onClick={() => onFilterChange({})}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm text-error font-medium cursor-pointer transition-all duration-200 rounded-lg border border-error/20 bg-error/5 hover:bg-error/10"
          >
            <XIcon className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
