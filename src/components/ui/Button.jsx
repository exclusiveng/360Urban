import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "bg-transparent text-charcoal border border-gray-mid hover:border-primary hover:text-primary",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp/90",
  ghost:
    "bg-transparent text-gray-text hover:text-charcoal hover:bg-gray-light",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-3 text-sm",
  lg: "px-10 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200 cursor-pointer no-underline",
    variants[variant],
    sizes[size],
    className,
  );

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className={baseClasses}
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
