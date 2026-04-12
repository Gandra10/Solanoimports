import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS } from '../utils/products';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState('');

  if (!product) return <div className="pt-32 text-center text-4xl">Produto não encontrado</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Por favor, selecione um tamanho');
      return;
    }
    addToCart(product, selectedSize);
    setError('');
    alert('Produto adicionado ao carrinho!');
  };

  const handleWhatsApp = () => {
    if (!selectedSize) {
      setError('Por favor, selecione um tamanho');
      return;
    }
    const message = `Olá, tenho interesse na chuteira ${product.name} (Tamanho ${selectedSize})!`;
    const url = `https://wa.me/5565996992910?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-light/50 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar ao catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#121212] border border-white/5">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#121212] border border-white/5 cursor-pointer hover:border-secondary transition-colors opacity-50 hover:opacity-100">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/10">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">4.9 (128 avaliações)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-black uppercase mb-4 leading-tight">{product.name}</h1>
            <p className="text-3xl font-display font-black text-white mb-8">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>

            <p className="text-light/70 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold uppercase text-sm tracking-widest text-light/50">Selecione o Tamanho</span>
                <span className="text-secondary text-xs underline cursor-pointer">Guia de medidas</span>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setError(''); }}
                    className={`h-12 flex items-center justify-center rounded-xl font-bold transition-all ${
                      selectedSize === size 
                        ? 'bg-white text-black' 
                        : 'bg-[#121212] border border-white/10 hover:border-white/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg"
              >
                <ShoppingBag /> ADICIONAR AO CARRINHO
              </button>
              <button 
                onClick={handleWhatsApp}
                className="w-full py-5 border-2 border-[#25D366] text-[#25D366] font-display font-black flex items-center justify-center gap-3 text-lg rounded-full hover:bg-[#25D366] hover:text-white transition-all transform active:scale-95"
              >
                <MessageCircle /> COMPRAR VIA WHATSAPP
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="text-white" />
                <span className="text-xs font-bold leading-tight">GARANTIA DE<br/>AUTENTICIDADE</span>
              </div>
              <div className="glass p-4 rounded-2xl flex items-center gap-3">
                <Truck className="text-white" />
                <span className="text-xs font-bold leading-tight">ENTREGA<br/>TODO BRASIL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
