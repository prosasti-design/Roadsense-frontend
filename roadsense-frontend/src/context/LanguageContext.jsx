import { createContext, useContext, useState } from "react";
import { translations } from "../translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = translations[language];

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}