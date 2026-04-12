import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('solano_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' or 'pickup'
  const [shippingInfo, setShippingInfo] = useState({
    bairro: '',
    rua: '',
    numero: '',
    cidade: 'Cuiabá',
    regiaoValue: 0
  });

  useEffect(() => {
    localStorage.setItem('solano_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === id && item.size === size ? { ...item, quantity } : item
    ));
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Promoção: 2 por 600
  const promoDiscount = Math.floor(cartCount / 2) * 30;
  
  // Regra de Frete Grátis > 200 (DESABILITADO POR ENQUANTO)
  const isFreeShipping = false; 
  
  // Cálculo do Frete
  const shippingFee = (deliveryMethod === 'pickup') ? 0 : shippingInfo.regiaoValue;
  
  const cartTotal = subtotal - promoDiscount + shippingFee;

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartTotal, 
      cartCount,
      subtotal,
      promoDiscount,
      deliveryMethod,
      setDeliveryMethod,
      shippingInfo,
      setShippingInfo,
      shippingFee,
      isFreeShipping
    }}>
      {children}
    </CartContext.Provider>
  );
};
