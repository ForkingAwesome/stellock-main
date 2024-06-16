"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { createNewWallet } from "@/data/create-new-wallet";
import { useToast } from "../ui/use-toast";

export const Social = () => {
  const { toast } = useToast();

  const [wallet, setWallet] = useState<{
    publicKey: string;
    privateKey: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const onClick = (provider: "google" | "github" | "twitch") => {
    signIn(provider),
      {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      };
    handleCreateWallet();
  };

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const newWallet = createNewWallet();
      if (newWallet) {
        setWallet(newWallet);
        toast({
          title: "Wallet Created",
          description: `Public Key: ${newWallet.publicKey}`,
        });
      } else {
        toast({
          title: "Creation Failed",
          description: "Failed to create a new wallet",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create wallet", error);
      toast({
        title: "Error",
        description: "An error occurred while creating the wallet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("twitch")}
      >
        <FaTwitch className="w-5 h-5" />
      </Button>
    </div>
  );
};
