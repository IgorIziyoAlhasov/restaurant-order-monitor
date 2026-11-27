"use client";

import { createContext, useContext } from "react";
import { messages } from "./messages";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children, language, theme }) {
  function change(name, value) {
    document.cookie = `rom_${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    window.location.reload();
  }
  return (
    <PreferencesContext.Provider
      value={{ language, theme, copy: messages[language], change }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
