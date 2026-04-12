import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 container mx-auto px-6 text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-light/20">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-display font-black uppercase mb-4">Seu carrinho está vazio</h2>
        <p className="text-light/50 mb-10">Que tal explorar nossos últimos lançamentos?</p>
        <Link to="/catalogo" className="btn-primary inline-flex items-center gap-2">
          VER CHUTEIRAS <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24">
      <div className="container mx-auto px-6">
        <h1 className="section-title tracking-tight">Meu Carrinho</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="glass p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-24 h-24 bg-[#121212] rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-secondary text-sm font-bold mb-1 uppercase tracking-widest">{item.category}</p>
                  <p className="text-light/50 text-sm">Tamanho: {item.size}</p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl">
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:text-secondary"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:text-secondary"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-display font-black text-xl mb-1">
                    R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Info */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-3xl sticky top-32">
              <h2 className="text-xl font-display font-black uppercase mb-6">Resumo</h2>
              
              <div className="flex justify-between mb-4 pb-4 border-b border-white/5">
                <span className="text-light/50">Subtotal</span>
                <span className="font-bold">R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between mb-8">
                <span className="text-light/50">Frete</span>
                <span className="text-secondary font-bold uppercase text-xs border border-secondary/20 px-2 py-1 rounded-md">Grátis</span>
              </div>
              
              <div className="flex justify-between items-end mb-10">
                <span className="text-lg font-bold">Total</span>
                <span className="text-4xl font-display font-black text-secondary">
                  R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <button className="btn-primary w-full py-5 text-lg mb-4">
                FINALIZAR COMPRA
              </button>
              
              <div className="flex flex-col gap-3">
                <p className="text-[10px] text-light/30 text-center uppercase tracking-widest font-black">Pagamento Seguro</p>
                <div className="flex justify-center gap-4 opacity-30 grayscale">
                  <img src="https://logodownload.org/wp-content/uploads/2014/10/visa-logo.png" alt="Visa" className="h-4" />
                  <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo.png" alt="Master" className="h-4" />
                  <img src="https://logoshistory.blogspot.com/2020/10/pix-logo.html" alt="Pix" className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
