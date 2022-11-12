import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

export const ReactQueryProvider = (props: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient} {...props} />;
};
