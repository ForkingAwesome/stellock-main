"use client";
import React from "react";
import { useFreighter } from "@/components/context/freighter";
import { useAlbedo } from "@/components/context/albedo";
import { Button } from "../ui/button";

export default function ConnectButtons() {

  const {
    account: freighterAccount,
    connectWallet: connectFreighter,
    disconnectWallet: disconnectFreighter,
  } = useFreighter();
  const {
    account: albedoAccount,
    connectWallet: connectAlbedo,
    disconnectWallet: disconnectAlbedo,
  } = useAlbedo();

  return (
    <div className="">
      <div className="flex items-center gap-x-4">
        <div className="">
          {freighterAccount ? (
            <>
              <Button onClick={() => disconnectFreighter()}>
                Disconnect Freighter Wallet
              </Button>
            </>
          ) : (
            <Button onClick={() => connectFreighter()}>
              Connect Freighter Wallet
            </Button>
          )}
        </div>
        <div>
          {albedoAccount ? (
            <>
              <Button onClick={() => disconnectAlbedo()}>
                Disconnect Albedo Wallet
              </Button>
            </>
          ) : (
            <Button onClick={() => connectAlbedo()}>
              Connect Albedo Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}