import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const { props } = usePage();
  const userCurrency = props?.auth?.user?.currency ?? 0;

  const [currency, setCurrency] = useState(userCurrency);

  // Keep in sync on full Inertia navigations / login / logout
  useEffect(() => {
    setCurrency(userCurrency);
  }, [userCurrency]);

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside <CurrencyProvider>');
  return ctx;
}