"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getNetwork, getPublicKey, isAllowed } from "@stellar/freighter-api";
import { useToast } from "@/components/ui/use-toast";

interface FreighterContextValue {
  account: string | null;
  network: string | null;
  walletStatus: "Locked" | "Unlocked" | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

interface FreighterProviderProps {
  children: ReactNode;
}

const FreighterContext = createContext<FreighterContextValue | undefined>(
  undefined
);

export const FreighterProvider = ({ children }: FreighterProviderProps) => {
  const { toast } = useToast(); // Destructure toast from the returned object

  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [walletStatus, setWalletStatus] = useState<"Locked" | "Unlocked">();

  useEffect(() => {
    const initializeFreighter = async () => {
      const disconnected = localStorage.getItem("freighterDisconnected");

      if (!disconnected && (await isAllowed())) {
        const publicKey = await getPublicKey();
        if (publicKey) {
          setAccount(publicKey);
          setNetwork(await getNetwork());
          setWalletStatus("Unlocked");
        } else setWalletStatus("Locked");
      }
    };

    initializeFreighter();
  }, []);

  const connectWallet = async () => {
    try {
      const publicKey = await getPublicKey();
      if (publicKey) {
        setAccount(publicKey);
        localStorage.removeItem("freighterDisconnected");
        toast({
          title: "Account Connected",
          description: `Connected account: ${publicKey}`,
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
    setNetwork(null);
    localStorage.setItem("freighterDisconnected", "true");
    toast({
      title: "Account Disconnected",
      description: "Disconnected from the wallet",
    });
  };

  return (
    <FreighterContext.Provider
      value={{
        account,
        network,
        walletStatus,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </FreighterContext.Provider>
  );
};

export const useFreighter = () => {
  const context = useContext(FreighterContext);
  if (context === undefined) {
    throw new Error("useFreighter must be used within a FreighterProvider");
  }
  return context;
};