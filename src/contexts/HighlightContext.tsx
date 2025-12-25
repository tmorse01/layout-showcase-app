/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface HighlightContextType {
  enabled: boolean;
  toggle: () => void;
}

const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);

export function useHighlight() {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error(
      "useHighlight must be used within a HighlightContextProvider"
    );
  }
  return context;
}

interface HighlightContextProviderProps {
  children: ReactNode;
}

export function HighlightContextProvider({
  children,
}: HighlightContextProviderProps) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    // Get saved preference from localStorage, default to false
    const saved = localStorage.getItem("layout-highlight-enabled");
    return saved === "true";
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem("layout-highlight-enabled", String(enabled));
  }, [enabled]);

  const toggle = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <HighlightContext.Provider value={{ enabled, toggle }}>
      {children}
    </HighlightContext.Provider>
  );
}
