import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, PackOption } from '../data/products';

export interface CartItem {
  id: string; // unique item key e.g. productId-size-packId
  product: Product;
  selectedSize: string;
  selectedPack: PackOption;
  quantity: number;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

interface CurrencyRate {
  symbol: string;
  rate: number;
  label: string;
}

const CURRENCIES: Record<Currency, CurrencyRate> = {
  INR: { symbol: '₹', rate: 86.5, label: 'INR (₹ Rupee)' },
  USD: { symbol: '$', rate: 1.0, label: 'USD ($ Dollar)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€ Euro)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£ Pound)' },
};

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
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
  hasSampleKit: boolean;
  addSampleKit: () => void;
  removeSampleKit: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kanyakumari_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [hasSampleKit, setHasSampleKit] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kanyakumari_sample_kit') === 'true';
    } catch {
      return false;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  // Default currency set to INR (Rupees)
  const [currency, setCurrency] = useState<Currency>('INR');

  useEffect(() => {
    try {
      localStorage.setItem('kanyakumari_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('kanyakumari_sample_kit', hasSampleKit ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [hasSampleKit]);

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
    setHasSampleKit(false);
  };

  const addSampleKit = () => {
    setHasSampleKit(true);
    setIsCartOpen(true);
  };

  const removeSampleKit = () => {
    setHasSampleKit(false);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0) + (hasSampleKit ? 1 : 0);
  const totalPieces = items.reduce((acc, item) => acc + item.selectedPack.count * item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.selectedPack.price * item.quantity, 0);

  const formatPrice = (amountInUSD: number): string => {
    const cur = CURRENCIES[currency];
    const converted = amountInUSD * cur.rate;
    if (currency === 'INR') {
      if (converted < 10) {
        return `₹${converted.toFixed(2)}`;
      }
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${cur.symbol}${converted.toFixed(2)}`;
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
        currency,
        setCurrency,
        formatPrice,
        hasSampleKit,
        addSampleKit,
        removeSampleKit,
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
