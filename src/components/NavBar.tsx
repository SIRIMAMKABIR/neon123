import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, MessageCircle, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Templates", path: "/templates" },
    { name: "Builder", path: "/builder" },
    { name: "Feed", path: "/feed" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Contact", path: "/contact" },
  ];

  const utilityItems = [
    { icon: Bell, path: "/notifications", badge: 3 },
    { icon: MessageCircle, path: "/messages", badge: 1 },
    { icon: User, path: "/dashboard" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "nav-glass" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="white-dot"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="text-2xl font-serif font-bold text-luxury tracking-tight"
              whileHover={{ letterSpacing: "0.05em" }}
              transition={{ duration: 0.3 }}
            >
              NEON TECH
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-all duration-300 hover:text-primary group ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-foreground/70"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeNav"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </div>

          {/* Utility Rail */}
          <div className="hidden lg:flex items-center space-x-4">
            {utilityItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative p-2 hover:bg-white/5 rounded-xl transition-all duration-200 magnetic"
              >
                <item.icon className="w-5 h-5 text-foreground/70 hover:text-primary transition-colors" />
                {item.badge && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-crimson rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <span className="text-xs text-white font-medium">{item.badge}</span>
                  </motion.div>
                )}
              </Link>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register" className="btn-neon text-sm font-semibold ml-4">
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden glass-strong border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-neon w-full text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;