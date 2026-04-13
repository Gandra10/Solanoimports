import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Rocket, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Chuteiras', path: '/catalogo' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Políticas', path: '/politicas' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-black py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group relative z-[110]">
            <Rocket className="text-white w-7 h-7" />
            <span className="text-xl font-display font-black tracking-tighter uppercase">
              Solano<span className="opacity-40 italic">Sport</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-[11px] uppercase tracking-[0.2em] font-black transition-all ${location.pathname === link.path ? 'text-white' : 'text-white/40 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/cart" className="relative ml-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-3 relative z-[110]">
            <Link to="/cart" className="relative p-2 bg-white/5 rounded-full">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[90] md:hidden flex flex-col justify-center px-10"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-4xl font-display font-black uppercase italic tracking-tight hover:opacity-50"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 pt-10 border-t border-white/5 flex flex-col gap-6"
            >
              <a 
                href="https://wa.me/5565996992910" 
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-white text-black font-display font-black text-center rounded-full flex items-center justify-center gap-3"
              >
                <MessageCircle size={20} /> WHATSAPP
              </a>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] text-center font-bold">Solano Sport © 2026</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
