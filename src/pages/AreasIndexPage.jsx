import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/layout/SEO";
import AreaCard from "../components/ui/AreaCard";
import { areas } from "../data/areas";

export default function AreasIndexPage() {
  return (
    <>
      <SEO
        title="Explore Areas in Abuja"
        description="Browse properties by neighbourhood in Abuja — Jabi, Maitama, Gwarinpa, Katampe, Lugbe, Wuse, and more."
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
              Explore Areas in Abuja
            </h1>
            <p className="text-white/60 max-w-2xl">
              Each neighbourhood in Abuja has its own character. Find the area
              that suits your lifestyle and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-10 md:py-16 bg-gray-light">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {areas.map((area, i) => (
              <AreaCard key={area.slug} area={area} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
