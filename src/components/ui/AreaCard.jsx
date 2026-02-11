import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { getPropertiesByArea } from "../../data/properties";

export default function AreaCard({ area, index = 0 }) {
  const propertyCount = getPropertiesByArea(area.slug).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
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
            className="w-full h-full object-cover opacity-60 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-45"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Vignette overlay - enhanced for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

        {/* Pin icon top-right */}
        <div className="absolute top-4 right-4 w-9 h-9 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/40 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-lg">
          <MapPin className="w-4 h-4 text-primary-light" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Golden accent bar */}
          <div className="w-12 h-1 bg-primary rounded-full mb-4 transition-all duration-300 group-hover:w-16 shadow-sm" />

          <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-tight drop-shadow-md">
            {area.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm font-medium backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded-md border border-white/10">
              {propertyCount} {propertyCount === 1 ? "property" : "properties"}
            </span>
            <span className="flex items-center gap-1.5 text-primary text-sm font-bold uppercase tracking-wider opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Top + bottom accent lines */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100" />
      </Link>
    </motion.div>
  );
}
