"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { openContractCall, showConnect } from "@stacks/connect";

export function HiroConnectButton() {
  const [connecting, setConnecting] = useState(false);

  async function handleConnect() {
    setConnecting(true);

    try {
      showConnect({
        appDetails: {
          name: "TaskFlow",
          icon: "/Taskflow_logo.png",
        },
        onFinish: ({ userSession }) => {
          console.log("Hiro Wallet connected", userSession);
          setConnecting(false);
        },
      });
    } catch (error) {
      console.error(error);
      setConnecting(false);
    }
  }

  return (
    <Button onClick={handleConnect} variant="accent" size="lg" className="w-full md:w-auto">
      {connecting ? "Connecting…" : "Connect with Hiro Wallet"}
    </Button>
  );
}
