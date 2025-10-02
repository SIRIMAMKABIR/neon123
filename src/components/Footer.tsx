import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Templates", path: "/templates" },
        { name: "Builder", path: "/builder" },
        { name: "Feed", path: "/feed" },
        { name: "Leaderboard", path: "/leaderboard" },
        { name: "Dashboard", path: "/dashboard" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Identity & Soul", path: "/services" },
        { name: "Digital Flagships", path: "/services" },
        { name: "Bespoke Instruments", path: "/services" },
        { name: "Consultation", path: "/contact" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Explore", path: "/explore" },
        { name: "Messages", path: "/messages" },
        { name: "Referrals", path: "/referrals" }
      ]
    },
    {
      title: "Firm",
      links: [
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" }
      ]
    }
  ];

  return (
    <footer className="relative">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="glass-strong border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            
            {/* Brand */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/" className="inline-block group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="white-dot" />
                    <span className="text-2xl font-serif font-bold text-luxury">
                      NEON TECH
                    </span>
                  </div>
                </Link>
                <p className="text-foreground/60 leading-relaxed font-light">
                  Digital fingerprints built for velocity. Where precision meets artistry 
                  in the digital realm.
                </p>
              </motion.div>
            </div>

            {/* Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-serif font-semibold text-foreground">
                  {section.title}
                </h4>
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: sectionIndex * 0.1 + linkIndex * 0.05 
                      }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={link.path}
                        className="block text-foreground/60 hover:text-primary transition-colors duration-300 font-light"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-white/10 mt-16 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-foreground/50 font-light">
                © C2023 Neon Tech. Digital fingerprints that matter.
              </div>
              
              {/* Watermark */}
              <div className="neon-watermark">
                neonc©2025 — all rights reserved
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;