import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { generateGeneralWhatsAppLink } from "../../lib/utils";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-24 bg-charcoal overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A017' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l2 3-2 3zm0-7V11l2 3-2 3v-2H0V11h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Golden accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/20" />
      <div className="absolute top-6 left-[10%] right-[10%] h-px bg-primary/8 hidden md:block" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-xl mx-auto"
        >
          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Ready to Find Your Property?
          </h2>
          <p className="text-white/55 mb-9 leading-relaxed">
            Whether you&apos;re looking to rent, buy, or invest — we&apos;re
            here to help you find the right property in Abuja. Send us a message
            and let&apos;s get started.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="whatsapp"
              size="lg"
              href={generateGeneralWhatsAppLink()}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
            <a
              href="/listings"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-primary no-underline transition-colors"
            >
              Or browse listings <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
