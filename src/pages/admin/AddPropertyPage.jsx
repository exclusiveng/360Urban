import { useState } from "react";
import { Save, Image as ImageIcon, Eye, Copy, RefreshCw } from "lucide-react";
import { areas } from "../../data/areas";
import Button from "../../components/ui/Button";

const propertyTypes = [
  "Flat",
  "Duplex",
  "Self-Contain",
  "Land",
  "Bungalow",
  "Terrace",
];
const categories = ["Rent", "Sale", "Land"];

export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Rent",
    propertyType: "Flat",
    price: "",
    areaSlug: areas[0]?.slug || "",
    city: "Abuja",
    state: "FCT",
    rooms: "",
    bathrooms: "",
    parking: "",
    water: true,
    electricity: true,
    description: "",
    images: ["", "", ""],
    agentFee: "",
    inspectionFee: "",
    featured: false,
    status: "Available",
  });

  const [jsonOutput, setJsonOutput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const generateJSON = () => {
    const propertyData = {
      id: crypto.randomUUID(),
      title: formData.title,
      slug: generateSlug(formData.title),
      category: formData.category,
      propertyType: formData.propertyType,
      area: areas.find((a) => a.slug === formData.areaSlug)?.name || "Unknown",
      areaSlug: formData.areaSlug,
      city: formData.city,
      state: formData.state,
      price: Number(formData.price),
      rooms: Number(formData.rooms),
      bathrooms: Number(formData.bathrooms),
      parking: Number(formData.parking),
      water: formData.water,
      electricity: formData.electricity,
      status: formData.status,
      featured: formData.featured,
      images: formData.images.filter((img) => img.trim() !== ""),
      description: formData.description,
      agentFee: Number(formData.agentFee),
      inspectionFee: Number(formData.inspectionFee),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setJsonOutput(JSON.stringify(propertyData, null, 2));
    setShowPreview(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    alert("JSON copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-charcoal">
            Add Property
          </h1>
          <p className="text-gray-text mt-1">
            Create a new listing for the platform.
          </p>
        </div>
        <Button
          onClick={generateJSON}
          disabled={!formData.title || !formData.price}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview JSON
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <section className="bg-white p-6 rounded-xl border border-gray-mid/40 shadow-sm">
            <h2 className="text-lg font-semibold text-charcoal mb-5 pb-2 border-b border-gray-mid/20">
              Basic Information
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Property Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Luxury 3 Bedroom Flat in Jabi"
                  className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none bg-white"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Price (NGN)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="2500000"
                    className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Area
                  </label>
                  <select
                    name="areaSlug"
                    value={formData.areaSlug}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none bg-white"
                  >
                    {areas.map((area) => (
                      <option key={area.slug} value={area.slug}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the property features, surroundings, etc."
                  className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* Specifications */}
          <section className="bg-white p-6 rounded-xl border border-gray-mid/40 shadow-sm">
            <h2 className="text-lg font-semibold text-charcoal mb-5 pb-2 border-b border-gray-mid/20">
              Specifications
            </h2>
            <div className="grid grid-cols-3 gap-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Rooms
                </label>
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Baths
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Parking
                </label>
                <input
                  type="number"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="water"
                  checked={formData.water}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300 accent-primary"
                />
                <span className="text-sm text-charcoal">Water</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="electricity"
                  checked={formData.electricity}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300 accent-primary"
                />
                <span className="text-sm text-charcoal">Electricity</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300 accent-primary"
                />
                <span className="text-sm font-semibold text-primary">
                  Featured
                </span>
              </label>
            </div>
          </section>

          {/* Fees */}
          <section className="bg-white p-6 rounded-xl border border-gray-mid/40 shadow-sm">
            <h2 className="text-lg font-semibold text-charcoal mb-5 pb-2 border-b border-gray-mid/20">
              Fees (Admin Only)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Agent Fee
                </label>
                <input
                  type="number"
                  name="agentFee"
                  value={formData.agentFee}
                  onChange={handleChange}
                  placeholder="e.g. 100000"
                  className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Inspection Fee
                </label>
                <input
                  type="number"
                  name="inspectionFee"
                  value={formData.inspectionFee}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none"
                />
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white p-6 rounded-xl border border-gray-mid/40 shadow-sm">
            <h2 className="text-lg font-semibold text-charcoal mb-5 pb-2 border-b border-gray-mid/20">
              Images (URLs)
            </h2>
            <div className="space-y-3">
              {formData.images.map((url, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-light rounded-lg flex items-center justify-center shrink-0 border border-gray-mid/30">
                    <ImageIcon className="w-5 h-5 text-gray-text" />
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    placeholder={`Image URL ${i + 1}`}
                    className="flex-1 p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none text-sm transition-colors"
                  />
                  {url && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-mid/30 shrink-0">
                      <img
                        src={url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
              <p className="text-xs text-gray-text mt-2 pl-1">
                * Paste valid image URLs (e.g., from Unsplash or Cloudinary)
              </p>
            </div>
            <button
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  images: [...prev.images, ""],
                }))
              }
              className="mt-4 text-sm text-primary font-medium hover:underline flex items-center gap-1"
            >
              <PlusIcon className="w-4 h-4" /> Add another image
            </button>
          </section>
        </div>

        {/* Preview / JSON Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="bg-charcoal text-white p-6 rounded-xl shadow-lg border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">JSON Output</h3>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Copy this JSON and append it to{" "}
                <code>src/data/properties.js</code> to add the listing to the
                database.
              </p>

              <div className="bg-black/40 p-3 rounded-lg border border-white/10 overflow-hidden relative">
                {showPreview ? (
                  <pre className="text-[10px] overflow-auto max-h-[400px] font-mono text-primary-light scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {jsonOutput}
                  </pre>
                ) : (
                  <div className="h-40 flex flex-col items-center justify-center text-white/30 text-xs text-center">
                    <RefreshCw className="w-8 h-8 mb-2 opacity-50" />
                    <span>Fill details & click Preview</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl">
              <h4 className="text-primary font-bold text-sm mb-2">
                Admin Tips
              </h4>
              <ul className="text-xs text-charcoal/80 space-y-2 list-disc pl-4">
                <li>Ensure images are high-resolution but optimized.</li>
                <li>
                  Write engaging descriptions that highlight key features.
                </li>
                <li>Double-check the Area selection for accurate mapping.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
