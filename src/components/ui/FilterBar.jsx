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

  const selectClasses =
    "bg-white border border-gray-mid/60 rounded-lg px-3 py-2.5 text-sm text-charcoal cursor-pointer focus:outline-none focus:border-primary transition-colors appearance-none";

  return (
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

      {/* Active filter count */}
      {Object.values(filters).filter(Boolean).length > 0 && (
        <button
          onClick={() => onFilterChange({})}
          className="text-sm text-primary hover:text-primary-dark font-medium cursor-pointer transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
