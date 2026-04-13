import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Lock, Copy, CheckCircle2, ArrowLeft, Truck, Store, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Dicionário de Bairros de Cuiabá/VG para cálculo automático
const BAIRROS_DATA = [
  // CENTRO (R$ 10)
  { name: "Centro Norte", valor: 10, cat: "Centro" },
  { name: "Centro Sul", valor: 10, cat: "Centro" },
  { name: "Bandeirantes", valor: 10, cat: "Centro" },
  { name: "Araés", valor: 10, cat: "Centro" },
  { name: "Baú", valor: 10, cat: "Centro" },
  { name: "Porto", valor: 10, cat: "Centro" },
  { name: "Lixeira", valor: 10, cat: "Centro" },
  { name: "Poção", valor: 10, cat: "Centro" },
  { name: "Areão", valor: 10, cat: "Centro" },
  { name: "Alvorada", valor: 10, cat: "Centro" },
  { name: "Santa Helena", valor: 10, cat: "Centro" },

  // PRÓXIMOS (R$ 15)
  { name: "Goiabeiras", valor: 15, cat: "Próximo" },
  { name: "Quilombo", valor: 15, cat: "Próximo" },
  { name: "Duque de Caxias", valor: 15, cat: "Próximo" },
  { name: "Jardim Cuiabá", valor: 15, cat: "Próximo" },
  { name: "Bosque da Saúde", valor: 15, cat: "Próximo" },
  { name: "Consil", valor: 15, cat: "Próximo" },
  { name: "Cidade Alta", valor: 15, cat: "Próximo" },
  { name: "Cidade Verde", valor: 15, cat: "Próximo" },
  { name: "Coophamil", valor: 15, cat: "Próximo" },
  { name: "Verdão", valor: 15, cat: "Próximo" },
  { name: "Despraiado", valor: 15, cat: "Próximo" },
  { name: "Dom Aquino", valor: 15, cat: "Próximo" },
  { name: "Pico do Amor", valor: 15, cat: "Próximo" },
  { name: "Jardim Paulista", valor: 15, cat: "Próximo" },
  { name: "Bela Vista", valor: 15, cat: "Próximo" },
  { name: "Guaicurus", valor: 15, cat: "Próximo" },

  // INTERMEDIÁRIOS (R$ 20)
  { name: "Jardim das Américas", valor: 20, cat: "Intermediário" },
  { name: "CPA 1", valor: 20, cat: "Intermediário" },
  { name: "CPA 2", valor: 20, cat: "Intermediário" },
  { name: "CPA 3", valor: 20, cat: "Intermediário" },
  { name: "Morada do Ouro", valor: 20, cat: "Intermediário" },
  { name: "Morada da Serra", valor: 20, cat: "Intermediário" },
  { name: "Jardim Itália", valor: 20, cat: "Intermediário" },
  { name: "Boa Esperança", valor: 20, cat: "Intermediário" },
  { name: "Recanto dos Pássaros", valor: 20, cat: "Intermediário" },
  { name: "Terra Nova", valor: 20, cat: "Intermediário" },
  { name: "Jardim Florianópolis", valor: 20, cat: "Intermediário" },
  { name: "Três Barras", valor: 20, cat: "Intermediário" },
  { name: "Pedregal", valor: 20, cat: "Intermediário" },
  { name: "Umuarama", valor: 20, cat: "Intermediário" },

  // DISTANTES (R$ 25)
  { name: "CPA 4", valor: 25, cat: "Distante" },
  { name: "Pedra 90", valor: 25, cat: "Distante" },
  { name: "Tijucal", valor: 25, cat: "Distante" },
  { name: "Santa Rosa", valor: 25, cat: "Distante" },
  { name: "Parque Cuiabá", valor: 25, cat: "Distante" },
  { name: "Osmar Cabral", valor: 25, cat: "Distante" },
  { name: "Pascoal Ramos", valor: 25, cat: "Distante" },
  { name: "Nova Esperança", valor: 25, cat: "Distante" },
  { name: "Altos do Coxipó", valor: 25, cat: "Distante" },
  { name: "Coophema", valor: 25, cat: "Distante" },
  { name: "São Gonçalo Beira Rio", valor: 25, cat: "Distante" },
  { name: "Cristo Rei (VG)", valor: 25, cat: "Distante" },
  { name: "Centro (VG)", valor: 25, cat: "Distante" },
  { name: "Jardim Aeroporto (VG)", valor: 25, cat: "Distante" },
  { name: "Jardim Glória (VG)", valor: 25, cat: "Distante" },
  { name: "Ponta do Socorro (VG)", valor: 25, cat: "Distante" },
  { name: "Mapim (VG)", valor: 25, cat: "Distante" },
  { name: "Costa Verde (VG)", valor: 25, cat: "Distante" },
  { name: "Ipase (VG)", valor: 25, cat: "Distante" },
];

const Cart = () => {
  const { 
    cart, removeFromCart, updateQuantity, cartTotal, subtotal, promoDiscount,
    deliveryMethod, setDeliveryMethod, shippingInfo, setShippingInfo, shippingFee, isFreeShipping 
  } = useCart();

  const [paymentMethod, setPaymentMethod] = React.useState('Pix');
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const PIX_KEY = "10009691189"; 

  const filteredBairros = BAIRROS_DATA.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (deliveryMethod === 'delivery' && (!shippingInfo.bairro || !shippingInfo.rua || !shippingInfo.numero)) {
      alert("Por favor, preencha o endereço completo para entrega.");
      return;
    }
    setShowCheckout(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectBairro = (b) => {
    setShippingInfo({ ...shippingInfo, bairro: b.name, regiaoValue: b.valor });
    setSearchTerm(b.name);
    setShowSuggestions(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendOrderEmail = async () => {
    const productsList = cart.map(item => `${item.name} (Tam: ${item.size}) x${item.quantity} - R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n');
    const deliveryInfo = deliveryMethod === 'pickup' 
      ? 'RETIRADA NA LOJA' 
      : `ENTREGA - Rua: ${shippingInfo.rua}, ${shippingInfo.numero} - Bairro: ${shippingInfo.bairro} - Tel: ${shippingInfo.telefone} - Frete: R$ ${shippingFee}`;

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'SUA_CHAVE_AQUI',
          subject: `🚀 Novo Pedido - Solano Sport - R$ ${cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          from_name: 'Solano Sport - Loja',
          to_name: 'Solano',
          message: `NOVO PEDIDO RECEBIDO!\n\nPRODUTOS:\n${productsList}\n\n${deliveryInfo}\n\nPAGAMENTO: ${paymentMethod}\nTOTAL: R$ ${cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        })
      });
    } catch (err) {
      console.log('Email não enviado:', err);
    }
  };

  const handleFinalPayment = (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);
    sendOrderEmail();
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  const notifyWhatsApp = () => {
    const deliveryDetail = deliveryMethod === 'pickup' 
      ? '🛍️ RETIRADA NA LOJA' 
      : `🚀 ENTREGA\n📌 Rua: ${shippingInfo.rua}, ${shippingInfo.numero}\n🏘️ Bairro: ${shippingInfo.bairro}\n📱 Telefone: ${shippingInfo.telefone}\n💰 Frete: ${isFreeShipping ? 'Grátis' : 'R$ ' + shippingFee}`;

    const message = `🚀 *NOVO PEDIDO - SOLANO SPORT*\n\n` +
      `📦 *PRODUTOS:*\n` +
      cart.map(item => `• ${item.name} (${item.size}) x${item.quantity}`).join('\n') +
      `\n\n${deliveryDetail}` +
      `\n\n💳 *PAGAMENTO:* ${paymentMethod}` +
      `\n💰 *TOTAL:* R$ ${cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` +
      `\n\n_Seguindo para o pagamento!_`;

    window.open(`https://wa.me/5565996992910?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isSuccess) {
    return (
      <div className="pt-48 pb-24 container mx-auto px-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white">
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-4xl font-display font-black uppercase mb-4">Pedido Enviado!</h2>
        <p className="text-light/50 mb-10 max-w-md mx-auto">Tudo certo! Agora clique no botão abaixo para nos enviar o comprovante e confirmar o endereço no WhatsApp.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button onClick={notifyWhatsApp} className="btn-primary !bg-[#25D366] !text-white border-none py-4 px-8 flex items-center justify-center gap-2">
             <ShoppingBag size={20} /> FINALIZAR NO WHATSAPP
           </button>
           <Link to="/" className="btn-primary py-4 px-8 border border-white/10 !bg-transparent">VOLTAR À LOJA</Link>
        </div>
      </div>
    );
  }

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
        <h1 className="section-title tracking-tight">{showCheckout ? 'Finalizar Pagamento' : 'Meu Carrinho'}</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {!showCheckout ? (
              <div className="space-y-12">
                {/* List */}
                <div className="flex flex-col gap-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="glass p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center">
                      <div className="w-24 h-24 bg-[#121212] rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-white/60 text-sm font-bold mb-1 uppercase tracking-widest">{item.category}</p>
                        <p className="text-light/50 text-sm">Tamanho: {item.size}</p>
                      </div>
                      <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:text-white"><Minus size={16} /></button>
                        <span className="w-6 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:text-white"><Plus size={16} /></button>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-black text-xl mb-1">R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 hover:text-red-400"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Selection */}
                <div className="glass p-8 rounded-3xl space-y-8">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <Truck className="text-white" />
                    <h3 className="text-xl font-display font-black uppercase">Como deseja receber?</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${deliveryMethod === 'delivery' ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                    >
                      <Truck size={24} />
                      <span className="text-xs font-black uppercase">Entrega</span>
                    </button>
                    <button 
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${deliveryMethod === 'pickup' ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                    >
                      <Store size={24} />
                      <span className="text-xs font-black uppercase">Retirar na Loja</span>
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {deliveryMethod === 'delivery' ? (
                      <motion.div 
                        key="delivery-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 pt-4"
                      >
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shrink-0">
                              <Truck size={20} />
                           </div>
                           <div>
                              <p className="text-xs font-black uppercase">Entrega rápida 🚀</p>
                              <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Receba no mesmo dia com segurança</p>
                           </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                           <div className="space-y-2 relative">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Seu Bairro</label>
                              <div className="relative">
                                <input 
                                  required
                                  type="text"
                                  value={searchTerm}
                                  onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowSuggestions(true);
                                    setShippingInfo({ ...shippingInfo, bairro: e.target.value });
                                  }}
                                  onFocus={() => setShowSuggestions(true)}
                                  placeholder="Comece a digitar seu bairro..."
                                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 pl-12 outline-none focus:border-white transition-all text-white"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                              </div>

                              <AnimatePresence>
                                {showSuggestions && searchTerm.length > 0 && (
                                  <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute z-50 w-full mt-2 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                                  >
                                    {filteredBairros.length > 0 ? filteredBairros.map(b => (
                                      <button 
                                        key={b.name}
                                        onClick={() => selectBairro(b)}
                                        className="w-full text-left px-6 py-4 hover:bg-white hover:text-black transition-colors flex justify-between items-center"
                                      >
                                        <span className="font-bold text-sm">{b.name}</span>
                                        <span className="text-[10px] font-black uppercase opacity-50">R$ {b.valor} ({b.cat})</span>
                                      </button>
                                    )) : (
                                      <div className="px-6 py-4 text-xs text-white/30 italic">Bairro não encontrado. Continue escrevendo...</div>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              
                              {shippingInfo.regiaoValue > 0 && !isFreeShipping && (
                                <p className="text-[9px] text-[#25D366] font-bold uppercase tracking-widest mx-1 animate-pulse">
                                  ✓ Frete Identificado: R$ {shippingInfo.regiaoValue},00
                                </p>
                              )}
                           </div>

                           <div className="grid grid-cols-3 gap-4">
                              <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Rua / Endereço</label>
                                <input 
                                  required
                                  type="text" 
                                  value={shippingInfo.rua}
                                  onChange={(e) => setShippingInfo({ ...shippingInfo, rua: e.target.value })}
                                  placeholder="Nome da sua rua"
                                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Nº</label>
                                <input 
                                  required
                                  type="text" 
                                  value={shippingInfo.numero}
                                  onChange={(e) => setShippingInfo({ ...shippingInfo, numero: e.target.value })}
                                  placeholder="123"
                                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" 
                                />
                              </div>
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/50">WhatsApp para Contato</label>
                             <input 
                               required
                               type="text" 
                               value={shippingInfo.telefone}
                               onChange={(e) => setShippingInfo({ ...shippingInfo, telefone: e.target.value })}
                               placeholder="(65) 99999-9999"
                               className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" 
                             />
                           </div>
                        </div>

                        {deliveryMethod === 'delivery' && shippingInfo.regiaoValue === 0 && searchTerm.length > 0 && (
                           <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Seu bairro é novo ou não está na lista?</label>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                 {[10, 15, 20, 25].map(v => (
                                    <button 
                                      key={v}
                                      onClick={() => setShippingInfo({ ...shippingInfo, regiaoValue: v })}
                                      className={`p-2 rounded-lg border text-[10px] font-black uppercase transition-all ${shippingInfo.regiaoValue === v ? 'bg-white text-black border-white' : 'border-white/10 active:scale-95'}`}
                                    >
                                       R$ {v},00
                                    </button>
                                 ))}
                              </div>
                           </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="pickup-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white/5 p-6 rounded-2xl flex items-start gap-4"
                      >
                         <MapPin className="text-white shrink-0" />
                         <div>
                            <p className="font-bold text-sm uppercase">Retirada em Goiânia - GO</p>
                            <p className="text-xs text-white/50 leading-relaxed mt-1">
                               Av Copacabana, 135 - Jardim Atlântico. <br />
                               (Entraremos em contato via WhatsApp para confirmar o horário da sua retirada).
                            </p>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : paymentMethod === 'Pix' ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl text-center space-y-8 relative">
                <button onClick={() => setShowCheckout(false)} className="absolute top-6 left-6 text-white/30 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"><ArrowLeft size={14} /> Voltar</button>
                <div className="space-y-2 pt-10 text-center">
                   <h3 className="text-2xl font-display font-black uppercase">Escaneie ou Copie o código</h3>
                   <p className="text-white/50">O pagamento é processado instantaneamente.</p>
                </div>
                <div className="bg-white p-4 w-48 h-48 mx-auto rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                   <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${PIX_KEY}`} alt="QR Code Pix" className="w-full h-full" />
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between max-w-sm mx-auto">
                  <span className="font-mono text-sm truncate mr-4">{PIX_KEY}</span>
                  <button onClick={copyToClipboard} className="text-white hover:text-white/70 transition-colors">
                    {copied ? <CheckCircle2 className="text-green-500" /> : <Copy size={20} />}
                  </button>
                </div>
                <div className="pt-6 space-y-4">
                   <button onClick={handleFinalPayment} disabled={isProcessing} className="btn-primary w-full py-5 text-lg">
                      {isProcessing ? 'CONFIRMANDO...' : 'JÁ REALIZEI O PAGAMENTO'}
                   </button>
                </div>
              </motion.div>
            ) : (
              <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleFinalPayment} className="glass p-8 rounded-3xl space-y-6 relative">
                <button type="button" onClick={() => setShowCheckout(false)} className="absolute top-6 left-6 text-white/30 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"><ArrowLeft size={14} /> Voltar</button>
                <div className="pt-10 grid md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-white/50">Nome Completo</label><input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" /></div>
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-white/50">CPF</label><input required type="text" placeholder="000.000.000-00" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-white/50">Número do Cartão</label><input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" /></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-white/50">Validade</label><input required type="text" placeholder="MM/AA" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" /></div>
                  <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-white/50">CVV</label><input required type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-white transition-all text-white" /></div>
                </div>
                <button disabled={isProcessing} className="btn-primary w-full py-5 text-lg mt-8">{isProcessing ? 'PROCESSANDO...' : `PAGAR R$ ${cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</button>
              </motion.form>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-3xl sticky top-32 space-y-8">
              <div>
                <h2 className="text-xl font-display font-black uppercase mb-6">Resumo</h2>
                <div className="space-y-4">
                  <div className="flex justify-between pb-4 border-b border-white/5">
                    <span className="text-light/50 text-sm">Subtotal</span>
                    <span className="font-bold font-mono">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between pb-4 border-b border-white/5 text-green-500">
                      <span className="text-[10px] font-black uppercase tracking-widest">Desconto Combo</span>
                      <span className="font-bold font-mono">- R$ {promoDiscount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between pb-4 border-b border-white/5">
                    <span className="text-light/50 text-sm">Frete</span>
                    <div className="flex flex-col items-end gap-1">
                      {deliveryMethod === 'pickup' ? (
                        <span className="text-white font-bold uppercase text-[10px] border border-white/20 px-2 py-1 rounded">Retirada em Loja</span>
                      ) : shippingFee > 0 ? (
                        <span className="font-bold font-mono text-white text-lg">
                          R$ {shippingFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-white/30 text-[10px] font-bold uppercase italic">Aguardando endereço...</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-4xl font-display font-black text-white">R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {!showCheckout && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Forma de Pagamento</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setPaymentMethod('Pix')} className={`glass p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${paymentMethod === 'Pix' ? 'border-white bg-white/10' : 'border-white/10 opacity-40'}`}>
                        <img src="https://img.icons8.com/color/48/pix.png" alt="Pix" className="h-6" />
                        <span className="text-[10px] font-black uppercase">PIX</span>
                      </button>
                      <button onClick={() => setPaymentMethod('Cartão de Crédito')} className={`glass p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${paymentMethod === 'Cartão de Crédito' ? 'border-white bg-white/10' : 'border-white/10 opacity-40'}`}>
                        <div className="flex gap-1">
                          <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-4" />
                          <img src="https://img.icons8.com/color/48/mastercard.png" alt="Master" className="h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase">Cartão</span>
                      </button>
                    </div>
                  </div>

                  <button onClick={handleCheckout} className="btn-primary w-full py-5 text-lg shadow-[0_10px_30px_rgba(255,255,255,0.1)]">FINALIZAR COMPRA</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
