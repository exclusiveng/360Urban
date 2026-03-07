import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Shield, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import heroImg from "../../assets/360urbanhero.jpg";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-light to-white pt-28 pb-0 md:pt-44 md:pb-32 overflow-hidden">
      {/* Soft decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-charcoal px-4 py-2 rounded-xl text-xs font-semibold mb-8 shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-primary" />
              Verified Properties Only
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-charcoal leading-[1.1] tracking-tight mb-6"
            >
              Find your next <span className="text-primary">perfect home</span>{" "}
              in Abuja
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Browse verified houses, flats, and land across Abuja&apos;s best
              neighbourhoods. No hidden fees, just real properties.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/listings" className="no-underline">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  <Search className="w-4 h-4" />
                  Browse Listings
                </Button>
              </Link>
              <Link to="/areas" className="no-underline">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto px-8"
                >
                  Explore Areas
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats - Desktop only in this position */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-20 pt-20 border-t border-gray-200/60 hidden sm:flex flex-wrap gap-12 md:gap-16"
            >
              {[
                { value: "6+", label: "Neighbourhoods" },
                { value: "50+", label: "Verified Listings" },
                { value: "100%", label: "Transparency" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-extrabold text-charcoal tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto max-w-2xl"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              <img
                src={heroImg}
                alt="Luxury home in Abuja"
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            </div>

            {/* Soft decorative circles around image */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Mobile Stats - Shown below image on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-2 border-t border-gray-200/60 grid grid-cols-3 gap-2 sm:hidden"
          >
            {[
              { value: "6+", label: "Neighbourhoods" },
              { value: "50+", label: "Verified Listings" },
              { value: "100%", label: "Transparency" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-extrabold text-charcoal tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
