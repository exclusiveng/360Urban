import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getPropertiesByArea } from "../../data/properties";

export default function AreaCard({ area, index = 0 }) {
  const propertyCount = getPropertiesByArea(area.slug).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/areas/${area.slug}`}
        className="group block relative overflow-hidden rounded-xl aspect-[3/2] no-underline"
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-charcoal">
          <img
            src={area.image}
            alt={`Properties in ${area.name}, Abuja`}
            className="w-full h-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
            {area.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">
              {propertyCount} {propertyCount === 1 ? "property" : "properties"}
            </span>
            <span className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 translate-x-[-8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
    </motion.div>
  );
}
