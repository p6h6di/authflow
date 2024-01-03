"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const Provider = ({ children }: PropsWithChildren) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
