import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Button from "../ui/Button";
import { generateGeneralWhatsAppLink } from "../../lib/utils";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-charcoal">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Find Your Property?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Whether you&apos;re looking to rent, buy, or invest — we&apos;re
            here to help you find the right property in Abuja. Send us a message
            and let&apos;s get started.
          </p>
          <Button
            variant="whatsapp"
            size="lg"
            href={generateGeneralWhatsAppLink()}
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
