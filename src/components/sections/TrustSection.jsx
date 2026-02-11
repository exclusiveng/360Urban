import { motion } from "framer-motion";
import { ShieldCheck, Eye, MessageCircle, BadgeCheck } from "lucide-react";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is inspected and confirmed before it appears on 360Urban.",
  },
  {
    icon: Eye,
    title: "No Hidden Fees",
    description:
      "Prices are transparent. What you see is what you get — no surprise charges.",
  },
  {
    icon: MessageCircle,
    title: "Direct Contact",
    description: "Reach out directly via WhatsApp. No middlemen, no runaround.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Platform",
    description:
      "Built for Abuja residents who want a stress-free property search experience.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
            Why 360Urban
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            Property Search Without the Stress
          </h2>
          <div className="w-12 h-[3px] bg-primary rounded-full mx-auto" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative bg-white border border-gray-mid/30 rounded-xl p-8 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-primary scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100 rounded-full" />

              <div className="relative inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-5 transition-colors duration-300 group-hover:bg-primary/15">
                <point.icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-base font-semibold text-charcoal mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-gray-text leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
