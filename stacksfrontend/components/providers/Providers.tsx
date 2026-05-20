"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <QueryClientProvider client={queryClient}>
        <body className="bg-slate-950 text-slate-100 selection:bg-sky-300/30 selection:text-slate-950" onLoad={() => setIsMounted(true)}>
          {children}
        </body>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
