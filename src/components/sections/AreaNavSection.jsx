import { motion } from "framer-motion";
import { areas } from "../../data/areas";
import AreaCard from "../ui/AreaCard";

export default function AreaNavSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
            Explore by Area
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
            Popular Neighbourhoods in Abuja
          </h2>
          <p className="text-gray-text mt-2 max-w-lg">
            Every area has its character. Find the neighbourhood that matches
            your lifestyle and budget.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {areas.map((area, i) => (
            <AreaCard key={area.slug} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
