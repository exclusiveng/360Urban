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
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
            Why 360Urban
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
            Property Search Without the Stress
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                <point.icon className="w-6 h-6 text-primary" />
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
