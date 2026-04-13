import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Policies from './pages/Policies';
import { CartProvider } from './context/CartContext';
import { MessageCircle } from 'lucide-react';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="min-h-screen bg-primary text-light relative">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/produto/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/politicas" element={<Policies />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-black border-t border-white/5 py-16">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
              <div className="col-span-2">
                <span className="text-3xl font-display font-black tracking-tighter mb-6 block">
                  SOLANO<span className="text-white/50 italic">SPORT</span>
                </span>
                <p className="text-light/50 max-w-sm mb-8 leading-relaxed">
                  Referência nacional em tecnologia de chuteiras. Trazemos o que há de melhor no mundo do futebol para elevar seu desempenho.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.instagram.com/solano.imports?igsh=NHZ2ZWcwMjdsbm54" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-white hover:border-white transition-all"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-white hover:border-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Links Rápidos</h4>
                <div className="flex flex-col gap-4 text-light/50 font-medium">
                  <Link to="/" className="hover:text-white">Início</Link>
                  <Link to="/catalogo" className="hover:text-white">Chuteiras</Link>
                  <Link to="/sobre" className="hover:text-white">Sobre Nós</Link>
                  <Link to="/politicas" className="hover:text-white">Políticas</Link>
                </div>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Suporte</h4>
                <div className="flex flex-col gap-4 text-light/50 font-medium">
                  <p>Goiânia - GO</p>
                  <p>(65) 99699-2910</p>
                  <p>Joe_solano@hotmail.com</p>
                </div>
              </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-light/30">
              © 2026 SOLANO SPORT. TODOS OS DIREITOS RESERVADOS.
            </div>
          </footer>

          {/* Floating WhatsApp Button */}
          <a 
            href="https://wa.me/5565996992910" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all z-40 animate-bounce"
          >
            <MessageCircle size={32} />
          </a>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
