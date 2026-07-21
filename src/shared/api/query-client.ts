import { QueryClient } from "@tanstack/react-query";

const FIVE_MINUTES = 1000 * 60 * 5;
const FIFTEEN_MINUTES = 1000 * 60 * 15;

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: FIVE_MINUTES,
        gcTime: FIFTEEN_MINUTES,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
