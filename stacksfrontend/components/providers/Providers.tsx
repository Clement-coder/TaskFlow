"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { AppProvider } from "@/lib/AppContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          {children}
        </AppProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
