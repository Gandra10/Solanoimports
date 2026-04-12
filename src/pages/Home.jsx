import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { products } from '../utils/products';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-6 inline-block">
              PRO NEXT GEN | 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold leading-[0.9] mb-6">
              DOMINE O <br />
              <span className="text-white italic underline decoration-white/20">CAMPO.</span>
            </h1>
            <p className="text-xl text-light/70 mb-10 max-w-lg">
              As melhores chuteiras das maiores marcas com tecnologia profissional. Eleve seu jogo para o próximo nível.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogo" className="btn-primary flex items-center gap-2">
                COMPRAR AGORA <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/catalogo" className="px-8 py-3 border border-white border-opacity-20 rounded-full font-bold hover:bg-white hover:text-black transition-all flex items-center">
                VER NOVIDADES
              </Link>
            </div>
          </motion.div>

          {/* Social Proof / Stats */}
          <div className="hidden lg:flex flex-col gap-6 items-end">
            {[
              { label: "Modelos Exclusivos", value: "150+" },
              { label: "Envio Nacional", value: "100%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="glass p-6 rounded-2xl w-64 text-right"
              >
                <div className="text-4xl font-display font-black text-white">{stat.value}</div>
                <div className="text-sm text-light/50 font-bold uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-black mb-2 uppercase">Categorias</h2>
              <div className="w-20 h-1 bg-secondary"></div>
            </div>
          </div>
          
          <div className="flex justify-center">
            {[
              { title: "Campo", img: "/campo.png", count: "8 modelos" }
            ].map((cat, i) => (
              <Link key={i} to={`/catalogo?type=${cat.title.toLowerCase()}`} className="group relative h-80 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-display font-black uppercase mb-1">{cat.title}</h3>
                  <p className="text-secondary font-bold text-sm tracking-widest">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-black mb-2 uppercase italic text-white underline decoration-white/20">Destaques</h2>
              <p className="text-light/50 font-bold">As mais queridas pelos craques</p>
            </div>
            <Link to="/catalogo" className="text-secondary font-bold hover:underline">Ver tudo</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features/Benefits */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { icon: <ShieldCheck />, title: "Autenticidade", desc: "Produtos 100% originais com garantia de fábrica." },
            { icon: <Truck />, title: "Entrega Rápida", desc: "Enviamos para todo o Brasil com rastreamento." },
            { icon: <RotateCcw />, title: "Troca Fácil", desc: "A primeira troca é por nossa conta em até 7 dias." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 neon-border">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-light/50 text-sm max-w-[200px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
