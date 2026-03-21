import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import { areaService } from "../../services/areaService";
import fallbackHero from "../../assets/360urbanhero.jpg";

export default function HeroSection() {
  const [areas, setAreas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const result = await areaService.getAreas();
        if (result.success && result.data.length > 0) {
          setAreas(result.data.slice(0, 6)); // Top 6 areas for hero
        }
      } catch (err) {
        console.error("Failed to fetch areas for hero:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % (areas.length || 1));
  }, [areas.length]);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + (areas.length || 1)) % (areas.length || 1));
  }, [areas.length]);

  useEffect(() => {
    if (areas.length > 1) {
      const timer = setInterval(slideNext, 8000);
      return () => clearInterval(timer);
    }
  }, [areas.length, slideNext]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  const currentArea = areas[currentIndex] || {
    name: "Abuja",
    image: fallbackHero,
    slug: ""
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-light to-white pt-28 pb-0 md:pt-44 md:pb-32 overflow-hidden">
      {/* Soft decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
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
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-charcoal leading-[1.1] tracking-tight mb-6">
                  {areas.length > 0 ? (
                    <>
                      Find your next home in{" "}
                      <span className="text-primary">{currentArea.name}</span>
                    </>
                  ) : (
                    <>
                      Find your next <span className="text-primary">perfect home</span> in Abuja
                    </>
                  )}
                </h1>

                <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                  {areas.length > 0
                    ? `Explore the best houses, flats, and land listings currently available in ${currentArea.name}. Certified and stress-free.`
                    : "Browse verified houses, flats, and land across Abuja's best neighbourhoods. No hidden fees, just real properties."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to={currentArea.slug ? `/areas/${currentArea.slug}` : "/listings"}
                className="no-underline"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 transition-all hover:scale-105 active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  {currentArea.slug ? `View ${currentArea.name}` : "Browse Listings"}
                </Button>
              </Link>
              <Link to="/areas" className="no-underline">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto px-8 border-gray-200 hover:border-primary hover:text-primary"
                >
                  Explore Areas
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats - Desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-20 pt-16 border-t border-gray-200/60 hidden sm:flex flex-wrap gap-12 md:gap-16"
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

          {/* Hero Carousel Container */}
          <div className="relative lg:ml-auto w-full max-w-2xl group">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 aspect-video">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentArea.image}
                    alt={currentArea.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

                  {/* Area Info Overlay */}
                  <div className="absolute bottom-8 left-8">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-primary font-bold tracking-widest uppercase text-xs mb-1"
                    >
                      Featured Neighbourhood
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white text-3xl font-bold"
                    >
                      {currentArea.name}
                    </motion.h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {areas.length > 1 && (
              <>
                <button
                  onClick={slidePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-charcoal z-20 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={slideNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-charcoal z-20 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Indicators */}
            {areas.length > 1 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {areas.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-gray-200"
                    } cursor-pointer`}
                  />
                ))}
              </div>
            )}

            {/* Soft decorative circles around image */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>

          {/* Mobile Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-2 border-t border-gray-200/60 grid grid-cols-3 gap-2 sm:hidden mt-12"
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
