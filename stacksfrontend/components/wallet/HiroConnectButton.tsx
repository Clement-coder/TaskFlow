"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function HiroConnectButton() {
  const [connecting, setConnecting] = useState(false);

  async function handleConnect() {
    setConnecting(true);

    try {
      const { showConnect } = await import("@stacks/connect");

      showConnect({
        appDetails: {
          name: "TaskFlow",
          icon: "/Taskflowlogo.png",
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
    <Button onClick={handleConnect} variant="secondary" size="lg" className="w-full md:w-auto">
      {connecting ? "Connecting…" : "Connect with Hiro Wallet"}
    </Button>
  );
}
