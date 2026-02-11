import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Shield, ChevronDown, Building2, MapPin } from "lucide-react";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-charcoal overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A017' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[15%] hidden lg:block">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border border-primary/20 rounded-2xl flex items-center justify-center rotate-12"
        >
          <Building2 className="w-7 h-7 text-primary/30" />
        </motion.div>
      </div>
      <div className="absolute bottom-28 right-[25%] hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="w-12 h-12 border border-primary/15 rounded-xl flex items-center justify-center -rotate-6"
        >
          <MapPin className="w-5 h-5 text-primary/25" />
        </motion.div>
      </div>

      {/* Vertical golden accent line */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-primary/10 hidden lg:block" />

      <div className="container-main relative py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/12 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/20"
          >
            <Shield className="w-4 h-4" />
            Verified Properties Only
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-display font-extrabold text-white leading-[1.1] mb-5"
          >
            Find Your Next Home
            <span className="relative block text-primary mt-1">
              in Abuja
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-24 h-1 bg-primary/40 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-white/65 text-base md:text-lg leading-relaxed mb-9 max-w-lg"
          >
            Browse verified houses, flats, duplexes, and land across
            Abuja&apos;s best neighbourhoods. No agent stress, no hidden fees,
            just real properties you can trust.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link to="/listings">
              <Button size="lg">
                <Search className="w-4 h-4" />
                Browse Listings
              </Button>
            </Link>
            <Link to="/areas">
              <Button
                variant="secondary"
                size="lg"
                className="border-white/20 text-white hover:text-primary hover:border-primary"
              >
                Explore Areas
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md"
        >
          {[
            { value: "6+", label: "Areas" },
            { value: "50+", label: "Listings" },
            { value: "100%", label: "Verified" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-center sm:text-left"
            >
              <p className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-white/40 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden md:flex items-center justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-white/25"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium">
              Scroll
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
