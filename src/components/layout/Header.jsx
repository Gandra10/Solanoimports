import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Rocket } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <Rocket className="text-secondary w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-display font-extrabold tracking-tighter">
            SOLANO<span className="text-white/50 italic">IMPORTS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-secondary transition-colors font-medium">Início</Link>
          <Link to="/catalogo" className="hover:text-white transition-colors font-medium">Chuteiras</Link>
          <Link to="/sobre" className="hover:text-white transition-colors font-medium">Sobre</Link>
          <Link to="/cart" className="relative group">
            <ShoppingCart className="group-hover:text-white transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Início</Link>
          <Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Chuteiras</Link>
          <button className="btn-primary w-full mt-4">WhatsApp</button>
        </div>
      )}
    </header>
  );
};

export default Header;
