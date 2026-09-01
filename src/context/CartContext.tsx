import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, PackOption } from '../data/products';

export interface CartItem {
  id: string; // unique item key e.g. productId-size-packId
  product: Product;
  selectedSize: string;
  selectedPack: PackOption;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, selectedSize: string, selectedPack: PackOption, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPieces: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  formatPrice: (amountInUSD: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INR_RATE = 86.5;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kanyakumari_wholesale_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kanyakumari_wholesale_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addItem = (product: Product, selectedSize: string, selectedPack: PackOption, quantity = 1) => {
    const itemKey = `${product.id}-${selectedSize}-${selectedPack.id}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemKey, product, selectedSize, selectedPack, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPieces = items.reduce((acc, item) => acc + item.selectedPack.count * item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.selectedPack.price * item.quantity, 0);

  const formatPrice = (amountInUSD: number): string => {
    const inrAmount = amountInUSD * INR_RATE;
    if (inrAmount < 10) {
      return `₹${inrAmount.toFixed(2)}`;
    }
    return `₹${Math.round(inrAmount).toLocaleString('en-IN')}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        totalPieces,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
