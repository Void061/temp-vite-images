import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

// Controlliamo la preferenza dell'utente nel browser
// Per settare la DarkMode
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
 
  // Controlliamo anche il localstorage se ha mai impostato una preferenza, diamo priorità a quella
  // Se è stata impostata una darkMode a true
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
  //Ritorna uno dei due true
  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    // Impostiamo il darkTheme nello state globale
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  useEffect(() => {
    // Diamo al body la classe dark-theme in base a true o false di newDarkTheme
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", isDarkTheme);
  },[isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ searchTerm, setSearchTerm, isDarkTheme, toggleDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
