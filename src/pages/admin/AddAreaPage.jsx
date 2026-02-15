import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  UploadCloud,
  X,
} from "lucide-react";
import { areaService } from "../../services/areaService";
import Button from "../../components/ui/Button";

export default function AddAreaPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingArea, setLoadingArea] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (preview && !preview.startsWith("http")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Fetch area data if in edit mode
  useEffect(() => {
    const fetchArea = async () => {
      if (!isEditMode) return;

      try {
        setLoadingArea(true);
        const response = await areaService.getAreaById(id);
        if (response.success) {
          const area = response.data;
          setFormData({
            name: area.name || "",
            description: area.description || "",
          });
          if (area.image) {
            setPreview(area.image);
          }
        } else {
          setError(response.error || "Failed to fetch area details");
        }
      } catch (err) {
        console.error("Error fetching area:", err);
        setError("An error occurred while fetching area details");
      } finally {
        setLoadingArea(false);
      }
    };

    fetchArea();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name) {
      setError("Please fill in the required name field.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      } else if (isEditMode && preview) {
        // If in edit mode and we have a preview (URL) but no new file,
        // we might want to tell the backend to keep it.
        // In our backend, if no file is sent, and 'image' is in body, it uses that.
        data.append("image", preview);
      }

      const response = isEditMode
        ? await areaService.updateArea(id, data)
        : await areaService.createArea(data);

      if (response.success) {
        setSuccess(true);
        if (!isEditMode) {
          // Reset form
          setFormData({
            name: "",
            description: "",
          });
          setImageFile(null);
          setPreview(null);
        }
        // Redirect to dashboard after 2 seconds
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        setError(
          response.error ||
            `Failed to ${isEditMode ? "update" : "create"} area`,
        );
      }
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} area:`, err);
      setError(
        err.message ||
          `An error occurred while ${isEditMode ? "updating" : "creating"} the area`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-charcoal">
            {isEditMode ? "Edit Area" : "Add New Area"}
          </h1>
          <p className="text-gray-text mt-1">
            {isEditMode
              ? "Update the area details and cover image."
              : "Create a new location for property listings."}
          </p>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 flex items-start gap-3 bg-error/10 border border-error/30 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-error">Error</p>
            <p className="text-sm text-error/80">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-3 bg-success/10 border border-success/30 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-success">Success</p>
            <p className="text-sm text-success/80">
              Area {isEditMode ? "updated" : "created"} successfully!
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      )}

      {loadingArea && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-text">Loading area details...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white p-6 rounded-xl border border-gray-mid/40 shadow-sm">
          <h2 className="text-lg font-semibold text-charcoal mb-5 pb-2 border-b border-gray-mid/20">
            Area Details
          </h2>
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Area Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Maitama"
                required
                className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Briefly describe the area (amenities, vibe, etc.)"
                className="w-full p-2.5 rounded-lg border border-gray-mid focus:border-primary outline-none resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Area Image
              </label>

              {!preview ? (
                <label className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="p-3 rounded-full bg-gray-50 group-hover:bg-white transition-colors">
                    <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-charcoal">
                      Click to upload cover image
                    </p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (max 5MB)
                    </p>
                  </div>
                </label>
              ) : (
                <div className="relative h-64 rounded-xl overflow-hidden border border-gray-200 group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-error hover:bg-error hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {imageFile?.name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Area"
                : "Create Area"}
          </button>
        </div>
      </form>
    </div>
  );
}
