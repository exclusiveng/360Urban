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
    <section className="relative bg-gradient-to-b from-gray-light to-white min-h-screen flex items-center overflow-hidden">
      {/* Soft decorative elements */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-main relative z-10 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-3xl pt-10 lg:pt-0">
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
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-charcoal leading-[1.05] tracking-tight mb-8">
                  {areas.length > 0 ? (
                    <>
                      Find your next home in{" "}
                      <span className="text-primary block lg:inline">{currentArea.name}</span>
                    </>
                  ) : (
                    <>
                      Find your next <span className="text-primary">perfect home</span> in Abuja
                    </>
                  )}
                </h1>

                <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
                  {areas.length > 0
                    ? `Explore the most premium houses, apartments, and land currently available in ${currentArea.name}. Expertly verified for a secure transaction.`
                    : "Browse verified houses, flats, and land across Abuja's best neighbourhoods. No hidden fees, just real properties."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Link
                to={currentArea.slug ? `/areas/${currentArea.slug}` : "/listings"}
                className="no-underline"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-10 h-14 text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                >
                  <Search className="w-5 h-5" />
                  {currentArea.slug ? `View ${currentArea.name}` : "Browse Listings"}
                </Button>
              </Link>
              <Link to="/areas" className="no-underline">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto px-10 h-14 text-base border-gray-200 hover:border-primary hover:text-primary bg-white/50 backdrop-blur-sm shadow-sm"
                >
                  Explore Areas
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats - Desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-12 border-t border-gray-200/60 hidden sm:flex flex-wrap gap-12 md:gap-16"
            >
              {[
                { value: "6+", label: "Areas" },
                { value: "50+", label: "Verified" },
                { value: "100%", label: "Secure" },
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
          <div className="relative lg:ml-auto w-full group">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/3] lg:aspect-[4/5] xl:aspect-[4/3]">
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
                    className="w-full h-full object-cover scale-105"
                  />
                  {/* Overlay Gradient - Stronger for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                  {/* Area Info Overlay with Glass Effect */}
                  <div className="absolute bottom-10 left-10 right-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-charcoal/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] text-white"
                    >
                      <p className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2">
                        Featured Neighbourhood
                      </p>
                      <h3 className="text-2xl md:text-4xl font-bold mb-3">
                        {currentArea.name}
                      </h3>
                      <Link 
                        to={`/areas/${currentArea.slug}`}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium no-underline"
                      >
                        Learn more about this area
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {areas.length > 1 && (
              <>
                <button
                  onClick={slidePrev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:border-primary z-20 cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={slideNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:border-primary z-20 cursor-pointer shadow-lg"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}

            {/* Indicators */}
            {areas.length > 1 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                {areas.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === currentIndex ? "w-10 bg-primary" : "w-2 bg-gray-200"
                    } cursor-pointer`}
                  />
                ))}
              </div>
            )}
            
            {/* Soft decorative circles around image */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
          
          {/* Mobile Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-4 border-t border-gray-200/60 grid grid-cols-3 gap-2 sm:hidden mt-20"
          >
            {[
              { value: "6+", label: "Areas" },
              { value: "50+", label: "Verified" },
              { value: "100%", label: "Secure" },
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
