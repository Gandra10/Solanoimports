import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#121212] border border-white border-opacity-5 rounded-3xl overflow-hidden product-card-hover"
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-secondary text-primary text-[10px] font-black uppercase px-2 py-1 rounded-full">
          {product.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <Link 
            to={`/produto/${product.id}`} 
            className="w-full btn-primary flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            VER DETALHES
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg group-hover:text-secondary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] text-light/50 font-bold">4.9</span>
          </div>
        </div>
        <p className="text-white font-display font-black text-xl">
          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
