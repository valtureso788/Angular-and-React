import { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const current = state.find((item) => item.id === action.product.id);
      return current
        ? state.map((item) => item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter((item) => item.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      throw new Error(`Unknown cart action: ${action.type}`);
  }
}
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const value = useMemo(() => ({ items, dispatch, total }), [items, total]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (context === null) throw new Error('useCart must be used within CartProvider');
  return context;
}
