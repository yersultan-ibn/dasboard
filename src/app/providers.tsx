"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";

import { makeQueryClient } from "@/shared/api/query-client";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
