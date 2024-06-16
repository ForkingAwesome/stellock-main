"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import albedo from "@albedo-link/intent";
import { useToast } from "@/components/ui/use-toast";

interface AlbedoContextValue {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

interface AlbedoProviderProps {
  children: ReactNode;
}

const AlbedoContext = createContext<AlbedoContextValue | undefined>(undefined);

export const AlbedoProvider = ({ children }: AlbedoProviderProps) => {
  const { toast } = useToast(); 

  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem("albedoAccount");
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const result = (await albedo.publicKey({})) as { pubkey: string };
      if (result.pubkey) {
        setAccount(result.pubkey);
        localStorage.setItem("albedoAccount", result.pubkey);
        toast({
          title: "Account Connected",
          description: `Connected account: ${result.pubkey}`,
        });
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("albedoAccount");
    toast({
      title: "Account Disconnected",
      description: "Disconnected from the wallet",
    });
  };

  return (
    <AlbedoContext.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </AlbedoContext.Provider>
  );
};

export const useAlbedo = () => {
  const context = useContext(AlbedoContext);
  if (context === undefined) {
    throw new Error("useAlbedo must be used within an AlbedoProvider");
  }
  return context;
};
